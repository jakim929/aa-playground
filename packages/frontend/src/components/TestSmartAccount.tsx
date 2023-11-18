import { Button } from '@/components/ui/button'
import { KernelAbi } from '@/constants/KernelAbi'
import {
  LightSmartContractAccount,
  getDefaultLightAccountFactoryAddress,
} from '@alchemy/aa-accounts'
import { AlchemyProvider } from '@alchemy/aa-alchemy'
import {
  LocalAccountSigner,
  UserOperationStruct,
  type SmartAccountSigner,
  UserOperationCallData,
} from '@alchemy/aa-core'
import { Hex, concatHex, encodeFunctionData } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { sepolia } from 'viem/chains'

const privateKeyAccount = privateKeyToAccount(
  '0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d',
)

const signer = new LocalAccountSigner(privateKeyAccount)

const signMessageWithSudoValidatorParams = async (
  userOpHash: Uint8Array | string | Hex,
): Promise<Hex> => {
  const signature = await signer.signMessage(userOpHash)
  return concatHex(['0x00000000', signature])
}

const signWithEip6492 = async () => {}

const encodeExecute = (calldata: UserOperationCallData): Hex => {
  return encodeFunctionData({
    abi: KernelAbi,
    functionName: 'execute',
    args: [calldata.target, calldata.value || 0n, calldata.data, 0],
  })
}

const getUserOperation = async (
  calldata: UserOperationCallData,
): Promise<UserOperationStruct> => {
  const encodedExecuteCalldata = encodeExecute(calldata)
}

export const TestSmartAccount = () => {
  return (
    <div>
      <Button>Send</Button>
    </div>
  )
}
