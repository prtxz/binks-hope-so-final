import { writeContract } from '@wagmi/core';
import { BINKS_ABI } from '@/contracts/BinksABI';
import { config } from '@/wagmi-config';
import { Abi, Address } from 'viem';
import { useAccount } from 'wagmi';
import { defineChain } from 'viem';

// Define a properly typed chain using defineChain from viem
const coreBTCChain = defineChain({
  id: 1115,
  name: 'CoreBTC',
  network: 'corebtc',
  nativeCurrency: {
    name: 'CoreBTC',
    symbol: 'CBTC',
    decimals: 18
  },
  rpcUrls: {
    default: {
      http: ['https://rpc.testnet.corebtc.com'],
    },
    public: {
      http: ['https://rpc.testnet.corebtc.com'],
    }
  },
  blockExplorers: {
    default: {
      name: 'CoreBTC Explorer',
      url: 'https://testnet.corebtcscan.com'
    }
  }
});

export function useClaimRewards() {
  const { address } = useAccount();

  async function claim() {
    if (!address) {
      console.error('No account connected');
      return;
    }

    try {
      const txHash = await writeContract(config, {
        address: '0x5147e66507b0797E1E39FC7C052e465176D9bF1E' as Address,
        abi: BINKS_ABI as Abi,
        functionName: 'claimRewards',
        chain: coreBTCChain,
        account: address,
        args: []
      });

      console.log('TxHash:', txHash);
    } catch (err) {
      console.error('Contract write failed:', err);
    }
  }

  return { claim };
}