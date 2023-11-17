# Contracts

Deploys contracts required to use [Kernel smart accounts](https://github.com/zerodevapp/kernel)

## Deployment addresses

The following is deployed using a [deterministic deployment proxy](https://github.com/Arachnid/deterministic-deployment-proxy) with salt

 `bytes32 ddSalt = '31337'`

### KernelFactory
```sh
0xb0392f89D211f36Bd0A89F269b2146cA82d49060
```


### KernelFactory configuration
```sh
# OWNER
#  - derived from 'test test test test test test test test test test test junk'
0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266

# ENTRYPOINT STAKE AMOUNT
1 ETH
```

### Kernel implementation
```sh
0x8DfebcdA1Af688C439d9b37D828C0668c8B791f6
```