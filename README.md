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
1. deploy Multicall3 and 4337 Entrypoint contracts
1. run [etherspot/skandha](https://github.com/etherspot/skandha) 4337 bundler at http://0.0.0.0:14337 against the anvil instance

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

### run dev environment
```sh
pnpm dev
```
this will
1. start devnet
1. deploy contracts
1. start dev server for frontend (vite)
1. start backend server
