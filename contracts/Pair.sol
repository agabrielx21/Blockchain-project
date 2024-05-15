// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Pair {
    address public token1;
    address public token2;
    uint256 public rate;  // Number of token2 units per unit of token1

    constructor(address _token1, address _token2, uint256 _initialRate) {
        token1 = _token1;
        token2 = _token2;
        rate = _initialRate;
    }

    function updateRate(uint256 newRate) external {
        rate = newRate;
    }

    function getSwapAmount(uint256 amount) public view returns (uint256) {
        return amount * rate;
    }
}
