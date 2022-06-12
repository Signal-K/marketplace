import React, { useState, useEffect } from 'react';
import './pages.css';
import { Tag, Widget, Blockie, Tooltip, Icon, Form, Table } from "web3uikit";
import { Link } from "react-router-dom";
import { useLocation } from "react-router";
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";

const Comments = () => {
    const { state: commentDetails } = useLocation();
    const { Moralis, isInitialized } = useMoralis();
    const [ commentors, setCommentors ] = useState(0); // basically the same as `voters` in `home.js`
    const [ numberComments, setNumberComments ] = useState(0); // How many comments feature on this proposal?
    const [ comments, setComments ] = useState([]);
    const [ sub, setSub ] = useState();
    const contractProcessor = useWeb3ExecuteFunction();

    // Get the comments on the proposal by querying the Moralis db
    useEffect(() => {
        if (isInitialized) {
            async function getComments() {
                const Comments = Moralis.Object.extend("Comments");
                const query = new Moralis.Query(Votes);
                query.equalTo("proposal", proposalDetails.id);
                query.descending("createdAt");
                const results = await query.find();

                setComments(results);
            }
            getComments();
        }
    }, [isInitialized]);

    // Connects to form -> allow user to add comment on proposal by interacting with contract function
    async function createComment(newComment) {
        let options = {
            contractAddress: "0x418805AEd44E7105EEEC35289Fe4D60Acfa733aF",
            functionName: "createComment",
            abi: [
                {
                    inputs: [
                        {
                            internalType: "string",
                            name: "_comment",
                            type: "string", // add context for things like images and other rich WYSIWYG text data (Discourse?/bbpress?)
                        },
                        { // Who's allowed to comment - should probably extend from "_canVote" or maybe it can be edited via the form?
                            internalType: "address[]",
                            name: "_canComment",
                            type: "address[]",
                        },
                    ],
                    name: "createComment",
                    outputs: [],
                    stateMutability: "nonpayable",
                    type: "function",
                },
            ],
            params: {
                _comment: newComment,
                _canComment: commentors,
            },
        };

        await contractProcessor.fetch({
            params: options,
            onSuccess: () => {
                console.log("Comment successful")
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
            <div className='contentProposal'>
                <div className="proposal">
                    {/* Form */}
                </div>
            </div>
        </>
    )
}

export default Comments;