// SPDX-License-Identifier: MIT
pragma solidity 0.8.9;

contract Decentradit {
    event PostCreated (bytes32 indexed postId, address indexed postOwner, bytes32 indexed parentId, bytes32 contentId);
    event ContentAdded (bytes3 indexed contentId, string contentUri);
    event CategoryCreated (bytes32 indexed categoryId, string category);
    event Voted (bytes32 indexed postId, address indexed postOwner, address indexed voter, uint80 reputationPostOwner);

    struct post {
        address postOwner;
        bytes32 parentPost;
        bytes32 contentId;
        int40 votes;
        bytes32 categoryId;
    }

    mapping  (address => mapping (bytes32 => uint80)) reputationRegistry;
    mapping (bytes32) => string) categoryRegistry;
    mapping (bytes32) => string) contentRegistry;
    mapping (bytes32 => post) postRegistry;
    mapping (address => mapping (bytes32 => bool)) voteRegistry;

    function createPost(bytes32 _parentId, string calldata _contentUri, bytes32 _categoryId) external {
        address _owner = msg.sender;
        bytes32 _contentId = keccak256(abi.encode(_contentUri));
    }
}