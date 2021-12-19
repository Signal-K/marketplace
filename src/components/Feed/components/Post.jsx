import { useMoralisQuery, useWeb3ExecuteFunction } from "react-moralis"
import { useEffect, useState } from "react";

const Post = ({post}) => {
    const { contentId, postId, postOwner } = post;
    const [postContent, setPostContent] = useState({ title: "default", content: "default" }); // Default values for the postContent object
    const { data } = useMoralisQuery("Contents", (query) => query.equalTo("contentId", contentId));

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

    console.log(post)
    return (
        <pre>
            <h4>{postContent["title"]}</h4>
            <p>{postContent["content"]}</p>
        </pre>
    )
}

export default Post