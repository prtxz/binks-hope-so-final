const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Binks Token", function () {
  let Binks;
  let binksToken;
  let owner;
  let user1;
  let user2;
  let device;
  let mockUSDT;
  let mockRouter;

  // Material type enum mapping
  const MaterialType = {
    Plastic: 0,
    Paper: 1,
    Glass: 2,
    Metal: 3,
    Organic: 4,
    EWaste: 5
  };

  beforeEach(async function () {
    // Get signers
    [owner, user1, user2, device] = await ethers.getSigners();

    // Deploy mock USDT token
    const MockToken = await ethers.getContractFactory("MockERC20");
    mockUSDT = await MockToken.deploy("Mock USDT", "USDT", ethers.parseEther("1000000"));
    await mockUSDT.waitForDeployment();

    // Deploy mock Uniswap router
    const MockRouter = await ethers.getContractFactory("MockUniswapRouter");
    mockRouter = await MockRouter.deploy();
    await mockRouter.waitForDeployment();

    // Deploy Binks token
    Binks = await ethers.getContractFactory("Binks");
    binksToken = await Binks.deploy(
      ethers.parseEther("10000000"), // 10M initial supply
      await mockUSDT.getAddress(),
      await mockRouter.getAddress()
    );
    await binksToken.waitForDeployment();

    // Transfer some USDT to the contract for liquidation tests
    await mockUSDT.transfer(await binksToken.getAddress(), ethers.parseEther("10000"));

    // Authorize device for waste disposal
    await binksToken.setDeviceAuthorization(device.address, true);
  });

  describe("Basic Token Functionality", function () {
    it("Should set the correct name and symbol", async function () {
      expect(await binksToken.name()).to.equal("Binks");
      expect(await binksToken.symbol()).to.equal("BNKS");
    });

    it("Should assign the total supply to the owner", async function () {
      const ownerBalance = await binksToken.balanceOf(owner.address);
      expect(await binksToken.totalSupply()).to.equal(ownerBalance);
    });
  });

  describe("Waste Disposal and Rewards", function () {
    it("Should reward user for waste disposal", async function () {
      // Initial balance
      const initialBalance = await binksToken.balanceOf(user1.address);
      
      // Dispose 1kg of plastic waste
      await binksToken.connect(device).rewardWasteDisposal(
        user1.address,
        MaterialType.Plastic,
        1000 // 1000g = 1kg
      );

      // Calculate expected reward
      // baseRate = 10 tokens, multiplier for plastic = 0.8, environmentalFactor = 1
      // Expected reward = 10 * 0.8 * 1 * 1 = 8 tokens
      const expectedReward = ethers.parseEther("8");
      
      // Check balance after disposal
      const finalBalance = await binksToken.balanceOf(user1.address);
      expect(finalBalance - initialBalance).to.equal(expectedReward);
    });

    it("Should only allow authorized devices to reward waste disposal", async function () {
      await expect(
        binksToken.connect(user1).rewardWasteDisposal(
          user1.address,
          MaterialType.Plastic,
          1000
        )
      ).to.be.revertedWith("Not authorized");
    });

    it("Should allow owner to update reward parameters", async function () {
      // Update base rate to 20 tokens and environmental factor to 1.5
      await binksToken.updateRewardParameters(
        ethers.parseEther("20"),
        ethers.parseEther("1.5")
      );
      
      expect(await binksToken.baseRate()).to.equal(ethers.parseEther("20"));
      expect(await binksToken.environmentalFactor()).to.equal(ethers.parseEther("1.5"));
    });
  });

  describe("Liquidation Functionality", function () {
    it("Should allow users to liquidate tokens when enabled", async function () {
      // Enable liquidation at a rate of 0.1 USDT per BNKS
      await binksToken.setLiquidation(true, ethers.parseEther("0.1"));
      
      // Give some tokens to user1
      await binksToken.transfer(user1.address, ethers.parseEther("100"));
      
      // User1 liquidates 50 tokens
      const tokensToLiquidate = ethers.parseEther("50");
      const expectedUSDT = ethers.parseEther("5"); // 50 * 0.1 = 5 USDT
      
      // Get balances before liquidation
      const userBinksBalanceBefore = await binksToken.balanceOf(user1.address);
      const userUSDTBalanceBefore = await mockUSDT.balanceOf(user1.address);
      
      // Perform liquidation
      await binksToken.connect(user1).liquidateTokens(tokensToLiquidate);
      
      // Check balances after liquidation
      const userBinksBalanceAfter = await binksToken.balanceOf(user1.address);
      const userUSDTBalanceAfter = await mockUSDT.balanceOf(user1.address);
      
      expect(userBinksBalanceBefore - userBinksBalanceAfter).to.equal(tokensToLiquidate);
      expect(userUSDTBalanceAfter - userUSDTBalanceBefore).to.equal(expectedUSDT);
    });

    it("Should not allow liquidation when disabled", async function () {
      // Give some tokens to user1
      await binksToken.transfer(user1.address, ethers.parseEther("100"));
      
      // Try to liquidate when disabled
      await expect(
        binksToken.connect(user1).liquidateTokens(ethers.parseEther("50"))
      ).to.be.revertedWith("Liquidation not enabled");
    });
  });

  describe("Environmental Initiatives", function () {
    it("Should create and fund an initiative", async function () {
      // Create an initiative
      await binksToken.createInitiative("Save the Oceans", "Cleaning plastic from oceans");
      
      // Give tokens to users
      await binksToken.transfer(user1.address, ethers.parseEther("100"));
      await binksToken.transfer(user2.address, ethers.parseEther("100"));
      
      // User1 funds the initiative
      await binksToken.connect(user1).fundInitiative(0, ethers.parseEther("50"));
      
      // Check initiative details
      expect(await binksToken.getTotalUserDonations(0)).to.equal(ethers.parseEther("50"));
      
      // User2 funds the initiative
      await binksToken.connect(user2).fundInitiative(0, ethers.parseEther("30"));
      
      // Check updated initiative details
      expect(await binksToken.getTotalUserDonations(0)).to.equal(ethers.parseEther("80"));
      
      // Check donors list
      const donors = await binksToken.getInitiativeDonors(0);
      expect(donors.length).to.equal(2);
      expect(donors[0]).to.equal(user1.address);
      expect(donors[1]).to.equal(user2.address);
      
      // Check user donations
      expect(await binksToken.getUserDonation(0, user1.address)).to.equal(ethers.parseEther("50"));
      expect(await binksToken.getUserDonation(0, user2.address)).to.equal(ethers.parseEther("30"));
    });

    it("Should not allow funding inactive initiatives", async function () {
      // Create an initiative
      await binksToken.createInitiative("Save the Forests", "Planting trees");
      
      // Deactivate the initiative
      await binksToken.setInitiativeStatus(0, false);
      
      // Give tokens to user1
      await binksToken.transfer(user1.address, ethers.parseEther("100"));
      
      // Try to fund the inactive initiative
      await expect(
        binksToken.connect(user1).fundInitiative(0, ethers.parseEther("50"))
      ).to.be.revertedWith("Initiative is not active");
    });
  });
});