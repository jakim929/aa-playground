// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "forge-std/Script.sol";
import "forge-std/console.sol";
import { TestNFT } from "../src/TestNFT.sol";

contract DeployTestNFTScript is Script {
    function setUp() public {}

    function run() public {
        uint256 deployerPrivateKey = vm.envUint("DEPLOYER_PRIVATE_KEY");
         bytes32 ddSalt = "31337";

        vm.startBroadcast(deployerPrivateKey);

        TestNFT testNFT = new TestNFT{ salt: ddSalt }('TestNFT', 'TN');

        console.log("TestNFT deployed to: %s", address(testNFT));

        vm.stopBroadcast();
    }
}
