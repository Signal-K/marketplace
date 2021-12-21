import { useMoralisDapp } from 'providers/MoralisDappProvider/MoralisDappProvider'
import { useMoralisQuery, useMoralis, } from "react-moralis"
import { useState } from "react";
import { useEffect } from "react";
import React from 'react'

const Reputation = () => {
    const {Moralis} = useMoralis();
    const { walletAddress, contractABI, contractAddress, selectedCategory} = useMoralisDapp();
    const [reputationValue, setReputation] = useState();
    const contractABIJSon = JSON.parse(contractABI)

    const { data: votes } = useMoralisQuery("Votes", (query) => query.equalTo("postOwner", walletAddress), [], { // Lets us know when someone interacts with a post (voting/reputation)
        live: true,
    });

    const categoryId = selectedCategory["categoryId"]

    const options = {
        contractAddress: contractAddress,
        functionName: "getReputation",
        abi: contractABIJSon,
        params: {
            _address: walletAddress,
            _categoryID:
                categoryID
        }
    };

    useEffect(() => {
        if (!votes?.length) return 0;

        async function getReputation() {
            await Moralis.enableWeb3();
            const result = await Moralis.executeFunction(options);
            setReputation(results);
        }

        getReputation();
    }, [votes, walletAddress, categoryId]);

    return (
        <>{reputationValue}</>
    )
}

export default Reputation