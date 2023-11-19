import { Button } from '@/components/ui/button'
import { TestNFTAbi } from '@/constants/TestNFTAbi'
import { LightSmartContractAccount } from '@alchemy/aa-accounts'
import {
  LocalAccountSigner,
  SmartAccountProvider,
  createPublicErc4337Client,
  createPublicErc4337FromClient,
  deepHexlify,
  resolveProperties,
} from '@alchemy/aa-core'
import { useEffect, useState } from 'react'
import {
  Address,
  RpcRequestError,
  createPublicClient,
  createWalletClient,
  custom,
  encodeFunctionData,
  formatEther,
  http,
  parseEther,
} from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { foundry } from 'viem/chains'
import { useBalance, useContractRead } from 'wagmi'

const privateKeyAccount = privateKeyToAccount(
  '0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d',
)

const walletClient = createWalletClient({
  transport: http(import.meta.env.VITE_JSON_RPC_HTTP_URL!),
  chain: foundry,
  account: privateKeyAccount,
})

const signer = new LocalAccountSigner(privateKeyAccount)

// Can only handle 4337 rpc calls
const erc4337PublicClient = createPublicErc4337Client({
  chain: foundry,
  rpcUrl: import.meta.env.VITE_BUNDLER_URL!,
})

// Can only handle regular rpc calls
const publicClient = createPublicClient({
  chain: foundry,
  transport: http(import.meta.env.VITE_JSON_RPC_HTTP_URL!),
})

const erc4337Methods = [
  'eth_estimateUserOperationGas',
  'eth_sendUserOperation',
  'eth_getUserOperationByHash',
  'eth_getUserOperationReceipt',
  'eth_supportedEntryPoints',
] as const

// falls back to bundler if 4337 rpc call, otherwise uses regular rpc call
const publicAndErc4337Transport = custom({
  async request(body) {
    const { method, params } = body
    if (!erc4337Methods.includes(method)) {
      const result = await publicClient
        .request({ method, params })
        .catch((e) => {
          throw new RpcRequestError({
            body,
            error: e as any,
            url: publicClient.transport.url!,
          })
        })
      return result
    }

    // testing make it work with transeptor bundler
    if (method === 'eth_estimateUserOperationGas') {
      const result = await erc4337PublicClient
        .request({ method, params: [
          {
            ...params[0],
            callGasLimit: '0x500000'
          },
          params[1]
        ] })
        .catch((e) => {
          throw new RpcRequestError({
            body,
            error: e as any,
            url: erc4337PublicClient.transport.url!,
          })
        })
      return result
    }
    console.log(method, params)

    const result = await erc4337PublicClient
      .request({ method, params })
      .catch((e) => {
        throw new RpcRequestError({
          body,
          error: e as any,
          url: erc4337PublicClient.transport.url!,
        })
      })
    return result
  },
})

const publicAndErc4337Client = createPublicErc4337FromClient(
  createPublicClient({
    chain: foundry,
    transport: publicAndErc4337Transport,
  }),
)

const smartAccountProvider = new SmartAccountProvider({
  rpcProvider: publicAndErc4337Client,
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
      rpcClient: rpcClient as any,
    }),
    // Bump up gas to make it work with transeptor bundler
).withGasEstimator(async struct => {
    const request = deepHexlify(await resolveProperties(struct));
    const estimates = await publicAndErc4337Client.estimateUserOperationGas(
      request,
      import.meta.env.VITE_ENTRY_POINT_CONTRACT_ADDRESS!
    );

    struct.callGasLimit = BigInt(Math.floor(Number(BigInt(estimates.callGasLimit)) * 1.5))
    struct.verificationGasLimit = BigInt(Math.floor(Number(BigInt(estimates.verificationGasLimit)) * 1.5))
    struct.preVerificationGas = BigInt(Math.floor(Number(BigInt(estimates.preVerificationGas)) * 1.5))

    return struct;
  
  
})

const lightSmartContractAccount = new LightSmartContractAccount({
  owner: signer,
  chain: foundry,
  factoryAddress: import.meta.env.VITE_LIGHT_ACCOUNT_FACTORY_CONTRACT_ADDRESS!,
  rpcClient: publicAndErc4337Client,
  // rpcClient: publicClient as any,
  entryPointAddress: import.meta.env.VITE_ENTRY_POINT_CONTRACT_ADDRESS!,
})

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
            functionName: 'mintTo',
            args: [smartAccountAddress!],
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
  const smartAccountAddress = useSmartAccountAddress()
  const { data: smartAccountBalance, isLoading } = useBalance({
    address: smartAccountAddress,
  })

  console.log(smartAccountAddress)
  return (
    <div className="flex flex-col gap-4">
      <div>Smart account address: {smartAccountAddress}</div>
      <div>
        Smart account balance :{' '}
        {isLoading || smartAccountBalance === undefined
          ? 'isLoading'
          : formatEther(smartAccountBalance.value)}
      </div>
      <FundSmartAccountButton smartAccountAddress={smartAccountAddress} />
      <MintNFTButton smartAccountAddress={smartAccountAddress} />
    </div>
  )
}
