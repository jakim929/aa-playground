// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "forge-std/Script.sol";
import "forge-std/console.sol";
import { KernelFactory } from "kernel/src/factory/KernelFactory.sol";
import { ECDSAValidator } from "kernel/src/validator/ECDSAValidator.sol";
import { Kernel } from "kernel/src/Kernel.sol";
import { LightAccountFactory } from "light-account/LightAccountFactory.sol";
import { IEntryPoint } from "I4337/interfaces/IEntryPoint.sol";
import { IEntryPoint as IEntryPointForLightAccount } from "account-abstraction/interfaces/IEntryPoint.sol";


contract DeploySmartAccountFactoriesScript is Script {
    function setUp() public {

    }

    function run(uint256 _deployerAndOwnerPrivateKey, address _entryPoint) public {
        bytes32 ddSalt = "";

        vm.startBroadcast(_deployerAndOwnerPrivateKey);
        
        // Deploy ECDSAValidator to use as default validator
        ECDSAValidator ecdsaValidator = new ECDSAValidator{ salt: ddSalt }();
        console.log("ECDSAValidator deployed to: %s", address(ecdsaValidator));

        // Deploy kernel implementation
        KernelFactory kernelFactory = new KernelFactory{ salt: ddSalt }(vm.addr(_deployerAndOwnerPrivateKey), IEntryPoint(_entryPoint));
        console.log("KernelFactory deployed to: %s", address(kernelFactory));

        // Deploy kernel implementation
        Kernel kernel = new Kernel{ salt: ddSalt }(IEntryPoint(_entryPoint));
        console.log("Kernel impl deployed to: %s", address(kernel));

        // Set config for kernel factory
        kernelFactory.setImplementation(address(kernel), true);
        kernelFactory.addStake{ value: 1 ether }(1000);


        // Deploy LightAccountFactory
        LightAccountFactory lightAccountFactory = new LightAccountFactory{ salt: ddSalt }(IEntryPointForLightAccount(_entryPoint));
        console.log("LightAccountFactory deployed to: %s", address(lightAccountFactory));

        vm.stopBroadcast();
    }
}
