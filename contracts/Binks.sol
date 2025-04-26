// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

interface IUniswapV2Router02 {
    function swapExactTokensForTokensSupportingFeeOnTransferTokens(
        uint amountIn,
        uint amountOutMin,
        address[] calldata path,
        address to,
        uint deadline
    ) external;
    function factory() external pure returns (address);
    function WETH() external pure returns (address);
}

contract Binks is ERC20, Ownable {
    // Waste material types
    enum MaterialType { Plastic, Paper, Glass, Metal, Organic, EWaste }
    
    // Reward parameters
    uint256 public baseRate = 10 * 10**18; // Base reward rate (tokens per kg)
    mapping(MaterialType => uint256) public materialMultipliers; // Scaled by 1e18
    uint256 public environmentalFactor = 1 * 10**18; // Default 1.0
    
    // Liquidation parameters
    address public usdtTokenAddress;
    IUniswapV2Router02 public uniswapRouter;
    bool public liquidationEnabled = false;
    uint256 public liquidationRate = 0; // USDT per Binks token
    
    // Marketplace and initiatives
    struct Initiative {
        string name;
        string description;
        uint256 totalFunding;
        bool active;
        uint256 userDonationsTotal; // Total amount donated by users
        address[] donors; // List of donor addresses
        mapping(address => uint256) donationsByUser; // Track amount donated by each user
    }
    
    mapping(uint256 => Initiative) public initiatives;
    uint256 public initiativeCount;
    
    // Smart dustbin authorization
    mapping(address => bool) public authorizedDevices;
    
    // Events
    event WasteDisposed(address indexed user, MaterialType material, uint256 weight, uint256 reward);
    event Liquidated(address indexed user, uint256 binksAmount, uint256 usdtAmount);
    event LiquidationEnabled(bool enabled, uint256 rate);
    event InitiativeCreated(uint256 indexed id, string name);
    event InitiativeFunded(uint256 indexed id, address funder, uint256 amount);
    event DeviceAuthorized(address device, bool status);
    
    constructor(
        uint256 initialSupply,
        address _usdtTokenAddress,
        address _uniswapRouterAddress
    ) ERC20("Binks", "BNKS") Ownable(msg.sender) {
        _mint(msg.sender, initialSupply);
        usdtTokenAddress = _usdtTokenAddress;
        uniswapRouter = IUniswapV2Router02(_uniswapRouterAddress);
        
        // Initialize material multipliers (scaled by 1e18)
        materialMultipliers[MaterialType.Plastic] = 8 * 10**17;  // 0.8
        materialMultipliers[MaterialType.Paper] = 6 * 10**17;    // 0.6
        materialMultipliers[MaterialType.Glass] = 12 * 10**17;   // 1.2
        materialMultipliers[MaterialType.Metal] = 15 * 10**17;   // 1.5
        materialMultipliers[MaterialType.Organic] = 4 * 10**17;  // 0.4
        materialMultipliers[MaterialType.EWaste] = 3 * 10**18;   // 3.0
        
        // Approve Uniswap to spend tokens for swap
        _approve(address(this), address(uniswapRouter), type(uint256).max);
    }
    
    // ========== Device Authorization ==========
    
    /**
     * @notice Authorize or deauthorize a smart dustbin device
     * @param device Address of the IoT device
     * @param status Authorization status
     */
    function setDeviceAuthorization(address device, bool status) external onlyOwner {
        authorizedDevices[device] = status;
        emit DeviceAuthorized(device, status);
    }
    
    modifier onlyAuthorizedDevice() {
        require(authorizedDevices[msg.sender] || msg.sender == owner(), "Not authorized");
        _;
    }
    
    // ========== Waste Disposal & Rewards ==========
    
    /**
     * @notice Calculate and distribute rewards for waste disposal
     * @param user Address of the user who disposed waste
     * @param material Type of material disposed
     * @param weightInGrams Weight of disposed material in grams
     */
    function rewardWasteDisposal(
        address user, 
        MaterialType material, 
        uint256 weightInGrams
    ) external onlyAuthorizedDevice {
        // Convert grams to kg with 18 decimals precision
        uint256 weightInKg = (weightInGrams * 10**18) / 1000;
        
        // Calculate reward: baseRate * materialMultiplier * weight * environmentalFactor
        uint256 reward = (baseRate * materialMultipliers[material] * weightInKg * environmentalFactor) 
                        / (10**18 * 10**18 * 10**18);
        
        // Mint tokens to the user
        _mint(user, reward);
        
        // Emit event
        emit WasteDisposed(user, material, weightInGrams, reward);
    }
    
    /**
     * @notice Update reward parameters
     * @param newBaseRate New base rate for rewards
     * @param newEnvironmentalFactor New environmental factor
     */
    function updateRewardParameters(
        uint256 newBaseRate,
        uint256 newEnvironmentalFactor
    ) external onlyOwner {
        baseRate = newBaseRate;
        environmentalFactor = newEnvironmentalFactor;
    }
    
    /**
     * @notice Update multiplier for a specific material
     * @param material Material type to update
     * @param multiplier New multiplier value (scaled by 1e18)
     */
    function updateMaterialMultiplier(
        MaterialType material,
        uint256 multiplier
    ) external onlyOwner {
        materialMultipliers[material] = multiplier;
    }
    
    // ========== Liquidation Functions ==========
    
    /**
     * @notice Enable or disable liquidation with a fixed rate
     * @param enabled Whether liquidation should be enabled
     * @param rate The fixed rate for liquidation (USDT per Binks token)
     */
    function setLiquidation(bool enabled, uint256 rate) external onlyOwner {
        liquidationEnabled = enabled;
        liquidationRate = rate;
        emit LiquidationEnabled(enabled, rate);
    }

    /**
     * @notice Allows users to liquidate their tokens at a fixed rate
     * @param amount Amount of Binks tokens to liquidate
     */
    function liquidateTokens(uint256 amount) external {
        require(liquidationEnabled, "Liquidation not enabled");
        require(balanceOf(msg.sender) >= amount, "Insufficient token balance");
        
        uint256 usdtToReturn = amount * liquidationRate / (10**decimals());
        
        // Check contract has enough USDT to pay
        IERC20 usdt = IERC20(usdtTokenAddress);
        require(usdt.balanceOf(address(this)) >= usdtToReturn, "Insufficient USDT in contract");
        
        // Transfer Binks from user to contract
        _transfer(msg.sender, address(this), amount);
        
        // Transfer USDT to user
        usdt.transfer(msg.sender, usdtToReturn);
        
        emit Liquidated(msg.sender, amount, usdtToReturn);
    }
    
    /**
     * @notice Owner can swap Binks for USDT via Uniswap
     * @param amount Amount of Binks to swap
     * @param minUSDT Minimum USDT to receive (slippage control)
     */
    function swapTokensForUSDT(uint256 amount, uint256 minUSDT) external onlyOwner {
        require(balanceOf(address(this)) >= amount, "Insufficient balance in contract");
        
        address[] memory path = new address[](2);
        path[0] = address(this);
        path[1] = usdtTokenAddress;
        
        // Perform the swap
        uniswapRouter.swapExactTokensForTokensSupportingFeeOnTransferTokens(
            amount,
            minUSDT,
            path,
            msg.sender,
            block.timestamp
        );
    }
    
    /**
     * @notice Function for owner to deposit USDT into contract for liquidations
     * @param amount Amount of USDT to deposit
     */
    function depositUSDTForLiquidation(uint256 amount) external onlyOwner {
        IERC20 usdt = IERC20(usdtTokenAddress);
        require(usdt.transferFrom(msg.sender, address(this), amount), "USDT transfer failed");
    }
    
    /**
     * @notice Function for owner to withdraw USDT from the contract
     * @param amount Amount of USDT to withdraw
     */
    function withdrawUSDT(uint256 amount) external onlyOwner {
        IERC20 usdt = IERC20(usdtTokenAddress);
        require(usdt.balanceOf(address(this)) >= amount, "Insufficient USDT balance");
        usdt.transfer(msg.sender, amount);
    }
    
    // ========== Environmental Initiatives ==========
    
    /**
     * @notice Create a new environmental initiative
     * @param name Name of the initiative
     * @param description Description of the initiative
     */
    function createInitiative(string memory name, string memory description) external onlyOwner {
        uint256 id = initiativeCount;
        
        // Initialize the initiative with the core properties
        initiatives[id].name = name;
        initiatives[id].description = description;
        initiatives[id].totalFunding = 0;
        initiatives[id].active = true;
        initiatives[id].userDonationsTotal = 0;
        // Note: donors array is automatically initialized as empty
        
        initiativeCount++;
        emit InitiativeCreated(id, name);
    }
    
    /**
     * @notice Get all donors for a specific initiative
     * @param id ID of the initiative
     * @return Array of donor addresses
     */
    function getInitiativeDonors(uint256 id) external view returns (address[] memory) {
        require(id < initiativeCount, "Initiative does not exist");
        return initiatives[id].donors;
    }
    
    /**
     * @notice Get donation amount for a specific user to an initiative
     * @param id ID of the initiative
     * @param donor Address of the donor
     * @return Amount donated by the user
     */
    function getUserDonation(uint256 id, address donor) external view returns (uint256) {
        require(id < initiativeCount, "Initiative does not exist");
        return initiatives[id].donationsByUser[donor];
    }
    
    /**
     * @notice Get total user donations for an initiative
     * @param id ID of the initiative
     * @return Total amount donated by users
     */
    function getTotalUserDonations(uint256 id) external view returns (uint256) {
        require(id < initiativeCount, "Initiative does not exist");
        return initiatives[id].userDonationsTotal;
    }
    
    /**
     * @notice Fund an environmental initiative
     * @param id ID of the initiative to fund
     * @param amount Amount of Binks tokens to contribute
     */
    function fundInitiative(uint256 id, uint256 amount) external {
        require(id < initiativeCount, "Initiative does not exist");
        require(initiatives[id].active, "Initiative is not active");
        require(balanceOf(msg.sender) >= amount, "Insufficient token balance");
        
        // Transfer tokens from user to contract
        _transfer(msg.sender, address(this), amount);
        
        // Update initiative funding
        initiatives[id].totalFunding += amount;
        initiatives[id].userDonationsTotal += amount;
        
        // If this is user's first donation, add them to the donors array
        if (initiatives[id].donationsByUser[msg.sender] == 0) {
            initiatives[id].donors.push(msg.sender);
        }
        
        // Update user's donation amount
        initiatives[id].donationsByUser[msg.sender] += amount;
        
        emit InitiativeFunded(id, msg.sender, amount);
    }
    
    /**
     * @notice Set the active status of an initiative
     * @param id ID of the initiative
     * @param active New active status
     */
    function setInitiativeStatus(uint256 id, bool active) external onlyOwner {
        require(id < initiativeCount, "Initiative does not exist");
        initiatives[id].active = active;
    }
    
    /**
     * @notice Owner can withdraw Binks tokens from the contract
     * @param amount Amount of Binks to withdraw
     */
    function withdrawBinks(uint256 amount) external onlyOwner {
        require(balanceOf(address(this)) >= amount, "Insufficient Binks balance");
        _transfer(address(this), msg.sender, amount);
    }
}