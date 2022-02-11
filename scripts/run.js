const { hexZeroPad } = require("ethers/lib/utils")

const main = async () => {
    const gameContractFactory = await hre.ethers.getContractFactory("GameContent"); // Compiles the contract
    const gameContract = await gameContractFactory.deploy(); // Hardhat creates a local Eth network just for this contract with refresh for every deploy
    await gameContract.deployed(); // Wait until the contract is mined & deployed to the (current) local blockchain
    console.log("Contract deployed to:", gameContract.address);
};

const runMain = async () => {
    try {
        await main();
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

runMain();