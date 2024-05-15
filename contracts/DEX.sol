// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./Router.sol";

contract DEX {
    IERC20 public token;
    IERC20 public tokenA;
    IERC20 public tokenB;
    Router public router;
    mapping(address => mapping(address => uint256)) public balances;

    constructor(address _routerAddress) {
        router = Router(_routerAddress);
    }

    event Deposit(address indexed user, address indexed token, uint256 amount);
    event Withdrawal(address indexed user, address indexed token, uint256 amount);

    function depositToken(address _token, uint amount) external {
        token = IERC20(_token);
        require(token.balanceOf(msg.sender) > 0, "Insufficient balance to deposit");
        token.transferFrom(msg.sender, address(this), amount);
        balances[_token][msg.sender] += amount;
        emit Deposit( msg.sender, _token , amount);
    }

    function withdrawToken(address _token, uint256 amount) external {
        token = IERC20(_token);
        require(balances[_token][msg.sender] >= amount, "Insufficient balance to withdraw");
        balances[_token][msg.sender] -= amount;
        token.transfer(msg.sender, amount);
        emit Withdrawal(msg.sender, _token, amount);
    }

    function swapToken(address _token1, address _token2, uint256 amountToken1) external {
        tokenA = IERC20(_token1);
        tokenB = IERC20(_token2);
        
        address pairAddress = router.getPairAddress(_token1, _token2);
        require(pairAddress != address(0), "No available pair for these tokens");

        require(tokenA.balanceOf(msg.sender) > amountToken1, "Insufficient balance from the client to complete the swap;");

        Pair pair = Pair(pairAddress);
        uint256 swapAmount = pair.getSwapAmount(amountToken1);
        require(tokenB.balanceOf(address(this)) > swapAmount, "Insufficient balance available to swap from the DEX;");
        
        tokenA.transferFrom(msg.sender, address(this), amountToken1);
        tokenB.transfer(msg.sender, swapAmount);
    }
    
}