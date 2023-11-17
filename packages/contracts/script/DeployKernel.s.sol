// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "forge-std/Script.sol";
import { KernelFactory } from "kernel/src/factory/KernelFactory.sol";
import { Kernel } from "kernel/src/Kernel.sol";
import { IEntryPoint } from "I4337/interfaces/IEntryPoint.sol";


contract DeployKernelFactoryScript is Script {
    function setUp() public {}

    function run() public {
        uint256 deployerPrivateKey = vm.envUint("DEPLOYER_PRIVATE_KEY");
        address ownerAddress = vm.envAddress("OWNER_ADDRESS");
        IEntryPoint entryPoint = IEntryPoint(0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789);

        vm.startBroadcast(deployerPrivateKey);

        KernelFactory kernelFactory = new KernelFactory(ownerAddress, IEntryPoint(0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789));

        Kernel kernel = new Kernel(entryPoint);

        kernelFactory.setImplementation(address(kernel), true);

        kernelFactory.addStake{ value: 1 ether }(1000);

        vm.stopBroadcast();
    }
}
