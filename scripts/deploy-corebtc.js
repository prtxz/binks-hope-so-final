const hre = require("hardhat");

async function main() {
  console.log("Deploying Binks contract to CoreBTC testnet...");
  
  // Get the contract owner
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying with account:", deployer.address);
  
  // Set deployment parameters
  const initialSupply = hre.ethers.parseEther("1000000"); // 1 million tokens with 18 decimals
  
  // CoreBTC testnet addresses for USDT and DEX
  const usdtAddress = "0x900101d06a7426441ae63e9ab3b9b0f63be145f1";
  const uniswapRouterAddress = "0x1ae300cea349defc835ee6f41cc2a96def93183f";
  
  console.log("Deploying with parameters:", 
    initialSupply.toString(), 
    usdtAddress, 
    uniswapRouterAddress
  );
  
  // Deploy contract
  const Binks = await hre.ethers.getContractFactory("Binks");
  const binks = await Binks.deploy(
    initialSupply,
    usdtAddress,
    uniswapRouterAddress
  );
  
  console.log("Waiting for transaction to be mined...");
  await binks.waitForDeployment();
  
  const contractAddress = await binks.getAddress();
  const txHash = binks.deploymentTransaction().hash;
  
  console.log(`
    Binks contract deployed successfully!
    Contract Address: ${contractAddress}
    Transaction Hash: ${txHash}
    Explorer URL: https://testnet.corebtc.io/tx/${txHash}
  `);
  
  // Optional: Verify contract on explorer if supported
  console.log("Note: To verify the contract (if supported by CoreBTC explorer):");
  console.log(`npx hardhat verify --network corebtcTestnet ${contractAddress} ${initialSupply.toString()} ${usdtAddress} ${uniswapRouterAddress}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Deployment failed:", error);
    process.exit(1);
  });