// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
// OpenZeppelin helper functions
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

import "hardhat/console.sol";

import "./libraries/Base64.sol";

contract GameContent is ERC721 {
    // Character's attributes
    struct CharacterAttributes {
        uint characterIndex;
        string name;
        string imageURI;
        uint hp;
        uint maxHp;
        uint attackDamage;
    }
    
    // tokenId Counter function
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    // Default data (lid array) for the character attributes
    CharacterAttributes[] defaultCharacters;

    // Mapping the nft's tokenId => character's attributes
    mapping(uint256 => CharacterAttributes) public nftHolderAttributes;
    // Mapping from an address => tokenId
    mapping(address => uint256) public nftHolders;

    // Values passed in from scripts/run.js
    constructor(
        string[] memory characterNames,
        string[] memory characterImageURIs,
        uint[] memory characterHP,
        uint[] memory characterAttackDmg
    ) 
        ERC721("Gears", "GEAR") 
    {
        // Initialize default data for each character
        for(uint i = 0; i < characterNames.length; i += 1) {
            defaultCharacters.push(CharacterAttributes({
                characterIndex: i,
                name: characterNames[i],
                imageURI: characterImageURIs[i],
                hp: characterHP[i],
                maxHp: characterHP[i],
                attackDamage: characterAttackDmg[i]
            }));

            CharacterAttributes memory c = defaultCharacters[i];
            console.log("Done initializing %s w/ HP %s", c.name, c.hp, c.imageURI);
        }

        // Initialize the tokenId counter, starting at index 1
        _tokenIds.increment();
    }

    // Mint NFT based on characterId input
    function mintCharacterNFT(uint _characterIndex) external {
        uint256 newItemId = _tokenIds.current();

        // Assigns the tokenId to the caller's wallet (address)
        _safeMint(msg.sender, newItemId);

        // Map the tokenId => character attributes
        nftHolderAttributes[newItemId] = CharacterAttributes({
            characterIndex: _characterIndex,
            name: defaultCharacters[_characterIndex].name,
            imageURI: defaultCharacters[_characterIndex].imageURI,
            hp: defaultCharacters[_characterIndex].hp,
            maxHp: defaultCharacters[_characterIndex].maxHp,
            attackDamage: defaultCharacters[_characterIndex].attackDamage
        });

        console.log("Minted NFT w/ tokenId %s and characterIndex %s", newItemId, _characterIndex);

        // See who owns different NFTs
        nftHolders[msg.sender] = newItemId;

        // Increment tokenId for the next call
        _tokenIds.increment();
    }

function tokenURI(uint256 _tokenId) public view override returns (string memory) {
    CharacterAttributes memory charAttributes = nftHolderAttributes[_tokenId]; // Retrieves the specific NFT's ddata by querying using _tokenId (which was passed in the function)

    string memory strHp = Strings.toString(charAttributes.hp);
    string memory strMaxHp = Strings.toString(charAttributes.maxHp);
    string memory strAttackDamage = Strings.toString(charAttributes.attackDamage);

    string memory json = Base64.encode(
    abi.encodePacked(
        '{"name": "',
        charAttributes.name,
        ' -- NFT #: ',
        Strings.toString(_tokenId),
        '", "description": "This is an NFT that lets people play in the game Metaverse Slayer!", "image": "',
        charAttributes.imageURI,
        '", "attributes": [ { "trait_type": "Health Points", "value": ',strHp,', "max_value":',strMaxHp,'}, { "trait_type": "Attack Damage", "value": ',
        strAttackDamage,'} ]}'
    )
    );

    string memory output = string(
        abi.encodePacked("data:application/json;base64,", json)
    );

    return output;
    }
}