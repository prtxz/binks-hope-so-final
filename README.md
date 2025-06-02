🧠 Project: BINKS — Blockchain-Integrated Smart Dustbin System
BINKS is a personal full-stack project that combines Machine Learning, IoT, and Web3 technologies to create a smart, reward-based waste management system. It uses a camera-enabled smart dustbin to identify and segregate waste, calculates its weight, and rewards users with blockchain-based tokens for responsible disposal.

The goal is to gamify sustainability using a decentralized reward system.

🔧 Tech Stack
Frontend: Next.js (via Lovable AI), TypeScript, TailwindCSS

Backend: Supabase (Auth, Database, Edge Functions)

ML: TensorFlow (Keras) + FastAPI / TensorFlow.js

Web3: Smart Contracts (EVM-compatible), WalletConnect

Infra: MCP Server (self-hosted backend with FastAPI/Node.js)

🚀 Core Features
ML-powered waste type classification (plastic, metal, organic, etc.)

Weight-based reward calculation using a custom formula

Blockchain token rewards based on disposal activity

Smartbin QR code linking for user-wallet-session tracking

Real-time dashboard: disposal logs, reward balance, initiatives

Initiative launch system for campaigns (via smart contracts)

🧮 Reward Formula
Reward = BaseRate × MaterialMultiplier × Weight × EnvironmentalFactor
This dynamic formula allows adjusting token rewards based on waste type and environmental factors (ex: Plastic free July, Paper week)
