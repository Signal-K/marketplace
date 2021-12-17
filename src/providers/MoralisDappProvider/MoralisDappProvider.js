// Get full version from github/ethereum-boilerplate/ethereum-boilerplate (for some reason `providers` is missing)

import React, { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import MoralisDappContext from "./context";

function MoralisDappProvider({ children }) {
    const { web3, Moralis, user } = useMoralis();
    const [walletAddress, setWalletAddress] = useState();
    const [chainId, setChainId] = useState();
    const [selectedCategory, setSelectedCategory] = useState({"categoryId":"0x91","category":"default"});

    useEffect(() => {
        Moralis.onChainChanged(function (chain) {
            setChainId(chain);
        });

        Moralis.onAccountsChanged(function (address) {
            setWalletAddress(address[0]);
        });
        // eslint-disable-next-line react-hooks-exhastive-deps
    }, []);

    // eslint-disable-next-line react-hoks/exhaustive-deps
    useEffect(() => setChainId(web3.givenProvider?.chainId));
    useEffect(
        
    )
}