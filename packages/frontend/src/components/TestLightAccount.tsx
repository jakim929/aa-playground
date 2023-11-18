import { Button } from '@/components/ui/button'
import { TestNFTAbi } from '@/constants/TestNFTAbi'
import { LightSmartContractAccount } from '@alchemy/aa-accounts'
import { LocalAccountSigner, SmartAccountProvider } from '@alchemy/aa-core'
import { useEffect, useState } from 'react'
import {
  Address,
  createWalletClient,
  encodeFunctionData,
  formatEther,
  http,
  parseEther,
} from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { foundry } from 'viem/chains'
import {
  useBalance,
  useContractRead,
  usePrepareSendTransaction,
  useSendTransaction,
} from 'wagmi'

const privateKeyAccount = privateKeyToAccount(
  '0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d',
)

const walletClient = createWalletClient({
  transport: http(import.meta.env.VITE_JSON_RPC_HTTP_URL!),
  chain: foundry,
  account: privateKeyAccount,
})

const signer = new LocalAccountSigner(privateKeyAccount)

const lightSmartContractAccount = new LightSmartContractAccount({
  owner: signer,
  chain: foundry,
  factoryAddress: import.meta.env.VITE_LIGHT_ACCOUNT_FACTORY_CONTRACT_ADDRESS!,
  rpcClient: import.meta.env.VITE_BUNDLER_URL!,
  // rpcClient: publicClient as any,
  entryPointAddress: import.meta.env.VITE_ENTRY_POINT_CONTRACT_ADDRESS!,
})

const smartAccountProvider = new SmartAccountProvider({
  rpcProvider: import.meta.env.VITE_BUNDLER_URL!,
  chain: foundry,
  entryPointAddress: import.meta.env.VITE_ENTRY_POINT_CONTRACT_ADDRESS!,
}).connect(
  (rpcClient) =>
    new LightSmartContractAccount({
      owner: signer,
      chain: foundry,
      factoryAddress: import.meta.env
        .VITE_LIGHT_ACCOUNT_FACTORY_CONTRACT_ADDRESS!,
      entryPointAddress: import.meta.env.VITE_ENTRY_POINT_CONTRACT_ADDRESS!,
      rpcClient,
    }),
)

const FundSmartAccountButton = ({
  smartAccountAddress,
}: { smartAccountAddress?: Address }) => {
  return (
    <Button
      onClick={() => {
        walletClient.sendTransaction({
          account: privateKeyAccount,
          to: smartAccountAddress!,
          value: parseEther('10'),
        })
      }}
    >
      Fund smart contract account
    </Button>
  )
}

const MintNFTButton = ({
  smartAccountAddress,
}: { smartAccountAddress?: Address }) => {
  const {
    data: nftBalance,
    isLoading,
    error,
  } = useContractRead({
    abi: TestNFTAbi,
    address: import.meta.env.VITE_TEST_NFT_CONTRACT_ADDRESS!,
    functionName: 'balanceOf',
    args: [smartAccountAddress!],
    enabled: smartAccountAddress !== undefined,
  })

  return (
    <>
      <div>
        NFT balance:{' '}
        {isLoading || nftBalance === undefined
          ? 'isLoading'
          : nftBalance.toString()}
      </div>
      <Button
        onClick={() => {
          const functionData = encodeFunctionData({
            abi: TestNFTAbi,
            functionName: 'mint',
          })
          smartAccountProvider.sendUserOperation({
            target: import.meta.env.VITE_TEST_NFT_CONTRACT_ADDRESS!,
            data: functionData,
          })
        }}
      >
        Mint NFT
      </Button>
    </>
  )
}

const useSmartAccountAddress = () => {
  const [smartAccountAddress, setSmartAccountAddress] = useState<
    Address | undefined
  >()
  useEffect(() => {
    lightSmartContractAccount
      .getAddress()
      .then(setSmartAccountAddress)
      .catch(console.error)
  }, [])
  return smartAccountAddress
}

export const TestLightAccount = () => {
  // console.log(lightSmartContractAccount.getAccountInitCode().then(console.log))
  const smartAccountAddress = useSmartAccountAddress()
  const { data: smartAccountBalance, isLoading } = useBalance({
    address: smartAccountAddress,
  })

  console.log(smartAccountAddress)
  return (
    <div className="flex flex-col gap-4">
      <div>Smart account address: {smartAccountAddress}</div>
      <div>
        Smart account balance:{' '}
        {isLoading || smartAccountBalance === undefined
          ? 'isLoading'
          : formatEther(smartAccountBalance.value)}
      </div>
      <FundSmartAccountButton smartAccountAddress={smartAccountAddress} />
      <MintNFTButton smartAccountAddress={smartAccountAddress} />
    </div>
  )
}
