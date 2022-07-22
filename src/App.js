import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Proposal from "./pages/Proposal";
import moralisLogo from "./images/Moralis.png";
import { ConnectButton } from "web3uikit";

const App = () => {
  return (
    <>
      <div className="header">
        <img width="160px" src={moralisLogo} alt="logo" />
        <ConnectButton />
      </div>
      <Routes> {/* Route this to signal-k/magic */}
        <Route path="/" element={<Home />} />
        <Route path="/proposal" element={<Proposal />} /> 
      </Routes>
    </>
  );// Add game window (Unity webgl)
};

export default App;