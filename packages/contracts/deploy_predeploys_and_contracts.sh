#!/bin/bash

# Check if RPC_URL is set, if not exit the script
if [ -z "$RPC_URL" ]; then
    echo "RPC_URL is not set. Exiting the script."
    exit 1
fi

if [ -z "$DEPLOYER_EOA_PRIVATE_KEY" ]; then
    echo "DEPLOYER_EOA_PRIVATE_KEY is not set. Exiting the script."
    exit 1
fi

if [ -z "$ENTRYPOINT_CONTRACT_ADDRESS" ]; then
    echo "ENTRYPOINT_CONTRACT_ADDRESS is not set. Exiting the script."
    exit 1
fi

echo "Deploying predeployBytecodes to $RPC_URL"

# Navigate to the predeployBytecode directory
cd predeployBytecodes

# Iterate over each subdirectory
for dir in */; do
    # Get the name of the subdirectory without the trailing slash
    dirName=${dir%/}

    # Iterate over each file in the subdirectory
    for file in "$dirName"/*; do
        # Extract the address (name of the file without the path)
        addressToDeployTo=$(basename "$file")

        echo "Deploying bytecode for $dirName $addressToDeployTo"

        # Extract the bytecode (content of the file)
        bytecode=$(cat "$file")

        # Execute the RPC call
        cast rpc -r $RPC_URL anvil_setCode $addressToDeployTo $bytecode
    done
done

cd ..

forge script --rpc-url $RPC_URL --broadcast -vvvv ./script/DeploySmartAccountFactories.s.sol:DeploySmartAccountFactoriesScript --sig "run(uint256 deployerAndOwnerPrivateKey, address entryPoint)" $DEPLOYER_EOA_PRIVATE_KEY $ENTRYPOINT_CONTRACT_ADDRESS
