# Account Abstraction Playground

Runs off-chain services on a local anvil chain to help test 4337 functionality.

## running locally

### run devnet
```sh
docker compose --env-file ./.env.devnet up
```

this will
1. start anvil instance at http://0.0.0.0:8545, `chainId = 31337`
2. deploy required contracts
3. run the following bundler services against anvil node
    - [skandha](https://github.com/etherspot/skandha)
        - typescript implementation by [etherspot.io](https://etherspot.io/)
    - [transeptor-bundler](https://github.com/transeptorlabs/transeptor-bundler)
        - typescript implementation by [Transeptor Labs](https://transeptorlabs.io/)
    - [rundler](https://github.com/alchemyplatform/rundler)
        - rust implementation by [Alchemy](https://www.alchemy.com/)
        - doesn't support unsafe mode yet, meaning don't use with anvil until this [issue](https://github.com/alchemyplatform/rundler/issues/470) is closed
4. sets up a nginx reverse proxy at http://0.0.0.0:3010 with the following services

## services
#### anvil rpc (chainId: 31337)
`http://0.0.0.0:8545`

`http://0.0.0.0:3010/anvil-rpc`

#### skandha bundler rpc
`http://0.0.0.0:3010/skandha-bundler-rpc`

#### transeptor bundler rpc
`http://0.0.0.0:3010/transeptor-bundler-rpc`

#### rundler bundler rpc
`http://0.0.0.0:3010/rundler-bundler-rpc`


## basic contracts

#### [EntryPoint contract (v0.6.0)](https://github.com/eth-infinitism/account-abstraction/blob/develop/contracts/core/EntryPoint.sol)
`0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789`

#### [Deterministic deployment proxy](https://github.com/Arachnid/deterministic-deployment-proxy)
`0x4e59b44847b379578588920ca78fbf26c0b4956c`

#### [Multicall3](https://github.com/mds1/multicall)
`0xcA11bde05977b3631167028862bE2a173976CA11`

## smart account contracts

### [LightAccount](https://github.com/alchemyplatform/light-account)
#### [LightAccountFactory](https://github.com/alchemyplatform/light-account/blob/main/src/LightAccountFactory.sol)
`0xAad3de1B3BB85F10658972372058F772A70DFefC`

### [Kernel](https://github.com/zerodevapp/kernel)
#### [KernelAccountFactory](https://github.com/zerodevapp/kernel/blob/main/src/factory/KernelFactory.sol)
`0xFef4e11B0121eb9998bb36A7Bbe4ea2AC793A872`

#### [Kernel implementation](https://github.com/zerodevapp/kernel/blob/main/src/Kernel.sol)
`0x282993C5763F1b929A0c856DAd2F271698d4811b`

#### [Kernel ECDSAValidator](https://github.com/zerodevapp/kernel/blob/main/src/validator/ECDSAValidator.sol)
`0x5A24eDA104aFb5d9181C57f7F46651ceBC5DdC7D`

