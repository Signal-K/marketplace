import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Proposal from "./pages/Proposal";
import moralisLogo from "./images/Moralis.png";
import { ConnectButton } from "web3uikit";
import NewStory from "./pages/NewStory";
import MyJournals from "./pages/MyJournals";
import Journal from "./components/Journal"
import Rightbar from "./components/Rightbar"
import Sidebar from "./components/Sidebar"
import HomeAuth from "./pages/HomeAuth";

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
  );
};

export default App;
