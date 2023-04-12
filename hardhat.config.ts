import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomiclabs/hardhat-ethers";
import "@openzeppelin/hardhat-upgrades";

// Set Infura API key
const INFURA_API_KEY = "";

// Set Sepolia account private key
const SEPOLIA_PRIVATE_KEY = "";

const config: HardhatUserConfig = {
  solidity: "0.8.18",
  // networks: {
  //   sepolia: {
  //     url: `https://sepolia.infura.io/v3/${INFURA_API_KEY}`,
  //     accounts: [SEPOLIA_PRIVATE_KEY]
  //   }
  // }
};

export default config;
