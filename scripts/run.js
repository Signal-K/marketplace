const { hexZeroPad } = require("ethers/lib/utils")

const main = async () => {
    const gameContractFactory = await hre.ethers.getContractFactory("GameContent"); // Compiles the contract
    const gameContract = await gameContractFactory.deploy(
        ["Scrooby", "Gizmo", "Elsie"], // Names
        ["QmU8So2HJnM9sfj7puaY3DqV3nKFT9jeDC9U1vYjrNQdvD", // Images CID on IPFS (pinata.cloud)
            "https://i.imgur.com/xVu4vFL.png",
            "https://i.imgur.com/WMB6g9u.png"],
        [100, 200, 300], // HP Values
        [100, 50, 25], // Attack damage values
        "Scroobus", // Boss name
        "https://i.imgur.com/AksR0tt.png", // Boss image
        10000, // Boss HP
        500 // Boss attack damage
    ); // Hardhat creates a local Eth network just for this contract with refresh for every deploy
    await gameContract.deployed(); // Wait until the contract is mined & deployed to the (current) local blockchain
    console.log("Contract deployed to:", gameContract.address);

    let txn;
    txn = await gameContract.mintCharacterNFT(2);
    await txn.wait();

    // Get value of the NFT's URI
    let returnedTokenUri = await gameContract.tokenURI(1);
    console.log("Token URI:", returnedTokenUri);
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