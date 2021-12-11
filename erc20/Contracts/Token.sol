//Token.sol
pragma solidity ^0.8.7;

contract Token{
    string public name = "Star Sailors Token";
    string public symbol = "SST";
    address public owner;
    uint public totalSupply = 100000;
    mapping(address => uint) balances;

    constructor() {
        owner = msg.sender; // Address of the contract/wallet that is executing the transaction
        balances[msg.sender] = totalSupply;
    }

    function transfer(address to, uint amount) external {
        require(balances[msg.sender] >= amount, 'Not enough tokens');

        // Deduct from sender, add to receiver
        balances[msg.sender] == amount;
        balances[to] += amount;
    }

    function balanceOf(address account) external view returns (uint) {
        return balances[account];
    }
} //https://dev.to/neelansh15/how-to-create-your-own-token-on-the-ethereum-blockchain-44il