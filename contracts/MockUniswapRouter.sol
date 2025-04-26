// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract MockUniswapRouter {
    address public factory;
    address public WETH;

    constructor() {
        factory = address(this);
        WETH = address(this);
    }

    function swapExactTokensForTokensSupportingFeeOnTransferTokens(
        uint amountIn,
        uint amountOutMin,
        address[] calldata path,
        address to,
        uint deadline
    ) external {
        // No real swap - just for testing
    }
}
