import React, { useEffect, useState } from "react";
import "./pages.css";
import './content.css'
import { TabList, Tab, Widget, Tag, Table, Form } from "web3uikit";
import { Link } from "react-router-dom";
import { useMoralis, useMoralisWeb3Api, useWeb3ExecuteFunction } from "react-moralis";
// import { useAddress, useMetamask, useEditionDrop } from '@thirdweb-dev/react';

const Home = () => {
  //const address = useAddress();
  //const connectWithMetamask = useMetamask();

  const [passRate, setPassRate] = useState(0);
  const [totalP, setTotalP] = useState(0);
  const [counted, setCounted] = useState(0);
  const {Moralis, isInitialized} = useMoralis();
  const [proposals, setProposals] = useState();

  async function getStatus(proposalId) {
    const ProposalCounts = Moralis.Object.extend("ProposalCounts"); // query the "ProposalCounts" table on Moralis and assign its values to a temporary variable
    const query = new Moralis.Query(ProposalCounts);
    query.equalTo("uid", proposalId); // Search through the proposals to find the desired one (when passed as a param in /proposal.js)
    const result = await query.first(); // since the id is a unique identifier, ONLY select the first match found
    if (result !== undefined) {
      if (result.attributes.passed) { // For a finished/expired proposal: configure the UI/visuals based on its votes/pass status
        return { color: "green", text: "Passed" };
      } else {
        return { color: "red", text: "Rejected" };
      }
    } else { // If undefined, then there is no passed attribute for the item, so it is an ongoing proposal and should be displayed with visuals identifying this on frontend
      return { color: "blue", text: "Ongoing" };
    }
  }

  // Update this whenever Moralis is initialised/when ifInitailized is updated/changed. This allows us to retrieve new proposals that have been added to the DB
  useEffect(() => {
    if (isInitialized) {
      async function getProposals() { // Find proposals from the Moralis db
        const Proposals = Moralis.Object.extend("Proposals");
        const query = new Moralis.Query(Proposals);
        query.descending("uid_decimal"); // Order the proposals in the variable with the latest/most recent appearing first
        const results = await query.find();

        // Frontend table displaying proposals
        const table = await Promise.all(
          results.map(async (e) => [
            e.attributes.uid,
            e.attributes.description,
            <Link to="/proposal" state={{
              description: e.attributes.description,
              color: (await getStatus(e.attributes.uid)).color,
              text: (await getStatus(e.attributes.uid)).text,
              id: e.attributes.uid,
              proposer: e.attributes.proposer
            }}>
              <Tag // Tag showing the status of a proposal, wrapped around the link to the proposal page (state)
                color={(await getStatus(e.attributes.uid)).color}
                text={(await getStatus(e.attributes.uid)).text}
              />
            </Link>,
          ])
        );
        setProposals(table); // Updated each time Moralis db is fetched
        setTotalP(results.length); // Number of total proposals (not just ongoing ones)
      }

      // Function to determine the pass rate of proposals for widget on home screen
      async function getPassRate() {
        const ProposalCounts = Moralis.Object.extend("ProposalCounts");
        const query = new Moralis.Query(ProposalCounts);
        const results = await query.find();
        let votesUp = 0;
        results.forEach((e) => {
          if (e.attributes.passed) {
            votesUp++;
          }
        });

        setCounted(results.length);
        setPassRate((votesUp / results.length) * 100);
      }
      getProposals();
      getPassRate();
    }
  }, [isInitialized]);


  return (
    <>
      <div className="content">
        <TabList defaultActiveKey={1} tabStyle="bulbUnion">
          <Tab tabKey={1} tabName="DAO">
            {proposals && ( /* Only render the Proposals table if the proposals state variable is available and working */
            <div className="tabContent">
              Governance Overview
              <div className="widgets">
                <Widget
                  info={totalP}
                  title="Proposals Created"
                  style={{ width: "200%" }}
                >
                  <div className="extraWidgetInfo">
                    <div className="extraTitle">Pass Rate</div>
                    <div className="progress">
                      <div
                        className="progressPercentage"
                        style={{ width: `${passRate}%` }}
                      ></div>
                    </div>
                  </div>
                </Widget>
                <Widget info={423} title="Eligible Voters" />
                <Widget info={totalP-counted} title="Ongoing Proposals" />
              </div>
              Recent Proposals
              <div style={{ marginTop: "30px" }}>
                <Table
                  columnsConfig="10% 70% 20%"
                  data={proposals}
                  header={[
                    <span>ID</span>,
                    <span>Description</span>,
                    <span>Status</span>,
                  ]}
                  pageSize={5}
                />
              </div>
              <Form
                buttonConfig={{
                  isLoading: false,
                  loadingText: "Submitting Proposal",
                  text: "Submit",
                  theme: 'secondary',
                }}
                data={[
                  {
                    inputWidth: "100%",
                    name: "New Proposal",
                    type: "textarea",
                    validation: {
                      required: true,
                    },
                    value: "",
                  },
                ]}
                onSubmit={(e) => {
                  alert("Proposal Submitted")
                }}
                title="Create a new Proposal"
              />
            </div>
            )}
          </Tab>
          <Tab tabKey={2} tabName="Forum"></Tab> {/* Minimal/lightweight alternatives to something like Flarum */} 
          <Tab tabKey={3} tabName="Docs"> {/* IonPhaser? */}
              <div className="tabContent">
                Documentation
                <div className="landing">
                  <h1>DAO</h1> {/* Let's add an internal DAO section using thirdweb for dev team members. Right now I'm starting to add components from the frontend of signal-k/theclub (on github) 
                    Try and add the Contract view table from the old DAO: https://github.com/Gizmotronn/mint/blob/main/src/editionDrop.js
                    https://mumbai.polygonscan.com/address/0x418805aed44e7105eeec35289fe4d60acfa733af#writeContract
                  */}
                  <br></br><br></br>
                  <div className="content">
                  <TabList defaultActiveKey={1} tabStyle="bulbUnion">
                    <Tab tabKey={1} tabName="Super">
                      <div className="tabContent">
                        <iframe src="https://sk.super.site" height="600px" width="100%"/>;
                      </div>
                    </Tab>
                    <Tab tabKey={2} tabName="Forum">
                      <div className="tabContent">
                      Contract status
                <div style={{ marginTop: "30px" }}>
                  <Table
                    columnsConfig="10% 70% 20%"
                    data={[
                      [
                        1,
                        <div>Should we start a Moralis hamburger chain?</div>,
                        <Tag color="green" text="Passed" />,
                      ],
                      [
                        2,
                        "Should we accept Elon Musks $44billion offer for our DAO?",
                        <Link to="/proposal" state={"hello"}>
                          <Tag color="red" text="Rejected" />
                        </Link>,
                      ],
                      [
                        3,
                        "Do you want a Web3 Slack tutorial?",
                        <Tag color="blue" text="Ongoing" />,
                      ],
                      [
                        4,
                        "Are you interested in Xbox/Console web3 tutorials?",
                        <Tag color="blue" text="Ongoing" />,
                      ],
                      [
                        5,
                        "Would you attend a Moralis Builder get together in Miami?",
                        <Tag color="blue" text="Ongoing" />,
                      ],
                  ]}
                    header={[
                      <span>ID</span>,
                      <span>Description</span>,
                      <span>Status</span>,
                    ]}
                    pageSize={5}
                  />
                </div>
                      </div>
                    </Tab>
                  </TabList>
                  </div>
                </div>
              </div>
          </Tab>
        </TabList>
      </div>
      <div className="voting"></div>
    </>
  );
};

export default Home;