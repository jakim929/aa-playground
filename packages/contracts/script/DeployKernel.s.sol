// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "forge-std/Script.sol";
import "forge-std/console.sol";
import { KernelFactory } from "kernel/src/factory/KernelFactory.sol";
import { Kernel } from "kernel/src/Kernel.sol";
import { IEntryPoint } from "I4337/interfaces/IEntryPoint.sol";


contract DeployKernelFactoryScript is Script {
    function setUp() public {

    }

    function run() public {
        uint256 deployerPrivateKey = vm.envUint("DEPLOYER_PRIVATE_KEY");
        address ownerAddress = vm.envAddress("OWNER_ADDRESS");
        IEntryPoint entryPoint = IEntryPoint(0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789);
        bytes32 ddSalt = "31337";

        vm.startBroadcast(deployerPrivateKey);

        KernelFactory kernelFactory = new KernelFactory{ salt: ddSalt }(ownerAddress, entryPoint);

        console.log("KernelFactory deployed to: %s", address(kernelFactory));

        Kernel kernel = new Kernel{ salt: ddSalt }(entryPoint);

        console.log("Kernel impl deployed to: %s", address(kernel));

        kernelFactory.setImplementation(address(kernel), true);

        kernelFactory.addStake{ value: 1 ether }(1000);

        vm.stopBroadcast();
    }
}
