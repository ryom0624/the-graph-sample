import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import "hardhat-gas-reporter";
import "hardhat-deploy";
// import "@nomiclabs/hardhat-etherscan";
import { HardhatUserConfig } from "hardhat/config";
import networks from "./networks";
import dotenv from "dotenv";
dotenv.config();

const config: HardhatUserConfig = {
  defaultNetwork: "hardhat",
  // etherscan: {
  //   apiKey: process.env.ETHERSCAN_API_KEY,
  // },
  gasReporter: {
    currency: "USD",
    gasPrice: 60,
  },
  networks,
  namedAccounts: {
    deployer: 0
  },
  solidity: {
    version: "0.8.9",
    settings: {
      optimizer: {
        enabled: true,
        runs: 100,
      },
    },
  },
};

export default config;