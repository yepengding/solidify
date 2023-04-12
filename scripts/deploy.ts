import { ethers } from "hardhat";

async function main() {
  // Get deployer
  const [deployer] = await ethers.getSigners();

  // Deploy
  const Solidify = await ethers.getContractFactory("Solidify");
  const solidify = await Solidify.deploy();

  await solidify.deployed();

  console.log(
    `Solidify is deployed to ${solidify.address} by account ${deployer.address}`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
