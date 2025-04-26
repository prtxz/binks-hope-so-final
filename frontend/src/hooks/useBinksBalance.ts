import { useReadContract } from 'wagmi';
import { coreBTC } from '@/wagmi-config';
import { BINKS_ABI } from '@/contracts/BinksABI';
import { useAccount } from 'wagmi';

export function useBinksBalance() {
  const { address } = useAccount();

  return useReadContract({
    address: '0x5147e66507b0797E1E39FC7C052e465176D9bF1E',
    abi: BINKS_ABI,
    functionName: 'balanceOf',
    args: [address],
    chainId: coreBTC.id,
  });
}
