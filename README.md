# Account Abstraction Playground

Runs off-chain services on a local anvil chain to help test 4337 functionality.

## How to run locally

### install dependencies
```sh
pnpm i
```

### run devnet
```sh
docker compose --env-file ./.env.devnet up
```

this will
1. start anvil instance at http://0.0.0.0:8545, `chainId = 31337`
2. deploy required contracts
3. run [etherspot/skandha](https://github.com/etherspot/skandha), rundler, transeptor-bundler against anvil node



# devnet details

## services
#### anvil rpc (chainId: 31337)
`http://0.0.0.0:8545`

#### skandha bundler rpc
`http://0.0.0.0:3010/skandha-bundler-rpc`

#### transeptor bundler rpc
`http://0.0.0.0:3010/transeptor-bundler-rpc`

#### rundler bundler rpc
`http://0.0.0.0:3010/rundler-bundler-rpc`


## basic contracts

#### EntryPoint contract (v0.6.0)
`0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789`

#### Deterministic deployment proxy
`0x4e59b44847b379578588920ca78fbf26c0b4956c`

#### Multicall3
`0xcA11bde05977b3631167028862bE2a173976CA11`

## smart account contracts

### LightAccount
#### LightAccountFactory
`0xAad3de1B3BB85F10658972372058F772A70DFefC`

### Kernel
#### KernelAccountFactory
`0xFef4e11B0121eb9998bb36A7Bbe4ea2AC793A872`

#### Kernel implementation
`0x282993C5763F1b929A0c856DAd2F271698d4811b`

#### Kernel ECDSAValidator
`0x5A24eDA104aFb5d9181C57f7F46651ceBC5DdC7D`

