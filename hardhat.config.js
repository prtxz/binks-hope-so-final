// hardhat.config.js for coreBTC deployment
require("@nomicfoundation/hardhat-toolbox");
//require("@corebtc/hardhat-corebtc");  // CoreBTC hardhat plugin
require("dotenv").config();

// Task to print Bitcoin addresses
task("btc-accounts", "Prints the list of coreBTC accounts", async (taskArgs, hre) => {
  const accounts = await hre.corebtc.getSigners();
  
  for (const account of accounts) {
    console.log(account.address);
  }
});

// Standard task for Ethereum accounts as well
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  // Original Solidity config for Ethereum contracts
  solidity: {
    version: "0.8.28",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  
  // Original Ethereum networks config
  networks: {
    hardhat: {
      chainId: 31337
    },

    // CoreBTC specific configuration
  corebtcTestnet: {
        url: process.env.COREBTC_TESTNET_URL,
        accounts: process.env.BTC_PRIVATE_KEY !== undefined ? [process.env.BTC_PRIVATE_KEY] : [],
        chainId: 1115,
      },
    
  localhost: {
      url: "http://127.0.0.1:8545"
    },

  sepolia: {
      url: process.env.SEPOLIA_URL || "",
      accounts: process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : []
    },

  mainnet: {
      url: process.env.MAINNET_URL || "",
      accounts: process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
      gasPrice: 20000000000  // 20 gwei
    }
  },

  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY
  },

  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts",
    // CoreBTC specific paths
    corebtcCache: "./corebtc-cache",
    corebtcArtifacts: "./corebtc-artifacts"
  },
  mocha: {
    timeout: 40000
  }
};