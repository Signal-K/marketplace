Moralis.Cloud.define("getSVG", async (request) => {

    let web3 = Moralis.web3ByChain("0x89"); // matic
    const CONTRACT_ADDRESS = "0x86935F11C86623deC8a25696E1C19a8659CbF95d";

    const contract = new web3.eth.Contract(CONTRACT_ABI,CONTRACT_ADDRESS);

    const hauntId = 2;
    const collateralAddress = "";

    const svgString = await contract.methods.previewAavegotchi(hauntId,
        collateralAddress,
        request.params.numericTraits,
        request.params.equippedWearables).call();

    return svgString;
});