import { task, subtask } from "hardhat/config";

task("balance", "Prints an account's balance").setAction(async (taskArgs, hre, runSuper) => {
  const ethers = hre.ethers;
  const signer = (await ethers.getSigners())[0];
  console.log(`${ethers.utils.formatEther(await ethers.provider.getBalance(signer.address))} ETH`);
});

task("greeting", "Prints a greeting'")
  .addOptionalParam("greeting", "The greeting to print", "Hello, World!")
  .setAction(async ({ greeting }) => {
    console.log(greeting);
  });

task("hello", "Prints 'Hello, World!'", async function (taskArguments, hre, runSuper) {
  const { ethers } = hre;
  console.log("Hello, World!");
});

task("hello-world", "Prints a hello world message").setAction(async (taskArgs, hre) => {
  if (taskArgs.hello) await hre.run("print", { message: "Hello, World!" });
  if (taskArgs.hoge) await hre.run("hoge");
});

subtask("print", "Prints a message")
  .addParam("message", "The message to print")
  .setAction(async (taskArgs) => {
    console.log(taskArgs.message);
  });

subtask("hoge", "Prints a hoge")
  .addParam("message", "The message to print")
  .setAction(async (taskArgs) => {
    console.log("hoge");
  });
