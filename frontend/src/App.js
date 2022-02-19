import React, { useEffect, useState } from 'react';
import twitterLogo from './assets/twitter-logo.svg';
import './App.css';
import LoadingIndicator from './Components/LoadingIndicator';

// Smart contract component imports
import SelectCharacter from './Components/SelectCharacter';
import { CONTRACT_ADDRESS, transformCharacterData } from './constants';
import GameContent from './utils/GameContent.json';
import Arena from './Components/Arena';
// Eth -> JS imports
import { ethers } from 'ethers';

// Constants
const TWITTER_HANDLE = 'TheMrScrooby';
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;

/*
const App = () => {
  const checkIfWalletIsConnected = () => {
    try {
      const { ethereum } = window; // Ensures app.js has access to window.ethereum

      if (!ethereum) {
        console.log('Make sure you have an ethereum wallet installed on your browser');
        return;
      } else {
        console.log('We have the ethereum object', ethereum);

        // Check if user is logged in (i.e. has authorised access to the user's wallet)
        const accounts = await ethereum.request({ method: 'eth_accounts' });
        // Grab the first authorized account (if it exists)
        if (accounts.length !== 0) {
          const account = accounts[0];
          console.log('Found an authorized account:', account);
          setCurrentAccount(account);
        } else {
          console.log('No authorized account found');
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Method to connect the wallet to the site
  const connectWalletAction = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert('Get MetaMask!');
        return;
      }

      // Request access to the user's wallet
      const accounts = await ethereum.request({
        method: 'eth_requestAccounts',
      });
      console.log('Connected', accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected(); // Runs when the page loads

    const checkNetwork = async () => {
      try {
        if (window.ethereum.networkVersion !== '4') {
          alert('Please switch to the Rinkeby test network');
        }
      } catch(error) {
        console.log(error);
      }
    }
  }, []);*/

const App = () => {
  // State
  const [currentAccount, setCurrentAccount] = useState(null);
  const [characterNFT, setCharacterNFT] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  // Actions
  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        console.log('Make sure you have MetaMask!');
        return;
      } else {
        console.log('We have the ethereum object', ethereum);

        const accounts = await ethereum.request({ method: 'eth_accounts' });

        if (accounts.length !== 0) {
          const account = accounts[0];
          console.log('Found an authorized account:', account);
          setCurrentAccount(account);
        } else {
          console.log('No authorized account found');
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Render -> if user is connected AND does not have a character NFT, show SelectCharacter component
  useEffect(() => {
    const fetchNFTMetadata = async () => {
      console.log('Checking for Character NFT on address:', currentAccount);

      const provider = new ethers.providers.Web3Provider(window.ethereum); // component that talks to the ethereum nodes
      const signer = provider.getSigner();
      const gameContract = new ethers.Contract( // Contract object -> creates connection to the contract
        CONTRACT_ADDRESS,
        GameContent.abi,
        signer
      );

      const txn = await gameContract.checkIfUserHasNFT();
      if (txn.name) {
        console.log('User has character NFT');
        setCharacterNFT(transformCharacterData(txn));
      } else {
        console.log('User does not have character NFT');
      }
    };

    // Only run this if the user is connected
    if (currentAccount) {
      console.log('Checking for Character NFT on address:', currentAccount);
      fetchNFTMetadata();
    }
  }, [currentAccount]); // Fire this useEffect only when currentAccount changes

  // Rendering dynamic user content to the frontend
  const renderContent = () => {
    console.log(currentAccount, " - ", characterNFT);
    if (currentAccount && isLoading) {
      return <LoadingIndicator />;
    }
    // If user isn't signed in
    if (!currentAccount) {
      return (
        <div className="connect-wallet-container">
          <img src="https://64.media.tumblr.com/0d3c17865b57a598707aeebb0833ca9b/tumblr_nzs0y8yiwp1r83d7lo1_540.gifv" />
          <button className="cta-button connect-wallet-button" onClick={connectWalletAction}>
            Connect wallet
          </button>
        </div>
      );
      // If user is connected and does not have a character NFT - show SelectCharacter component
    } else if (currentAccount && !characterNFT) {
      return <SelectCharacter setCharacterNFT={setCharacterNFT} />;
    } else if (currentAccount && characterNFT) { // If user is connected and has a character NFT - show Arena component
      return <Arena characterNFT={characterNFT} setCharacterNFT={setCharacterNFT} />;
    }
  };

  /*
   * Implement your connectWallet method here
   */
  const connectWalletAction = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert('Get MetaMask!');
        return;
      }

      /*
       * Fancy method to request access to account.
       */
      const accounts = await ethereum.request({
        method: 'eth_requestAccounts',
      });

      /*
       * Boom! This should print out public address once we authorize Metamask.
       */
      console.log('Connected', accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
    }
  };

  // Render -> if user is connected AND does not have a character NFT, show SelectCharacter component
  useEffect(() => {
    const fetchNFTMetadata = async () => {
      console.log('Checking for Character NFT on address:', currentAccount);

      const provider = new ethers.providers.Web3Provider(window.ethereum); // component that talks to the ethereum nodes
      const signer = provider.getSigner();
      const gameContract = new ethers.Contract( // Contract object -> creates connection to the contract
        CONTRACT_ADDRESS,
        GameContent.abi,
        signer
      );

      const txn = await gameContract.checkIfUserHasNFT();
      if (txn.name) {
        console.log('User has character NFT');
        setCharacterNFT(transformCharacterData(txn));
      } else {
        console.log('User does not have character NFT');
      }
    };

    // Only run this if the user is connected
    if (currentAccount) {
      console.log('Checking for Character NFT on address:', currentAccount);
      fetchNFTMetadata();
    }
  }, [currentAccount]); // Fire this useEffect only when currentAccount changes

  useEffect(() => {
    checkIfWalletIsConnected();

    const checkNetwork = async () => {
      try {
        if (window.ethereum.networkVersion !== '4') {
          alert('Please switch to the Rinkeby test network');
        }
      } catch (error) {
        console.log(error);
      }
    }
  }, []);

  return (
    <div className="App">
      <div className="container">
        <div className="header-container">
          <p className="header gradient-text">⚔️ Gizmonauts ⚔️</p>
          <p className="sub-text">A starter game of Gizmos & Gears</p>
          {renderContent()}
        </div>
        <div className="footer-container">
          <img alt="Twitter Logo" className="twitter-logo" src={twitterLogo} />
          <a
            className="footer-text"
            href={TWITTER_LINK}
            target="_blank"
            rel="noreferrer"
          >{`built with @${TWITTER_HANDLE}`}</a>
        </div>
      </div>
    </div>
  );
};

export default App;
