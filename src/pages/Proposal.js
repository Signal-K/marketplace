import React, { useState, useEffect } from "react";
import "./pages.css";
import { Tag, Widget, Blockie, Tooltip, Icon, Form, Table } from "web3uikit";
import { Link } from "react-router-dom";

const Proposal = () => {

  return (
    <>
      <div className="contentProposal">
        <div className="proposal"> {/* Provides the frontend with a method to return to the home page */}
          <Link to="/">
            <div className="backHome">
              <Icon fill="#ffffff" size={20} svg="chevronLeft" />
              Overview
            </div>
          </Link>
          <div>Should we accept the offer to buyout the DAO?</div>
        </div>
     </div>
    </>
  );
};

export default Proposal;
