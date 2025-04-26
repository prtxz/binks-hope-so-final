// src/hooks/useBinksContract.ts
import type { PublicClient, WalletClient } from 'viem';
import { usePublicClient, useWalletClient } from 'wagmi';
import { getContract } from 'viem';
import { BINKS_ABI } from '@/contracts/BinksABI';

 // ensure this is the compiled ABI from your backend
import { coreBTC } from '@/wagmi-config';

const BINKS_CONTRACT_ADDRESS = '0x5147e66507b0797E1E39FC7C052e465176D9bF1E'; // your deployed contract

export function useBinksContract() {
  const publicClient = usePublicClient({ chainId: coreBTC.id });
  const { data: walletClient } = useWalletClient({ chainId: coreBTC.id });

  const contract = getContract({
    address: BINKS_CONTRACT_ADDRESS,
    abi: BINKS_ABI,
    client: (walletClient ?? publicClient)! as any,
  });

  return contract;
}
