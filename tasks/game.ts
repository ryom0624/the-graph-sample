import { task, subtask } from "hardhat/config";

import { Game } from "../typechain-types";
import { address } from "../deployments/goerli/Game.json";

task("game:deposit", "Deposit to Game Contract on Goerli Network")
  .addParam("amount", "Send Ether amount", "1")
  .setAction(async (taskArgs, hre) => {
    const ethers = hre.ethers;
    const signer = (await ethers.getSigners())[0];

    const game = (await ethers.getContractAt("Game", address, signer)) as Game;

    console.log(taskArgs);
    const sendEtherAmount = taskArgs.amount;

    if (hre.network.config.chainId !== 5) {
      return;
    }

    console.log("Game Contract Address is :", game.address);
    console.log(
      "Game Contract Balance is :",
      Number(ethers.utils.formatEther(await ethers.provider.getBalance(game.address))),
      "ETH"
    );

    console.log(`Signer Address is : ${signer.address}`);
    console.log(
      "Signer Balance is :",
      Number(ethers.utils.formatEther(await ethers.provider.getBalance(signer.address))),
      "ETH"
    );

    if (Number(sendEtherAmount) > Number(ethers.utils.formatEther(await ethers.provider.getBalance(signer.address)))) {
      console.log("Insufficient Balance Exit...");
      return;
    }

    console.log(`Sending ${sendEtherAmount} Ether...`);

    const tx = await signer.sendTransaction({ to: game.address, value: ethers.utils.parseEther(sendEtherAmount) });
    console.log(`Tx: ${tx.hash}`);

    const receipt = await tx.wait();
    console.log(`Block: ${receipt.blockHash}`);

    console.log(`Completed`);

    console.log(
      "Game Contract Balance is :",
      Number(ethers.utils.formatEther(await ethers.provider.getBalance(game.address))),
      "ETH"
    );

    console.log(
      "Signer Balance is :",
      Number(ethers.utils.formatEther(await ethers.provider.getBalance(signer.address))),
      "ETH"
    );
  });

task("game:bid", "Bid to Game Contract on Goerli Network")
  .addParam("amount", "Send Ether amount", "1")
  .setAction(async (taskArgs, hre) => {
    const ethers = hre.ethers;
    const signer = (await ethers.getSigners())[0];
    const game = (await ethers.getContractAt("Game", address, signer)) as Game;
    const sendEtherAmount = taskArgs.amount;

    const currentBalnce = Number(ethers.utils.formatEther(await ethers.provider.getBalance(signer.address)));

    if (hre.network.config.chainId !== 5) {
      return;
    }
    if (Number(sendEtherAmount) > Number(ethers.utils.formatEther(await ethers.provider.getBalance(signer.address)))) {
      console.log("Insufficient Balance Exit...");
      return;
    }

    const tx = await game.placeBet({ value: ethers.utils.parseEther(sendEtherAmount) });
    console.log(`Tx: ${tx.hash}`);

    const receipt = await tx.wait();
    console.log(`Block: ${receipt.blockHash}`);

    console.log(`Completed`);

    console.log(
      "Game Contract Balance is :",
      Number(ethers.utils.formatEther(await ethers.provider.getBalance(game.address))),
      "ETH"
    );

    const afterBalnace = Number(ethers.utils.formatEther(await ethers.provider.getBalance(signer.address)));
    console.log("Signer Balance is :", afterBalnace, "ETH");

    if (currentBalnce < afterBalnace) {
      console.log(`You Won Get: + ${afterBalnace - currentBalnce} ETH`);
    } else {
      console.log(`You Lost: - ${sendEtherAmount} ETH`);
    }
  });
