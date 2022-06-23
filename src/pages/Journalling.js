import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Proposal from "./Proposal";
import { ConnectButton } from "web3uikit";
import NewStory from "./NewStory";
import MyJournals from "./MyJournals";
import Journal from "../components/Journal"
import Rightbar from "../components/Rightbar"
import Sidebar from "../components/Sidebar"
import HomeAuth from "./HomeAuth";
import logo from "../images/medium.png"; // Add this from github moralis
import { useMoralis } from "react-moralis";

const Journalling = () => {
    const { isAuthenticated } = useMoralis(); // Again -> for unification, how does this compare with auth methods in Unity, Phaser, & the DAO (all of which communicate with Moralis?) #TODO

  return (
    <>
        {isAuthenticated ? (
            <div className="App">
                <div className="sideBar">
                    <Sidebar />
                </div>
                <div className="mainWindow">
                    <Routes>
                        <Route path="/" element={<HomeAuth />} />
                        <Route path="/newStory" element={<NewStory />} />
                        <Route path="/myJournals" element={<MyJournals />} />
                        <Route path="/journal/:url" element={<Journal />} />
                    </Routes>
                </div>
                <div className="rightBar">
                    <Rightbar />
                </div>
            </div>
        ) : (
            <div className="unAuth">
                <img src={logo} alt="logo" height="200px" />
                <ConnectButton />
            </div>
        )}
    </>
  );
};

export default Journalling;

// Add a <Link to> this page in Home.js