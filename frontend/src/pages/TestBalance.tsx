// src/pages/TestBalance.tsx

import { useBinksBalance } from "@/hooks/useBinksBalance"; 
import { useAccount } from "wagmi";

const TestBalance = () => {
  const { address } = useAccount();
  const { data, isLoading, error } = useBinksBalance();

  if (!address) {
    return <div>Please connect your wallet</div>;
  }

  if (isLoading) {
    return <div>Loading balance...</div>;
  }

  if (error) {
    return <div>Error fetching balance: {error.message}</div>;
  }

  return (
    <div>
      <h1>Your BINKS Balance</h1>
      <p>{data ? `${Number(data) / 1e18} BNKS` : "0 BNKS"}</p> 
    </div>
  );
};

export default TestBalance;
