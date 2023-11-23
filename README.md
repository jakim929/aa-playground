# Account Abstraction Playground

Runs off-chain services on a local anvil chain to help test 4337 functionality.

## How to run locally

### install dependencies
```sh
pnpm i
```

### run devnet
```sh
pnpm devnet:up
```

this will
1. start anvil instance at http://0.0.0.0:8545, `chainId = 31337`
2. deploy required contracts
3. run [etherspot/skandha](https://github.com/etherspot/skandha) 4337 bundler at http://0.0.0.0:14337 against the anvil instance. Bundler is run with the `--redirectRpc` option

```sh
curl --location 'http://0.0.0.0:14337/31337/' \
--header 'Content-Type: application/json' \
--data '{
    "id": 3,
    "method": "skandha_config",
    "params": [],
    "jsonrpc": "2.0"
}'
```


## devnet

### contracts

#### EntryPoint contract (v0.6.0)
`0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789`

#### Deterministic deployment proxy
`0x4e59b44847b379578588920ca78fbf26c0b4956c`

#### Multicall3
`0xcA11bde05977b3631167028862bE2a173976CA11`





### run dev environment
```sh
pnpm dev
```
this will
1. start devnet
1. deploy contracts
1. start dev server for frontend (vite)
1. start backend server
