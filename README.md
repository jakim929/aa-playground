# Account Abstraction Playground

## How to run locally

### install dependencies
```
pnpm i
```

### run dev environment
```
pnpm dev
```
the above command will
1. start anvil instance
2. deploy contracts (foundry)
3. start dev server for frontend (vite)
4. start backend server

### run devnet
```
pnpm devnet
```

the above command will
1. start anvil instance
2. deploy Multicall3 and 4337 Entrypoint contracts
3. run [etherspot/skandha](https://github.com/etherspot/skandha) 4337 bundler at http://0.0.0.0:14337 against the anvil instance