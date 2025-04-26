import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWallet } from "@/context/WalletContext";
import { formatAddress } from "@/utils/wallet";
import {
  CoinsIcon,
  ArrowRightLeft,
  Clock,
  ChevronDown,
  Wallet,
  RefreshCw
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const conversionRates = {
  USDT: 0.1,
  MATIC: 0.05
};

const liquidationHistory = [
  { id: 1, amount: 1000, asset: 'USDT', value: 100, timestamp: '2025-04-16 15:45' },
  { id: 2, amount: 2500, asset: 'MATIC', value: 125, timestamp: '2025-04-14 10:30' },
  { id: 3, amount: 800, asset: 'USDT', value: 80, timestamp: '2025-04-10 09:15' },
];

const Liquidation = () => {
  const { walletInfo, isConnected } = useWallet();
  const navigate = useNavigate();
  const [amount, setAmount] = useState('');
  const [selectedAsset, setSelectedAsset] = useState('USDT');

  const handleLiquidation = async () => {
    // Placeholder for Web3 integration
    console.log('Liquidating tokens:', { amount, selectedAsset });
  };

  const calculateValue = () => {
    return amount ? Number(amount) * conversionRates[selectedAsset as keyof typeof conversionRates] : 0;
  };

  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    }).format(new Date(dateString));
  };

  if (!isConnected) {
    navigate('/');
    return null;
  }

  return (
    <div className="min-h-screen bg-[#1e1e1e]">
      <div className="max-w-7xl mx-auto p-6">
        <div className="bg-[#242424] rounded-xl border border-[#4CAF50]/20 p-6">
          {/* Summary Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Card className="bg-[#2f2f2f] border-[#4CAF50]/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-white text-lg flex items-center">
                  <Wallet className="w-5 h-5 text-[#4CAF50] mr-2" />
                  Wallet Address
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[#4CAF50] font-mono">
                  {formatAddress(walletInfo?.address || '')}
                </p>
              </CardContent>
            </Card>

            <Card className="bg-[#2f2f2f] border-[#4CAF50]/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-white text-lg flex items-center">
                  <CoinsIcon className="w-5 h-5 text-[#4CAF50] mr-2" />
                  BINK Balance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-[#4CAF50]">1,240</p>
              </CardContent>
            </Card>

            <Card className="bg-[#2f2f2f] border-[#4CAF50]/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-white text-lg flex items-center">
                  <RefreshCw className="w-5 h-5 text-[#4CAF50] mr-2" />
                  Total Earned
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-[#4CAF50]">2,500</p>
              </CardContent>
            </Card>
          </div>

          {/* Liquidation Section */}
          <Card className="bg-[#2f2f2f] border-[#4CAF50]/20 mb-8">
            <CardHeader>
              <CardTitle className="text-white">Liquidate Tokens</CardTitle>
              <CardDescription className="text-gray-300">
                Convert your BINK tokens to other assets
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-gray-300 mb-2 block">Amount</label>
                    <Input
                      type="number"
                      placeholder="Enter BINK amount"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="bg-[#1a1a1a] border-[#4CAF50]/20 text-white"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-300 mb-2 block">Convert to</label>
                    <Select value={selectedAsset} onValueChange={setSelectedAsset}>
                      <SelectTrigger className="bg-[#1a1a1a] border-[#4CAF50]/20 text-white">
                        <SelectValue placeholder="Select asset" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#2a2a2a] border-[#4CAF50]/20">
                        <SelectItem value="USDT">USDT</SelectItem>
                        <SelectItem value="MATIC">MATIC</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="bg-[#1a1a1a] p-6 rounded-lg border border-[#4CAF50]/20">
                  <h4 className="text-white mb-4">Conversion Summary</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-300">Rate</span>
                      <span className="text-[#4CAF50]">
                        1 BINK = {conversionRates[selectedAsset as keyof typeof conversionRates]} {selectedAsset}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">You'll receive</span>
                      <span className="text-[#4CAF50] text-xl font-bold">
                        {calculateValue()} {selectedAsset}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <Button
                className="w-full mt-6 bg-[#4CAF50] hover:bg-[#45a049] text-white"
                onClick={handleLiquidation}
              >
                <ArrowRightLeft className="mr-2 h-4 w-4" />
                Confirm Liquidation
              </Button>
            </CardContent>
          </Card>

          {/* History Section */}
          <Card className="bg-[#2f2f2f] border-[#4CAF50]/20">
            <CardHeader>
              <CardTitle className="text-white">Liquidation History</CardTitle>
              <CardDescription className="text-gray-300">
                Your past token conversions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="text-left border-b border-[#4CAF50]/20">
                    <tr>
                      <th className="pb-2 text-sm font-medium text-gray-400">Date</th>
                      <th className="pb-2 text-sm font-medium text-gray-400">Amount</th>
                      <th className="pb-2 text-sm font-medium text-gray-400">Asset</th>
                      <th className="pb-2 text-sm font-medium text-gray-400">Value</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#323232]">
                    {liquidationHistory.map((item) => (
                      <tr key={item.id} className="hover:bg-[#2a2a2a]">
                        <td className="py-3 text-sm text-gray-300">
                          {formatDate(item.timestamp)}
                        </td>
                        <td className="py-3 text-sm text-[#4CAF50]">
                          {item.amount} BINK
                        </td>
                        <td className="py-3">
                          <Badge variant="outline" className="bg-[#2a2a2a] text-[#4CAF50] border-[#4CAF50]/20">
                            {item.asset}
                          </Badge>
                        </td>
                        <td className="py-3 text-sm font-medium text-white">
                          {item.value} {item.asset}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Liquidation;