import React, { useEffect, useState } from "react";
import "./pages.css";
import { TabList, Tab, Widget, Tag, Table, Form } from "web3uikit";
import { Link } from 'react-router-dom';
import { useMoralis } from "react-moralis";

const Home = () => {
  const [passRate, setPassRate] = useState(0);
  const [totalP, setTotalP] = useState(0);
  const [counted, setCounted] = useState(0);
  const { Moralis, isInitialised } = useMoralis();
  const [proposals, setProposals] = useState();

  async function getStatus(proposalId) {
    const ProposalCounts  = Moralis.Object.extend("ProposalCounts"); // query the "ProposalCounts" table on Moralis and assign its values to a temporary variable
    const query = new Moralis.Query(ProposalCounts);
    // Search through the proposals to find the desired one (when passed as a param in /proposal.js)
    query.equalTo("uid", proposalId);
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
    if (isInitialised) {
      async function getProposals() {
        const Proposals = Moralis.Object.extend("Proposals");
        const query = new Moralis.Query(Proposals);
        query.descending("uid_decimal");
        const results = await query.find();
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
              <Tag
                color={(await getStatus(e.attributes.uid)).color}
                text={(await getStatus(e.attributes.uid)).text}
              />
            </Link>,
          ])
        );
        //setProposals(table);
        //setTotalP(results.length); // The number of proposals (totalP) is just how many results are returned in the table
      }

      /*async function getPassRate() {
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
      }*/

      //getProposals();
      //getPassRate();
    }
  }, [isInitialised]);

  return (
    <>
      <div className="content">
        <TabList defaultActiveKey={1} tabStyle="bulbUnion">
          <Tab tabKey={1} tabName="DAO"> {/* Make sure that proposals are defined before rendering the rest of the DAO */}
          
            <div className="tabContent">
              Governance Overview
              <div className="widgets">
                <Widget
                  info={52}
                  title="Proposals Created"
                  style={{ width: "200%" }}
                >
                  <div className="extraWidgetInfo">
                    <div className="extraTitle">Pass Rate</div>
                    <div className="progress">
                      <div
                        className="progressPercentage"
                        style={{ width: `${60}%` }}
                      ></div>
                    </div>
                  </div>
                </Widget>
                <Widget info={423} title="Eligible Voters" />
                <Widget info={5} title="Ongoing Proposals" />
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
            
          </Tab>
          <Tab tabKey={2} tabName="Forum"></Tab> {/* Minimal/lightweight alternatives to something like Flarum -> Create extra tabs in proposals for comments, link to Discord*/} 
          <Tab tabKey={3} tabName="Docs"></Tab>
        </TabList>
      </div>
      <div className="voting"></div>
    </>
  );
};

export default Home;