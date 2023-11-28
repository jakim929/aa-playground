# 🛠️ Account Abstraction Playground

Runs off-chain services on a local anvil chain to help test 4337 functionality.

## 🖥️  Running locally

### Running the devnet
#### 1. copy [`docker-compose.devnet.yaml`](https://github.com/jakim929/aa-playground/blob/main/docker-compose.devnet.yaml)  and [`.env.devnet`](https://github.com/jakim929/aa-playground/blob/main/.env.devnet) to your repo

#### 2. Run services

```sh
docker compose -f docker-compose.devnet.yaml --env-file ./.env.devnet up
```

This will:

1. 🚀 Start anvil instance at http://0.0.0.0:8545, `chainId = 31337`
2. 🛠 Deploy required contracts
3. 📡 Launch the following bundler services against anvil node
    - [skandha](https://github.com/etherspot/skandha) (TypeScript, by [etherspot.io](https://etherspot.io/))
    - [transeptor-bundler](https://github.com/transeptorlabs/transeptor-bundler) (TypesScript, by [Transeptor Labs](https://transeptorlabs.io/))
    -  [rundler](https://github.com/alchemyplatform/rundler) (Rust, by [Alchemy](https://www.alchemy.com/)) [COMING SOON 🔜]
        - Note: Rundler doesn't support unsafe mode yet, avoid using until this [issue](https://github.com/alchemyplatform/rundler/issues/470) is closed
4. 🌍 Set up a nginx reverse proxy at http://0.0.0.0:3010 with the following services:

## 📡  Services 

| Service | Direct URL | Proxy URL |
|---------|------------|-----------|
| Anvil RPC (chainId: 31337) | `http://0.0.0.0:8545` | `http://0.0.0.0:3010/anvil-rpc` |
| Skandha Bundler RPC | - | `http://0.0.0.0:3010/skandha-bundler-rpc` |
| Transeptor Bundler RPC | - | `http://0.0.0.0:3010/transeptor-bundler-rpc` |

## 📝 Basic Contract Deployments
| Contract | Address |
|----------|---------|
| [EntryPoint Contract (v0.6.0)](https://github.com/eth-infinitism/account-abstraction/blob/develop/contracts/core/EntryPoint.sol) | `0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789` |
| [Deterministic Deployment Proxy](https://github.com/Arachnid/deterministic-deployment-proxy) | `0x4e59b44847b379578588920ca78fbf26c0b4956c` |
| [Multicall3](https://github.com/mds1/multicall) | `0xcA11bde05977b3631167028862bE2a173976CA11` |


## 💼 Smart Account Contract Deployments
### LightAccount
Made by [Alchemy](https://www.alchemy.com/), LightAccount is a lightweight implementation of a smart account. Not as many features, but is easy to understand, lightweight, and gas efficient.

| Contract | Address |
|----------|---------|
| [LightAccountFactory](https://github.com/alchemyplatform/light-account/blob/main/src/LightAccountFactory.sol) | `0xAad3de1B3BB85F10658972372058F772A70DFefC` |

### Kernel
Made by [zerodev](https://zerodev.app/), Kernel is a modular smart account, and one of the [most used smart account implementations](https://twitter.com/SixdegreeLab/status/1705585256638849325?s=20). It is feature packed, gas efficient, supports modular plugins.



| Contract | Address |
|----------|---------|
| [KernelAccountFactory](https://github.com/zerodevapp/kernel/blob/main/src/factory/KernelFactory.sol) | `0xFef4e11B0121eb9998bb36A7Bbe4ea2AC793A872` |
| [Kernel Implementation](https://github.com/zerodevapp/kernel/blob/main/src/Kernel.sol) | `0x282993C5763F1b929A0c856DAd2F271698d4811b` |
| [Kernel ECDSAValidator](https://github.com/zerodevapp/kernel/blob/main/src/validator/ECDSAValidator.sol) | `0x5A24eDA104aFb5d9181C57f7F46651ceBC5DdC7D` |



## 🔨 Developing locally / building from scratch

#### 1. Clone the repo
```sh
git clone --recurse-submodules https://github.com/jakim929/aa-playground.git
cd aa-playground
```

#### 2. Run services
```sh
docker compose --env-file ./.env.devnet up
```

or to use pre-built images on docker-hub

```sh
docker compose -f docker-compose.devnet.yaml --env-file ./.env.devnet up
```