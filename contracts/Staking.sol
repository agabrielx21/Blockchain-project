// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Staking {
    address public owner;

    struct Stake {
        uint256 amount;
        uint256 startTime;
    }

    mapping(address => Stake) public stakes;

    event Staked(address indexed user, uint256 amount, uint256 startTime);
    event Unstaked(address indexed user, uint256 amount, uint256 reward);
    event Withdrawal(address indexed owner, uint256 amount);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function stake() external payable {
        require(msg.value > 0.01 ether, "Minimum stake is 0.01 ether");

        Stake storage userStake = stakes[msg.sender];
        require(userStake.amount == 0, "Already staking");

        userStake.amount = msg.value;
        userStake.startTime = block.timestamp;

        emit Staked(msg.sender, msg.value, block.timestamp);
    }

    function unstake() external {
        Stake storage userStake = stakes[msg.sender];
        require(userStake.amount > 0, "No stake found");

        uint256 stakingDuration = block.timestamp - userStake.startTime;
        uint256 reward = stakingDuration * 0.00001 ether;

        uint256 amountToTransfer = userStake.amount + reward;

        userStake.amount = 0;
        userStake.startTime = 0;

        require(address(this).balance >= amountToTransfer, "Insufficient contract balance");
        payable(msg.sender).transfer(amountToTransfer);

        emit Unstaked(msg.sender, userStake.amount, reward);
    }

    function withdraw(uint256 amount) external onlyOwner {
        require(address(this).balance >= amount, "Insufficient contract balance");
        payable(owner).transfer(amount);
        emit Withdrawal(owner, amount);
    }

    receive() external payable {}
}
