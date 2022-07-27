const Token = artifacts.reqire("Token");

module.exports = async function(deployer) {
    await deployer.deploy(Token, "Star Sailors Planet", "SKP");
    let tokenInstance = await Token.deployed();
    await tokenInstance.mint(100, 200, 100000); // nft properties and struct values (not including lastMeal which is a timestamp) | token id 0
    await tokenInstance.mint(240, 100, 200000); // token id 1
    let planet = await tokenInstance.getTokenDetails(0);
    console.log(planet);
}