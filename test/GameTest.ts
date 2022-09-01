import { expect } from "chai";
import "@nomiclabs/hardhat-ethers";
import { ethers, deployments } from "hardhat";

import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { Game } from "../typechain-types";

describe("Game", async () => {
  let signer: SignerWithAddress;
  let game: Game;

  beforeEach(async () => {
    const { Game } = await deployments.fixture(["Game"]);
    game = (await ethers.getContractAt("Game", Game.address, signer)) as Game;
    signer = (await ethers.getSigners())[0];

    await signer.sendTransaction({ to: game.address, value: ethers.utils.parseEther("10"), gasLimit: 25000 });

    // console.log(await ethers.provider.getBalance(game.address));
  });

  it("game1", async () => {
    const player = (await ethers.getSigners())[1];

    await game.connect(player).placeBet({ value: ethers.utils.parseEther("1.5") });

    const currentBalance = await ethers.provider.getBalance(player.address);

    if ((await game.totalGamesPlayerWon()).toNumber() > 0) {
      expect(await ethers.provider.getBalance(player.address)).gte(currentBalance);
      console.log("player won");
    } else {
      expect(await ethers.provider.getBalance(player.address)).equal(currentBalance);
      console.log("player lost");
    }
  });
});
