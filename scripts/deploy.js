// scripts/deploy.js
const { ethers, run, network } = require("hardhat")
require("dotenv").config()

async function main() {
    console.log("Deploying contract...")

    // Get the ContractFactory
    const SimpleStorage = await ethers.getContractFactory("SimpleStorage")

    // Deploy the contract
    const simpleStorage = await SimpleStorage.deploy()

    // Log the deployed contract address
    console.log("Contract deployed to:", simpleStorage.target)

    //if network is set to sepolia and etherscan api is available, verify
    //11155111 is the chainId of sepolia testnet
    if (network.config.chainId === 11155111 && process.env.ETHERSCAN_API_KEY) {
        await simpleStorage.deploymentTransaction.wait(10) //wait 10 seconds
        await verify(simpleStorage.target, [])
    }

    //interacting with my blockchain contract
    const currentValue = await simpleStorage.retrieve()
    console.log(`CurrentValue is: ${currentValue}`)

    const transactionResponse = await simpleStorage.store(7)
    await transactionResponse.wait(1)

    const updatedValue = await simpleStorage.retrieve()
    console.log(`CurrentValue is: ${updatedValue}`)
}

async function verify(contractAddress, args) {
    console.log("Verifying contract...")
    try {
        await run("verify:verify", {
            address: contractAddress,
            constructorArgument: args,
        })
    } catch (error) {
        if (error.message.toLowerCase().includes("already verified")) {
            console.log("Already verified")
        } else {
            console.log(error)
        }
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
