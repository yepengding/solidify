import { ethers, upgrades } from "hardhat";

/**
 * Deploy Solidify Proxy
 */
async function main() {
  // Get deployer
  const [deployer] = await ethers.getSigners();

  // Deploy
  const SolidifyProxy = await ethers.getContractFactory("SolidifyProxy");
  const solidifyProxy = await upgrades.deployProxy(SolidifyProxy);

  await solidifyProxy.deployed();

  console.log(
    `Solidify Proxy is deployed to ${solidifyProxy.address} by account ${deployer.address}`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
