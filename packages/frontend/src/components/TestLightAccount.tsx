import { EntryPointAbi } from '@/constants/EntryPointAbi'
import { LightSmartContractAccount } from '@alchemy/aa-accounts'
import {
  LocalAccountSigner,
  SimpleAccountFactoryAbi,
  createPublicErc4337FromClient,
} from '@alchemy/aa-core'
import {
  createPublicClient,
  decodeAbiParameters,
  decodeFunctionData,
  getAbiItem,
  http,
} from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { foundry } from 'viem/chains'

const privateKeyAccount = privateKeyToAccount(
  '0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d',
)

const signer = new LocalAccountSigner(privateKeyAccount)

const publicClient = createPublicClient({
  transport: http(import.meta.env.VITE_JSON_RPC_HTTP_URL!),
  chain: foundry,
})

const lightSmartContractAccount = new LightSmartContractAccount({
  owner: signer,
  chain: foundry,
  factoryAddress: import.meta.env.VITE_LIGHT_ACCOUNT_FACTORY_CONTRACT_ADDRESS!,
  rpcClient: import.meta.env.VITE_BUNDLER_URL!,
  // rpcClient: publicClient as any,
  entryPointAddress: import.meta.env.VITE_ENTRY_POINT_CONTRACT_ADDRESS!,
})

export const TestLightAccount = () => {
  // console.log(lightSmartContractAccount.getAccountInitCode().then(console.log))
  lightSmartContractAccount.isAccountDeployed().then(console.log)
  return <div>Hello</div>
}
