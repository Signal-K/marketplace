// SPDX-License-Identifier: MIT
pragma solidity 0.8.10;

contract Decentradit {
    event PostCreated (bytes32 indexed postId, address indexed postOwner, bytes32 indexed parentId, bytes32 contentId, bytes32 categoryId);
    event ContentAdded (bytes32 indexed contentId, string contentUri);
    event CategoryCreated (bytes32 indexed categoryId, string category);
    event Voted (bytes32 indexed postId, address indexed postOwner, address indexed voter, uint80 reputationPostOwner, uint80 reputationVoter, int40 postVotes, bool up, uint8 reputationAmount);

    struct post {
        address postOwner;
        bytes32 parentPost;
        bytes32 contentId;
        int40 votes;
        bytes32 categoryId;
    }

    mapping  (address => mapping (bytes32 => uint80)) reputationRegistry; // We need an address pointing to the user, and their reputation is stored individually based on each category
    mapping (bytes32 => string) categoryRegistry;
    mapping (bytes32 => string) contentRegistry; // stores the content of each post, stored as urls in ipfs (moralis), stored as "strings"
    mapping (bytes32 => post) postRegistry; // stores the posts, as "posts" content type
    mapping (address => mapping (bytes32 => bool)) voteRegistry; // Voting storage -> bool:has the user voted in this post?


    // Creating posts
    function createPost(bytes32 _parentId, string calldata _contentUri, bytes32 _categoryId) external {
        address _owner = msg.sender; // Owner/creator of the post
        bytes32 _contentId = keccak256(abi.encode(_contentUri));
        bytes32 _postId = keccak256(abi.encodePacked(_owner,_parentId, _contentId)); // _postId is based on all the included variables
        contentRegistry[_contentId] = _contentUri; // Will be fetched and displayed on the frontend when we need it (Universal Resource Identifier)
        postRegistry[_postId].postOwner = _owner;
        postRegistry[_postId].parentPost = _parentId;
        postRegistry[_postId].contentId = _contentId;
        postRegistry[_postId].categoryId = _categoryId;
        emit ContentAdded(_contentId, _contentUri);
        emit PostCreated (_postId, _owner,_parentId,_contentId,_categoryId);
    }

    // Voting on posts
    function voteUp(bytes32 _postId, uint8 _reputationAdded) external {
        address _voter = msg.sender; 
        bytes32 _category = postRegistry[_postId].categoryId;
        address _contributor = postRegistry[_postId].postOwner;
        require (postRegistry[_postId].postOwner != _voter, "You cannot vote your own posts"); // Prevent users from upvoting their own posts
        require (voteRegistry[_voter][_postId] == false, "Sender already voted in this post"); // Prevents users from upvoting posts multiple times
        require (validateReputationChange(_voter,_category,_reputationAdded)==true, "This address cannot add this amount of reputation points");
        postRegistry[_postId].votes += 1;
        reputationRegistry[_contributor][_category] += _reputationAdded;
        voteRegistry[_voter][_postId] = true;
        emit Voted(_postId, _contributor, _voter, reputationRegistry[_contributor][_category], reputationRegistry[_voter][_category], postRegistry[_postId].votes, true, _reputationAdded);
    }

    // Downvote posts
    function voteDown(bytes32 _postId, uint8 _reputationTaken) external {
        address _voter = msg.sender;
        bytes32 _category = postRegistry[_postId].categoryId;
        address _contributor = postRegistry[_postId].postOwner; 
        require(voteRegistry[_voter][_postId] == false, "Sender has already voted in this post");
        require (validateReputationChange(_voter,_category,_reputationTaken)==true, "This address cannot take this amount of reputation points"); // Each post can't go below 0 reputation
        postRegistry[_postId].votes >= 1 ? postRegistry[_postId].votes -= 1: postRegistry[_postId].votes = 0;
        reputationRegistry[_contributor][_category] >= _reputationTaken ? reputationRegistry[_contributor][_category] -= _reputationTaken: reputationRegistry[_contributor][_category] =0;
        voteRegistry[_voter][_postId] = true;
        emit Voted(_postId, _contributor, _voter, reputationRegistry[_contributor][_category], reputationRegistry[_voter][_category], postRegistry[_postId].votes, false, _reputationTaken);
    }

    // Validating the change in reputation
    function validateReputationChange(address _sender, bytes32 _categoryId, uint8 _reputationAdded) internal view returns (bool _result) {
        uint80 _reputation = reputationRegistry[_sender][_categoryId];
        if (_reputation < 2 ) {
            _reputationAdded == 1 ? _result = true: _result = false; // If the person voting has <2 reputation points, they can only add/take away 1 reputation point
        }
        else {
            2**_reputationAdded <= _reputation ? _result = true: _result = false; // Amount of reputation you can add/take away is based on logs (power/sqrt of 2s/multiplesOf2)
        }
    }

    // Creating a category
    function addCategory(string calldata _category) external {
        bytes32 _categoryId = keccak256(abi.encode(_category));
        categoryRegistry[_categoryId] = _category;
        emit CategoryCreated(_categoryId, _category);
    }

    function getContent(bytes32 _contentId) public view returns (string memory) {
        return contentRegistry[_contentId];
    }

    function getCategory(bytes32 _categoryId) public view returns (string memory) {
        return categoryRegistry[_categoryId];
    }

    function getReputation(address _address, bytes32 _categoryId) public view returns(uint80) {
        return reputationRegistry[_address][_categoryId];
    }

    function getPost(bytes32 _postId) public view returns(address, bytes32, bytes32, int72, bytes32) {
        return (
            postRegistry[_postId].postOwner,
            postRegistry[_postId].parentPost,
            postRegistry[_postId].contentId,
            postRegistry[_postId].votes,
            postRegistry[_postId].categoryId);
    }
}