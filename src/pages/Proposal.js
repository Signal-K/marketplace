import React, { useState, useEffect } from "react";
import "./pages.css";
import { Tag, Widget, Blockie, Tooltip, Icon, Form, Table } from "web3uikit";
import { Link } from "react-router-dom";
import { useLocation } from "react-router";
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";

const Proposal = () => {
  const { state: proposalDetails } = useLocation(); // Determines the context that is shown on page /proposal -> all the content is dependant on what proposal is selected on /home.js
  const { Moralis, isInitialized } = useMoralis();
  const [ latestVote, setLatestVote ] = useState();
  const [ percUp, setPercUp ] = useState(0); // A percentage of how many votes on the proposal are "upvotes" i.e. in favour of the proposal
  const [ percDown, setPercDown ] = useState(0);
  const [ votes, setVotes ] = useState([]);
  const [ sub, setSub ] = useState();
  const contractProcessor = useWeb3ExecuteFunction();

  // Query Moralis DB
  useEffect(() => {
    if (isInitialized) {
      async function getVotes() { // Get the votes for each proposal and render them in state
        const Votes = Moralis.Object.extend("Votes");
        const query = new Moralis.Query(Votes);
        query.equalTo("proposal", proposalDetails.id); // Proposal from state is queried
        query.descending("createdAt"); // Most recent votes first
        const results = await query.find(); // All votes for specific proposal

        if (results.length > 0) {
          setLatestVote(results[0].attributes);
          setPercDown(
            (
              (Number(results[0].attributes.votesDown) / 
                (Number(results[0].attributes.votesDown) + 
                  Number(results[0].attributes.votesUp))) *
              100
            ).toFixed(0)
          );
          setPercUp(
            (
              (Number(results[0].attributes.votesUp) /
                (Number(results[0].attributes.votesDown) + 
                  Number(results[0].attributes.votesUp))) * 
              100
            ).toFixed(0)
          );
        }

        // Get array of all the addresses that have voted on the proposal in state
        const votesDirection = results.map((e) => [
          e.attributes.voter,
          <Icon // Create eth icon for different addresses and their votes
            fill={e.attributes.votedFor ? "#2cc40a" : "#d93d3d"}
            size={24}
            svg={e.attributes.votedFor ? "checkmark" : "arrowCircleDown"}
          />,
        ]);

        setVotes(votesDirection);
      }
      getVotes();
    }
  }, [isInitialized]);

  // Function to allow the user to vote on the proposal in state
  async function castVote(upDown) {
    let options = {
      contractAddress: "0x418805AEd44E7105EEEC35289Fe4D60Acfa733aF",
      functionName: "voteOnProposal",
      abi: [
        {
          inputs: [
            {
              internalType: "uint256",
              name: "_id",
              type: "uint256",
            },
            {
              internalType: "bool",
              name: "_vote",
              type: "bool",
            },
          ],
          name: "voteOnProposal",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
      ],
      params: {
        _id: proposalDetails.id,
        _vote: upDown, // Whatever is cast in this function is set to the vote from the end user (defined here)
      },
    };

    await contractProcessor.fetch({
      params: options,
      onSuccess: () => {
        console.log("Vote cast successfully!");
        setSub(false);
      },
      onError: (error) => {
        alert(error.data.message);
        setSub(false);
      },
    });
  }

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
          <div>{proposalDetails.description}</div>
          <div className="proposalOverview">
            <Tag color={proposalDetails.color} text={proposalDetails.text} />
            <div className="proposer">
              <span>Proposed by </span>
              <Tooltip content={proposalDetails.proposer}>
                <Blockie seed={proposalDetails.proposer} />
              </Tooltip>
            </div>
          </div>
        </div>
        {latestVote && ( // Only render the votes if there is a latest vote in state.
          <div className="widgets">
            <Widget info={latestVote.votesUp} title="Votes for">
              <div className="extraWidgetInfo">
                <div className="extraTitle">{percUp}%</div>
                <div className="progress">
                  <div
                    className="progressPercentage"
                    style={{ width: `${percUp}%` }}
                  ></div>
                </div>
              </div>
            </Widget>
            <Widget info={latestVote.votesDown} title="Votes Against">
              <div className="extraWidgetInfo">
                <div className="extraTitle">{percDown}%</div>
                <div className="progress">
                  <div
                    className="progressPercentage"
                    style={{ width: `${percDown}%` }}
                  ></div>
                </div>
              </div>
            </Widget>
          </div>
        )}
        <div className="votesDiv">
          <Table
            style={{ width: "60%" }}
            columnsConfig="90% 10%"
            data={votes}
            header={[<span>Address</span>, <span>Vote</span>]}
            pageSize={5}
          />
          <Form
            isDisabled={proposalDetails.text !== "Ongoing"} // If the proposal is no longer active, the form for users to vote should be hidden from state
            style={{
              width: "35%",
              height: "250px",
              border: "1px solid rgba(6, 158, 252, 0.2)",
            }}
            buttonConfig={{
              isLoading: sub,
              loadingText: "Casting Vote",
              text: "Vote",
              theme: "secondary",
            }}
            data={[
              {
                inputWidth: "100%",
                name: "Cast Vote",
                options: ["For", "Against"],
                type: "radios",
                validation: {
                  required: true,
                },
              },
            ]}
            onSubmit={(e) => {
              if (e.data[0].inputResult[0] === "For") {
                castVote(true);
              } else {
                castVote(false);
              }
              setSub(true);
            }}
            title="Cast Vote"
          />
        </div>
     </div>
     <div className="voting"></div>
    </>
  );
};

export default Proposal;
