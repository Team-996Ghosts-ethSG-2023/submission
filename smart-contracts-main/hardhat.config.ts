import { HardhatUserConfig, task } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import { ethers } from "hardhat";
require("dotenv").config();

const config = {
  solidity: "0.8.19",
  networks: {
    hardhat: {
      allowUnlimitedContractSize: true,
      saveDeployments: true,
      chainId: 1,
    },
      mumbai: {
      url: "https://rpc-mumbai.maticvigil.com/",
      accounts: [process.env.PK!],
      chainId: 80001,
      live: true,
      saveDeployments: true,
      // gasMultiplier: 5,
      gasPrice: 300
    },
      taiko: { //https://taiko.xyz/docs/reference/rpc-configuration
         url: "https://rpc.test.taiko.xyz", // Taiko Grimsvotn L2
         accounts: 
          [process.env.PK!],
      },
      mantle: {
        url: "https://rpc.testnet.mantle.xyz",
        accounts: 
         [process.env.PK!],
        gasPrice: 150
     },
  }
};




export default config;
