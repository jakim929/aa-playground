// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "forge-std/Script.sol";
import "forge-std/console.sol";
import { LightAccountFactory } from "light-account/LightAccountFactory.sol";
import { LightAccount } from "light-account/LightAccount.sol";



contract DeployLightAccountScript is Script {
    function setUp() public {

    }

    function run() public {
        uint256 deployerPrivateKey = vm.envUint("DEPLOYER_PRIVATE_KEY");
        address ownerAddress = vm.envAddress("OWNER_ADDRESS");
        address accountOwnerAddress = 0x70997970C51812dc3A010C7d01b50e0d17dc79C8;
        IEntryPoint entryPoint = IEntryPoint(0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789);
        bytes32 ddSalt = "31337";

        vm.startBroadcast(deployerPrivateKey);
        
        // Deploy LightAccountFactory
        LightAccountFactory lightAccountFactory = new LightAccountFactory{ salt: ddSalt }(entryPoint);
        console.log("LightAccountFactory deployed to: %s", address(lightAccountFactory));

        // Deploy LightAccount implementation
        LightAccount lightAccount = new LightAccount{ salt: ddSalt }(entryPoint);
        console.log("LightAccount impl deployed to: %s", address(kernel));

        // Deploy smart account for accountOwnerAddress
        address smartAccountAddress = lightAccountFactory.createAccount(accountOwnerAddress, 0);
        console.log("LightAccount address for %s: %s", accountOwnerAddress, address(smartAccountAddress));

        vm.stopBroadcast();
    }
}
