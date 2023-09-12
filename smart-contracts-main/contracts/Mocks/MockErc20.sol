//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MockErc20 is ERC20 {
    constructor() ERC20("MockErc20", "M") {
    }

    function mint(address to, uint256 amount) public {
        _mint(to, amount);
    }
}