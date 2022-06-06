const hre = require("hardhat");

async function main() {
  const Sailors = await hre.ethers.getContractFactory("Sailors");
  const sailors = await Sailors.deploy("Hello, Hardhat!");

  await sailors.deployed();

  console.log("Greeter deployed to:", sailors.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
