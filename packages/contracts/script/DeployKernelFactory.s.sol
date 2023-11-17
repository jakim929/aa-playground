// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "forge-std/Script.sol";
import { KernelFactory } from "kernel/src/KernelFactory.sol";

contract DeployCounterScript is Script {
    function setUp() public {}

    function run() public {
        uint256 deployerPrivateKey = vm.envUint("DEPLOYER_PRIVATE_KEY");
        address ownerAddress = vm.envAddress("OWNER_ADDRESS");

        vm.startBroadcast(deployerPrivateKey);

        KernelFactory kernelFactory = new KernelFactory(0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789);

        vm.stopBroadcast();
    }
}
