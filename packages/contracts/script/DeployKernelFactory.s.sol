// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "forge-std/Script.sol";
import "forge-std/console.sol";
import { KernelFactory } from "kernel/src/factory/KernelFactory.sol";
import { ECDSAValidator } from "kernel/src/validator/ECDSAValidator.sol";
import { Kernel } from "kernel/src/Kernel.sol";
import { IEntryPoint } from "I4337/interfaces/IEntryPoint.sol";


contract DeployKernelFactoryScript is Script {
    function setUp() public {

    }

    function run(uint256 deployerAndOwnerPrivateKey, address entryPoint) public {
        IEntryPoint entryPoint = IEntryPoint(entryPoint);
        bytes32 ddSalt = "";

        vm.startBroadcast(deployerAndOwnerPrivateKey);
        
        // Deploy ECDSAValidator to use as default validator
        ECDSAValidator ecdsaValidator = new ECDSAValidator{ salt: ddSalt }();
        console.log("ECDSAValidator deployed to: %s", address(ecdsaValidator));

        // Deploy kernel implementation
        KernelFactory kernelFactory = new KernelFactory{ salt: ddSalt }(vm.addr(deployerAndOwnerPrivateKey), entryPoint);
        console.log("KernelFactory deployed to: %s", address(kernelFactory));

        // Deploy kernel implementation
        Kernel kernel = new Kernel{ salt: ddSalt }(entryPoint);
        console.log("Kernel impl deployed to: %s", address(kernel));

        // Set config for kernel factory
        kernelFactory.setImplementation(address(kernel), true);
        kernelFactory.addStake{ value: 1 ether }(1000);

        // // Deploy smart account for accountOwnerAddress
        // address accountOwnerAddress = 0x70997970C51812dc3A010C7d01b50e0d17dc79C8;
        // bytes memory encodedAccountOwnerAddress = abi.encode(accountOwnerAddress);
        // address smartAccountAddress = kernelFactory.createAccount(address(kernel), abi.encodeWithSignature("initialize(address,bytes)", ecdsaValidator, encodedAccountOwnerAddress), 0);
        // console.log("Account address for %s: %s", accountOwnerAddress, address(smartAccountAddress));

        vm.stopBroadcast();
    }
}
