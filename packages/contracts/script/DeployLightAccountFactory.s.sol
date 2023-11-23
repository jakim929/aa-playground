// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "forge-std/Script.sol";
import "forge-std/console.sol";
import { LightAccountFactory } from "light-account/LightAccountFactory.sol";
import { LightAccount } from "light-account/LightAccount.sol";
import { IEntryPoint } from "account-abstraction/interfaces/IEntryPoint.sol";

contract DeployLightAccountFactoryScript is Script {
    function setUp() public {

    }

    function run(uint256 _deployerPrivateKey, address _entryPoint) public {
        IEntryPoint entryPoint = IEntryPoint(_entryPoint);
        bytes32 ddSalt = "";

        vm.startBroadcast(_deployerPrivateKey);
        
        // Deploy LightAccountFactory
        LightAccountFactory lightAccountFactory = new LightAccountFactory{ salt: ddSalt }(entryPoint);
        console.log("LightAccountFactory deployed to: %s", address(lightAccountFactory));

        // // Deploy LightAccount implementation
        // LightAccount lightAccount = new LightAccount{ salt: ddSalt }(entryPoint);
        // console.log("LightAccount impl deployed to: %s", address(lightAccount));

        // // Deploy smart account for accountOwnerAddress
        // address accountOwnerAddress = 0x70997970C51812dc3A010C7d01b50e0d17dc79C8;
        // LightAccount smartAccountAddress = lightAccountFactory.createAccount(accountOwnerAddress, 0);
        // console.log("LightAccount address for %s: %s", address(accountOwnerAddress), address(smartAccountAddress));

        // entryPoint.getSenderAddress(initCode);

        vm.stopBroadcast();
    }
}
