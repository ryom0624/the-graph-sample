//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.9;

import "hardhat/console.sol";

contract Game {
    uint256 public totalGamesPlayerWon = 0;
    uint256 public totalGamesPlayerLost = 0;
    uint256 public wonRate;
    event BetPlaced(address player, uint256 value, bool hasWon);

    constructor(uint rate) {
        wonRate = rate;
    }

    receive() external payable {}

    function placeBet() external payable {
        bool hasWon = evaluateBetForPlayer(msg.sender);

        if (hasWon) {
            (bool success, ) = msg.sender.call{ value: msg.value * 2 }('');
            require(success, "Transfer failed");
            totalGamesPlayerWon++;
        } else {
            totalGamesPlayerLost++;
        }

        emit BetPlaced(msg.sender, msg.value, hasWon);
    }

    function evaluateBetForPlayer(address player) public view returns(bool) {
        uint seed = generateRandom(player) % 100;
        console.log("seed number is: ", seed);
        return seed > wonRate;
    }

    function generateRandom(address player) public view returns(uint) {
        return uint(keccak256(abi.encodePacked(player, block.difficulty, block.timestamp, blockhash(block.number))));
    }
}
