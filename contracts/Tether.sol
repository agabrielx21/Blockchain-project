// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";


contract Tether is ERC20, ERC20Burnable {
    constructor(uint256 initialSupply) ERC20("Tether", "FUSD") {
        _mint(msg.sender, initialSupply * (10 ** 18));
    }

    function transfer(address recipient, uint256 amount) public virtual override returns (bool) {
        return super.transfer(recipient, amount * (10 ** 18));
    }

    function transferFrom(address sender, address recipient, uint256 amount) public virtual override returns (bool) {
        return super.transferFrom(sender, recipient, amount * (10 ** 18));
    }

    function balanceOf(address account) public view virtual override returns (uint256) {
        return super.balanceOf(account) / (10 ** 18);
    }

     function totalSupply() public view virtual override returns (uint256) {
        return super.totalSupply() / (10 ** 18);
    }

    function checkMybalance() public view returns (uint256) {
        return super.balanceOf(msg.sender) / (10 ** 18);
    }

    function transferTokens(address recipient, uint256 amount) public returns (bool) {
        return transfer(recipient, amount);
    }

    function burnTokens(uint256 amount) public returns (bool){
        _burn(_msgSender(), amount * (10 ** 18));
        return true;
    }

    function decimals() public view virtual override returns (uint8) {
        return 18;
    }

    function approve(address spender, uint256 amount) public virtual override returns (bool) {
        uint256 scaledAmount = amount * (10 ** 18);
        return super.approve(spender, scaledAmount);
    }    
}
