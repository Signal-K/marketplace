import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { CONTRACT_ADDRESS, transformCharacterData } from '../../constants';
import gameContent from '../../utils/GameContent.json';
import './Arena.css'
import SelectCharacter from '../SelectCharacter';

// Parse in characterNFT metadata
const Arena = ({ characterNFT }) => {
    // State
    const [gameContract, setGameContract] = useState(null);
    // Boss Metadata state
    const [boss, setBoss] = useState(null);
    const [attackState, setAttackState] = useState('');
    const runAttackAction = async () => {
        try {
            if (gameContract) {
                setAttackState('attacking...'); // Waiting for the attack transaction to finish
                console.log('Attacking boss....')
                const attackTxn = await gameContract.attackBoss();
                await attackTxn.wait();
                console.log('attackTxn:', attackTxn);
                setAttackState('hit'); // When the character lands a hit on the boss
            }
        } catch (error) {
            console.log('Error attacking boss:', error);
            setAttackState(''); // Default state - nothing happens
        }
    };

    // UseEffect
    useEffect(() => {
        const { ethereum } = window;

        if (ethereum) {
            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();
            const gameContract = new ethers.Contract(
                CONTRACT_ADDRESS,
                gameContent.abi,
                signer
            );

            setGameContract(gameContract);
        } else {
            console.log('Ethereum object not found ');
        }

        // Async function that gets the boss from the contract and sets it in state
        const fetchBoss = async () => {
            const bossTxn = await gameContract.getBoss();
            console.log('Boss:', bossTxn);
            setBoss(transformCharacterData(bossTxn));
        };

        // Attack setup logic when event is fired
        const onAttackComplete = (newBossHp, newPlayerHp) => {
            const bossHp = newBossHp.toNumber();
            const playerHp = newPlayerHp.toNumber();

            console.log(`AttackComplete: Boss Hp: ${bossHp}, Player Hp: ${playerHp}`);
            // Update player and boss hp
            setBoss((prevState) => {
                return { ...prevState, hp: bossHp };
            });

            SelectCharacter((prevState) => { // I think this is supposed to be `setCharacterNFT`
                return { ...prevState, hp: playerHp };
            });
        }

        if (gameContract) {
            fetchBoss();
            gameContract.on('AttackComplete', onAttackComplete);
        }

        return () => {
            if (gameContract) {
                gameContract.off('AttackComplete', onAttackComplete);
            }
        }
    }, [gameContract]); // Is either `gameContent` or `gameContract`

    return (
        <div className="arena-container">
            {boss && (
                <div className="boss-container">
                    <div className={`boss-content ${attackState}`}>
                        <h2> {boss.name} </h2>
                        <div className="image-content">
                            <img src={boss.imageURI} alt={`boss.name`} />
                            <div className="health-bar">
                                <progress value={boss.hp} max={boss.maxHp} />
                                <p>{`${boss.hp} / ${boss.maxHp} HP`}</p>
                            </div>
                        </div>
                    </div>
                    <div className="attack-container">
                        <button className="cta-button" onClick={runAttackAction}>
                            {`Attack ${boss.name}`}
                        </button>
                    </div>
                </div>
            )}

            {characterNFT && (
                <div className="players-container">
                    <div className="player-container">
                        <h2>Your character</h2>
                        <div className="player">
                            <div className="image-content">
                                <h2>{characterNFT.name}</h2>
                                <img
                                    src={characterNFT.imageURI}
                                    alt={`Character ${characterNFT.name}`}
                                />
                                <div className="health-bar">
                                    <progress value={characterNFT.hp} max={characterNFT.maxHp} />
                                    <p>{`${characterNFT.hp} / ${characterNFT.maxHp} HP`}</p>
                                </div>
                            </div>
                            <div className="stats">
                                <h4>{`⚔️ Attack Damage: ${characterNFT.attackDamage}`}</h4>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Arena;