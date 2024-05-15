// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Pair.sol";

contract Router {
    address public owner;
    mapping(bytes32 => address) public pairAddresses; 
    address[] public arrayPairContracts;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can perform this action");
        _;
    }

    function addPair(address token1, address token2, address pairAddress) private {
        bytes32 pairKey = getPairKey(token1, token2);
        pairAddresses[pairKey] = pairAddress;
    }

    function getPairKey(address token1, address token2) private pure returns (bytes32) {
        return keccak256(abi.encodePacked(token1, token2));
    }

    function getPairAddress(address token1, address token2) public view returns (address) {
        bytes32 pairKey = getPairKey(token1, token2);
        return pairAddresses[pairKey];
    }

    function createPair(address token1, address token2, uint256 initialRate) public onlyOwner returns (bool) {
        Pair newPair = new Pair(token1, token2, initialRate);
        addPair(token1, token2, address(newPair));
        // Pair inversedNewPair = new Pair(token2, token1, 1 / initialRate);
        // addPair(token2, token1, address(inversedNewPair));
        arrayPairContracts.push(address(newPair));
        return true;
    }

    function getSwapAmount(address token1, address token2, uint256 amount) public view returns (uint256) {
        address pairAddress = getPairAddress(token1, token2);
        require(pairAddress != address(0), "Pair does not exist");
        Pair pair = Pair(pairAddress);
        return pair.getSwapAmount(amount);
    }

    function getPairs() public view returns (address[] memory) {
        return arrayPairContracts;
    }
}
