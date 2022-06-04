//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Star Sailors (Astroanuts) DAO Contract for skinetics.tech

interface IdaoContract {
    function balanceOf(address, uint256) external view returns (uint256);
}

contract SailorsDAO {
    address public owner;
    uint256 nextProposal;
    uint256[] public validTokens; // What tokens are allowed to be used for voting? Cross-chain/network?
    IdaoContract daoContract;

    constructor() {
        owner = msg.sender;
        nextProposal = 1;
        daoContract = IdaoContract(0x7AA06a386017F5026E16e06ecc26A88DEA797841);
        validTokens = [156]; // token id of the nft in the contract/collection
    }

    struct proposal {
        uint256 id;
        bool exists;
        string description;
        uint deadline;
        uint256 votesUp;
        uint256 votesDown;
        address[] canVote;
        uint256 maxVotes;
        mapping(address => bool) voteStatus;
        bool countConducted;
        bool passed; 
    }

    mapping (uint256 => proposal) public Proposals;

    event proposalCreated(
        uint256 id,
        string description,
        uint256 maxVotes,
        address proposer
    );

    event newVote(
        uint256 votesUp,
        uint256 votesDown,
        address voter,
        uint256 proposal,
        bool votedFor
    );

    event proposalCount(
        uint256 id,
        bool passed
    );

    // Check if the user is eligible to vote on a proposal
    function checkProposalEligibility(address _proposalist) private view returns (
        bool
    ){
        for(uint i = 0; i < validTokens.length; i++) {
            if (daoContract.balanceOf(_proposalist, validTokens[i]) >= 1){
                return true;
            }
        }
        return false;
    }

    function checkVoteEligibility(uint256 _id, address _voter) private view returns (
        bool
    ) {
        for (uint256 i = 0; i < Proposals[_id].canVote.length; i++) {
            if (Proposals[_id].canVote[i] == _voter) {
                return true;
            }
        }
        return false;
    }
}