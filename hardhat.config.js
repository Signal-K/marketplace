require("@nomiclabs/hardhat-waffle");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: '0.8.1',
  networks: {
    rinkeby: {
      url: "https://eth-rinkeby.alchemyapi.io/v2/gQUHfEyfP_v73J37inUmWzPnYN0nOLr_",
      accounts: ["a7a2f59191ce8477761f043f9da63a40ced24f803fd6a423930585e981ef5554"]
      /*url: process.env.ALCHEMY, // Alchemy Rinkeby URL
      accounts: [process.env.PRIVATE], // This is the private key of the account (rinkeby)*/
    },
  },
};