# notes: some gotchas along the way


## SenderCreator deployment
`SenderCreator` is initialized when constructing `EntryPoint`, so just doing `vm.etch` with the `EntryPoint` bytecode is insufficient. Need to etch bytecode into the expected location of `SenderCreator`

## Since KernelFactory is stateful, need to create stake for entrypoint
`skandha` doesn't seem to care though? MinStake seems to be 0

## skandha with `aa-sdk` for `eth_estimateUserOperationGas`

`skandha` `eth_estimateUserOperationGas` requires all fields to be present and valid. not sure if that's upt to spec. `aa-sdk` doesn't fill all values (ie. preVerificationGas, callGasLimit). Pretty sure `rundler` doesn't care

#### valid for skandha
```json
{
    "jsonrpc": "2.0",
    "id": 45,
    "method": "eth_estimateUserOperationGas",
    "params": [
        {
        "initCode": "0xcDb9f4eF54906dFa05cbe71c65b029b171732A765fbfb9cf00000000000000000000000070997970c51812dc3a010c7d01b50e0d17dc79c80000000000000000000000000000000000000000000000000000000000000000",
        "sender": "0xC42241df3D72a376c3976AEa40B56AE22B9fE549",
        "nonce": "0x0",
        "callData": "0xb61d27f600000000000000000000000070f13196950bdabc3a243088e8ee1db19c66467d0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000041249c58b00000000000000000000000000000000000000000000000000000000",
        "signature": "0xfffffffffffffffffffffffffffffff0000000000000000000000000000000007aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa1c",
        "maxFeePerGas": "0x50aeed97",
        "maxPriorityFeePerGas": "0x50343a08",
        "callGasLimit": "0x1",
        "paymasterAndData": "0x",
        "preVerificationGas": "0x0",
        "verificationGasLimit": "0x0"
        },
        "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789"
    ]
}
```

#### response

```json
{
    "jsonrpc": "2.0",
    "id": 45,
    "result": {
        "preVerificationGas": "0xaf18",
        "verificationGasLimit": "0x49a8b",
        "verificationGas": "0x49a8b",
        "validUntil": "0xffffffffffff",
        "callGasLimit": "0x1b1f6",
        "maxFeePerGas": "0x59682f0e",
        "maxPriorityFeePerGas": "0x59682f00"
    }
}
```

#### invalid
```json
{
  "jsonrpc": "2.0",
  "id": 45,
  "method": "eth_estimateUserOperationGas",
  "params": [
    {
      "initCode": "0xcDb9f4eF54906dFa05cbe71c65b029b171732A765fbfb9cf00000000000000000000000070997970c51812dc3a010c7d01b50e0d17dc79c80000000000000000000000000000000000000000000000000000000000000000",
      "sender": "0xC42241df3D72a376c3976AEa40B56AE22B9fE549",
      "nonce": "0x0",
      "callData": "0xb61d27f600000000000000000000000070f13196950bdabc3a243088e8ee1db19c66467d0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000041249c58b00000000000000000000000000000000000000000000000000000000",
      "signature": "0xfffffffffffffffffffffffffffffff0000000000000000000000000000000007aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa1c",
      "paymasterAndData": "0x",
      "maxFeePerGas": "0x5edcdff9",
      "maxPriorityFeePerGas": "0x598f7c52"
    },
    "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789"
  ]
}
```

## valid request for rundler

```json
{
    "jsonrpc": "2.0",
    "id": 45,
    "method": "eth_estimateUserOperationGas",
    "params": [
        {
        "initCode": "0xcDb9f4eF54906dFa05cbe71c65b029b171732A765fbfb9cf00000000000000000000000070997970c51812dc3a010c7d01b50e0d17dc79c80000000000000000000000000000000000000000000000000000000000000000",
        "sender": "0xC42241df3D72a376c3976AEa40B56AE22B9fE549",
        "nonce": "0x0",
        "callData": "0xb61d27f600000000000000000000000070f13196950bdabc3a243088e8ee1db19c66467d0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000041249c58b00000000000000000000000000000000000000000000000000000000",
        "signature": "0xfffffffffffffffffffffffffffffff0000000000000000000000000000000007aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa1c",
        "maxFeePerGas": "0x50aeed97",
        "maxPriorityFeePerGas": "0x50343a08",
        "paymasterAndData": "0x"

        },
        "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789"
    ]
}
```

#### response

```json
{
    "jsonrpc": "2.0",
    "result": {
        "preVerificationGas": "0xb6e8",
        "verificationGasLimit": "0x3fdc6",
        "callGasLimit": "0x13000"
    },
    "id": 45
}
```