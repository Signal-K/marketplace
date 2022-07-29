//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

/* npode module @openzeppelin/contracts
import "../node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";*/

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";


contract Token is ERC721, Ownable {
    /* Connections with other contracts
    ERC20Rewards private _rewardsToken;
    * Staking contract
    * Other NFT contracts (maybe add a function to add links to others in the future, thus making them partially dynamic?)
    * Regular erc20 rewards
    */

    struct Planet {
        // uint256 planetId/tokenId
        uint8 damage; // 0-255
        uint8 magic; // Starting off by using starter params for now, will update these stats later
        uint256 lastMeal;
        uint256 endurance; // 24 hours or die (eat)
    }

    // list of planet types
    enum Species { 
        LAVA,
        WATER,
        ROCKY,
        GAS,
        ICE,
        LUSH,
        CRATER,
        VOLCANIC,
        RINGED
    }

    // Some planets may fall into multiple types/species - how do we do this? "Species" can refer to name, main species, this can be a secondary species/type?
    uint8[9] private SpeciesTypes = [
        0,
        0,
        1,
        2,
        3,
        4,
        4,
        5,
        6
    ]; // numbers refer to list/array of speciesTypes -> e.g. above list in Species

    // Which types of planets can evolve?
    bool[9] evolves = [
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true
    ];

    address public manager; // contract manager

    uint256 nextId = 0;

    mapping( uint256 => Planet ) private _tokenDetails; // map from the tokenId to a specific instance of struct

    constructor(string memory name, string memory symbol) ERC721(name, symbol) {

    }

    function getTokenDetails(uint256 tokenId) public view returns (Planet memory) {
        return _tokenDetails[tokenId];
    }

    // Minting of new tokens
    function mint(uint8 damage, uint8 magic, uint8 fastingTime, uint256 endurance) public onlyOwner {
        _tokenDetails[nextId] = Planet(damage, magic, block.timestamp, endurance); // Initialise the planet with its init stats (the planet had its last meal (first meal as well) at mint time, which is the CURRENT lastmeal time)
        _safeMint(msg.sender, nextId); // Feed in data from erc721 _safeMint (to-do) -> from classification (api)
        nextId++;
    }

    function feed(uint256 tokenId) public {
        Planet storage planet = _tokenDetails[tokenId];
        require(planet.lastMeal + planet.endurance > block.timestamp); // ensure the planet is still alive (based on lastMeal, endurance)
        planet.lastMeal = block.timestamp; // feeding the planet updates the time(stamp) of its last meal
    }

    function _beforeTokenTransfer(address from, address to, uint256 tokenId) internal override {
        Planet storage planet = _tokenDetails[tokenId];
        require(planet.lastMeal + planet.endurance > block.timestamp); // ensure the planet is still alive before allowing it to be transferred
    }

    // Retrieve all the NFTs from this contract the user owns -> then display them to the frontend
    function getAllTokensForUser(address user) public view returns (uint256[] memory) {
        uint256 tokenCount = balanceOf(user);
        if (tokenCount == 0) {
            return new uint256[](0); // size 0 -> the user owns 0 nfts from this contract
        } else {
            uint[] memory result = new uint256[](tokenCount);
            uint256 totalPlanets = nextId;
            uint256 resultIndex = 0;
            uint256 i; // for the for loop
            for (i = 0; i < totalPlanets; i++) {
                if (ownerOf(i) == user) {
                    result[resultIndex] = i;
                    resultIndex++;
                }
            }
        }
    }

    /* to-do
    function classify() {
        Ingame function github/signal-k/starsailors
    }
    /* To-do 
    * Planets can breed (creating exomoons or spawning other planets -> but has to be based on real-world data from telescopes/surveys)
    * Mint function is currently randomised, however we will need to pass params into it (and possibly have multiple smart contract iterations) from classification data (the mint occurs in-game when a classification has been achieved)
    * Install truffle and update its settings, as well as ganache
    * Dynamic nft backgrounds/cards for stats
    * Add the pet (Phaser) game as well -> can modify this contract for aliens/monsters as well
    * Build a marketplace on top of this webapp (cadence/client directory)
    * Integrate smart contract actions/methods with in-game actions/items
    * Introduce linked NFTs (link your "planet pet" nft with your "planet scene" nft from the game (see SCD-2))
    * Is it possible to split this into multiple contract components? Already have the linking option mentioned above ^^
    * Poke -> https://github.com/tytzM17/Lokian.eth/blob/main/contracts/project.eth.sol
    */
}