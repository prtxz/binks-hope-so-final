// src/components/RewardPool.tsx
import { useContractRead } from 'wagmi';
import { BINKS_ABI } from '../contracts/BinksABI';
import { coreBTC } from '../wagmi-config';

const contractAddress = '0x5147e66507b0797E1E39FC7C052e465176D9bF1E'; // deployed address

export function RewardPool() {
  const { data, isLoading, error } = useContractRead({
    address: contractAddress,
    abi: BINKS_ABI,
    functionName: 'getRewardPool',
    chainId: coreBTC.id,
  });

  return (
    <div className="text-white mt-4">
      {isLoading && 'Loading reward pool...'}
      {error && <p className="text-red-500">Error: {error.message}</p>}
      {!isLoading && !error && (
        <p>Reward Pool: {data?.toString()} tBINK</p>
      )}
    </div>
  );
}
