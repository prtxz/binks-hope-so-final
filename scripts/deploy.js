// scripts/deploy.js
// scripts/deploy-corebtc.js

/*RPC_URL=https://rpc.test.btcs.network/
PRIVATE_KEY=8A3d8B336dbb3eF591838e280d4e91c572044B38
*/
const hre = require("hardhat");

async function main() {
  console.log("Deploying Binks contract to coreBTC testnet...");
  
  // Get the deployer address
  const [deployer] = await hre.corebtc.getSigners();
  console.log("Deploying with coreBTC account:", deployer.address);
  
  // Set deployment parameters
  const initialSupply = hre.corebtc.utils.satsToBTC("100000000000000"); // 1 million tokens with 18 decimals
  
  // coreBTC testnet addresses for USDT and DEX
  const usdtAddress = "0x900101d06a7426441ae63e9ab3b9b0f63be145f1"; // Example testnet USDT address
  const uniswapRouterAddress = "0x1ae300cea349defc835ee6f41cc2a96def93183f";

  console.log("Deploying with parameters:", 
    initialSupply.toString(), 
    usdtAddress, 
    uniswapRouterAddress
  );
  
  // Deploy contract using coreBTC wrapper
  const Binks = await hre.corebtc.getContractFactory("Binks");
  const binks = await Binks.deploy(
    initialSupply,
    usdtAddress,
    uniswapRouterAddress,
    {
      // CoreBTC specific deployment options
      feeRate: "medium", // Options: low, medium, high
      rbf: false, // Replace-by-fee
      confirmations: 2 // Number of confirmations to wait
    }
  );
  
  console.log("Waiting for transaction to be confirmed (this may take a few minutes)...");
  const receipt = await binks.deployed();
  
  console.log(`
    Binks contract deployed successfully!
    Contract Address: ${receipt.contractAddress}
    Transaction ID: ${receipt.txid}
    Block Height: ${receipt.blockHeight}
    Explorer URL: https://testnet.corebtc.io/tx/${receipt.txid}
  `);
  
  // Verify the contract on coreBTC explorer
  if (process.env.COREBTC_EXPLORER_KEY) {
    console.log("Verifying contract on coreBTC Explorer...");
    try {
      await hre.run("corebtc:verify", {
        contractAddress: receipt.contractAddress,
        arguments: [initialSupply, usdtAddress, uniswapRouterAddress]
      });
      console.log("Contract verified successfully!");
    } catch (error) {
      console.error("Contract verification failed:", error.message);
    }
  } else {
    console.log("Skipping verification - no COREBTC_EXPLORER_KEY provided");
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Deployment failed:", error);
    process.exit(1);
  });
/*const hre = require("hardhat");

async function main() {
  console.log("Deploying Binks contract...");
  
  // Get the contract owner
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying with account:", deployer.address);
  
  // Set deployment parameters - using compatible approach for parsing units
  let initialSupply;
  if (hre.ethers.utils && hre.ethers.utils.parseUnits) {
    // ethers v5 approach
    initialSupply = hre.ethers.utils.parseUnits("1000000", 18);
  } else if (hre.ethers.parseUnits) {
    // ethers v6 approach
    initialSupply = hre.ethers.parseUnits("1000000", 18);
  } else {
    // Fallback to BigNumber
    initialSupply = hre.ethers.BigNumber.from("1000000000000000000000000");
  }
  
  const usdtAddress = "0x900101D06A7426441aE63e9AB3B9B0F63Be145F1";
  const uniswapRouterAddress = "0x1aE300ceA349dEfC835eE6F41Cc2a96dEF93183F";
  
  console.log("Deploying with parameters:", initialSupply.toString(), usdtAddress, uniswapRouterAddress);
  
  // Deploy contract
  const Binks = await hre.ethers.getContractFactory("Binks");
  const binks = await Binks.deploy(
    initialSupply,
    usdtAddress,
    uniswapRouterAddress
  );
  
  // Wait for deployment using compatibility approach
  console.log("Waiting for transaction to be mined...");
  if (binks.deployed) {
    await binks.deployed();
    console.log("Binks contract deployed to:", binks.address);
  } else if (binks.waitForDeployment) {
    await binks.waitForDeployment();
    const address = await binks.getAddress();
    console.log("Binks contract deployed to:", address);
  }
  
  // Log deployment information regardless of outcome
  console.log("Deployment transaction hash:", 
    binks.deployTransaction?.hash || binks.deploymentTransaction?.().hash || "unknown");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

  */