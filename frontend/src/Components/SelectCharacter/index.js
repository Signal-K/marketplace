import React, { useEffect, useState } from 'react';
import './SelectCharacter.css'
import { ethers } from 'ethers';
import { CONTRACT_ADDRESS, transformCharacterData } from '../../constants';
import GameContent from '../../utils/GameContent.json';

const SelectCharacter = ({ setCharacterNFT }) => {
    const [characters, setCharacters] = useState([]);
    const [gameContract, setGameContract] = useState(null);

    // Display mintable characters
    useEffect(() => {
        const { ethereum } = window;

        if (ethereum) {
            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();
            const gameContract = new ethers.Contract(
                CONTRACT_ADDRESS,
                GameContent.abi,
                signer
            );

            // Set the gameContract in state
            setGameContract(gameContract);
        } else {
            console.log("Ethereum object not found");
        }
    }, []);

    // Fetch all characters
    useEffect(() => {
        const getCharacters = async () => {
            try {
                console.log('Getting contract characters to mint');

                // Call contract function to get all characters
                const charactersTxn = await gameContract.getAllDefaultCharacters();
                console.log('charactersTxn:', charactersTxn);

                // Transform the data of all the characters
                const characters = charactersTxn.map((characterData) =>
                    transformCharacterData(characterData)
                );

                // Set all mint-able characters in state
                setCharacters(characters);
            } catch (error) {
                console.error("Something went wrong fetching characters:", error);
            }
        };

        // Get the characters
        if (gameContract) {
            getCharacters();
        }
    }, [gameContract]);

    // Render Methods
    const renderCharacters = () => {
        characters.map((characters, index) => (
            <div className="characters-item" key={characters.name}>
                <div className="name-container">
                    <p>{characters.name}</p>
                </div>
                <img src={characters.imageURI} alt={characters.name} />
                <button
                    type="button"
                    className='character-mint-button'
                    onClick={mintCharacterNFTAction(index)}
                >{`Mint ${character.name}`}</button>
            </div>
        ));
    }

    return (
        <div className="select-character-container">
            <h2>Mint Your Hero. Choose wisely.</h2>
            {/* Only show this when there are characters in state */}
            {characters.length > 0 && (
                <div className="character-grid">{renderCharacters()}</div>
            )}
        </div>
    );
};

export default SelectCharacter;