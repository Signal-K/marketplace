import { useMoralisDapp } from "providers/MoralisDappProvider/MoralisDappProvider";
import { useMoralisQuery, useWeb3ExecuteFunction } from "react-moralis"
import { createElement, useEffect, useState } from "react";
import { Comment, ToolTip, Avatar, message, Divider } from 'antd'
import Text from "antd/lib/typography/Text";
import Blockie from "components/Blockie";
import glStyles from "components/gstyles";
import { LikeFilled } from "@ant-design/icons";
import Votes from "./Votes"

const Post = ({post}) => {
    const { contentId, postId, postOwner } = post;
    const [postContent, setPostContent] = useState({ title: "default", content: "default" }); // Default values for the postContent object
    const { data } = useMoralisQuery("Contents", (query) => query.equalTo("contentId", contentId));
    const [voteStatus, setVoteStatus] = useState();
    const { data: votes } = useMoralisQuery("Votes", (query) => query.equalTo("postId", postId), [], {
        live: true,
    });

    const { walletAddress, contractABI, contractAddress} = useMoralisDapp(); // We need to get the wallet address from the MoralisDappProvider to see who is connected to the dapp
    const contractABIJson = JSON.parse(contractABI);
    const contractProcessor = useWeb3ExecuteFunction();

    useEffect(() => {
        function extractUri(data) {
            const fetchedContent = JSON.parse(JSON.stringify(data, ["contentUri"]));
            const contentUri = fetchedContent[0]["contentUri"];
            return contentUri;
        }
        async function fetchIPFSDoc(ipfsHash) {
            const url = ipfsHash;
            const response = await fetch(url);
            return await response.json();
        }
        async function processContent() {
            const content = await fetchIPFSDoc(extractUri(data));
            setPostContent(content);
        }
        if (data.length > 0) {
            processContent();
        }
    }, [data]);

    useEffect(() => {
        if (!votes?.length) return null;

        async function getPostVoteStatus() {
            const fetchVotes = JSON.parse(JSON.stringify(votes));
            //console.log("fetchVotefetchedVote", fetchedVotes);
            fetchedVotes.forEach(({ voter, up }) => {
                if (voter === walletAddress) setVoteStatus(up ? "liked" : "disliked");
            });
            return;
        }

        getPostVoteStatus();
    }, [votes, walletAddress]);

    async function vote(direction){
        if (walletAddress.toLowerCase() === postOwner.toLowerCase()) return message.error("You cannot vote on your own posts"); // Detects if user is trying to vote on their own posts, prevents them from doing so with an error message
        if (voteStatus) return message.error("Already voted"); // Detects the voteStatus of the current user on the current post -> prevents them from voting multiple times on the same post

        const options = {
            contractAddress: contractAddress,
            functionName: direction,
            abi: contractABIJson,
            params: {
                _postId: post["postId"],
                [direction === "voteDown" ? "_reputationTaken" : "_reputationAdded"]: 1, // Net change in reputation is 1 -> if voteDown, then 1 rTaken, if not, 1 rAdded
            },
        };

        await contractProcessor.fetch({
            params: options,
            onSuccess: () => console.log("success"),
            onError: (error) => console.error(error),
        });
    }

    //console.log(post)

    const actions = [ // Actions that you can take on posts
        <Tooltip key="comment-basic-like" title="Vote Up">
            <span
                style={{ fontSize: "15px", display: "flex", alignItems: "center", marginRight: "16px" }}
                onClick={() => vote("voteUp")}
            >
                {createElement(voteStatus === "liked" ? LikeFilled : LikeOutlined)} Vote Up
            </span>
        </Tooltip>,
        <span style={{ fontSize: "15px" }}><Votes postId={postId}/></span>,
        <Tooltip key="comment-basic-dislike" title="Dislike">
            <span
                style={{ fontSize: "15px", display: "flex", alignItems: "center", marginLeft: "8px" }}
                onClick={() => vote("voteDown")}
                >
                {createElement(voteStatus === "disliked" ? DislikeFilled : DislikeOutlined)} Vote Down
                </span>
        </Tooltip>,
    ];

    const result = ( // Post result (not a comment)
        <Comment
        style={{...glStyles.card, padding: "0px 15px", marginBottom: "10px" }}
        actions={actions}
        author={<Text strong>{post["postOwner"]}</Text>}
        avatar={<Avatar src={<Blockie address={post["postOwner"]} scale="4" />}></Avatar>}
        content={
            <>
                <Text strong style={{ fontSize: "20px", color: "#333" }}>
                    {postContent["title"]}
                </Text>
                <p style={{ fontSize: "15px", color: "#111" }}>{postContent["content"]}</p>
                <Divider style={{ margin: "15px 0" }} />
            </>
        }
        />
    )

    return postContent["title"] === "default" ? loading : result; // If the postContent[title] is still default, show the loading animation, otherwise show result
}

export default Post