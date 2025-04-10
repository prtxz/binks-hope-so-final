
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWallet } from "@/context/WalletContext";
import { formatAddress } from "@/utils/wallet";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Wallet, ArrowRight, Award, Recycle, LineChart, Trash2 } from "lucide-react";

const Dashboard = () => {
  const { walletInfo, isConnected, disconnectUserWallet } = useWallet();
  const navigate = useNavigate();

  // Redirect to home if not connected
  useEffect(() => {
    if (!isConnected) {
      navigate('/');
    }
  }, [isConnected, navigate]);

  if (!isConnected || !walletInfo) {
    return null; // Will redirect from the useEffect
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#242424] to-[#1e1e1e] pb-16">
      {/* Dashboard Header */}
      <div className="bg-[#1a1a1a] border-b border-[#4CAF50]/20 px-4 py-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center">
          <div className="flex items-center mb-4 sm:mb-0">
            <div 
              className="w-12 h-12 bg-[#323232] border-2 border-[#4CAF50] rounded-full flex items-center justify-center mr-4"
            >
              <h1 className="text-lg font-bold text-[#4CAF50]">BINKS</h1>
            </div>
            <h1 className="text-2xl font-bold text-white">Dashboard</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center bg-[#242424] rounded-full pl-3 pr-4 py-1.5 border border-[#4CAF50]/20">
              <Wallet className="h-4 w-4 text-[#4CAF50] mr-2" />
              <span className="text-gray-300 text-sm">{formatAddress(walletInfo.address)}</span>
            </div>
            <Button 
              variant="outline"
              className="border-[#4CAF50] text-[#4CAF50] hover:bg-[#4CAF50]/10"
              onClick={disconnectUserWallet}
            >
              Disconnect
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Welcome Card */}
        <Card className="bg-[#1a1a1a] border-[#4CAF50]/20 mb-8">
          <CardHeader>
            <CardTitle className="text-white text-2xl">Welcome to Your Dashboard</CardTitle>
            <CardDescription className="text-gray-300">
              Track your recycling rewards and impact on the environment
            </CardDescription>
          </CardHeader>
          <CardContent className="text-gray-300">
            <p>Manage your BINKS rewards, view your recycling history, and track your environmental impact all in one place.</p>
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-[#1a1a1a] border-[#4CAF50]/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-white text-lg flex items-center">
                <Award className="w-5 h-5 text-[#4CAF50] mr-2" />
                Reward Points
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-[#4CAF50]">1,240</p>
              <p className="text-gray-400 text-sm">+120 this week</p>
            </CardContent>
          </Card>
          
          <Card className="bg-[#1a1a1a] border-[#4CAF50]/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-white text-lg flex items-center">
                <Recycle className="w-5 h-5 text-[#4CAF50] mr-2" />
                Waste Recycled
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-[#4CAF50]">24.8 kg</p>
              <p className="text-gray-400 text-sm">+3.2 kg this week</p>
            </CardContent>
          </Card>
          
          <Card className="bg-[#1a1a1a] border-[#4CAF50]/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-white text-lg flex items-center">
                <LineChart className="w-5 h-5 text-[#4CAF50] mr-2" />
                Eco Score
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-[#4CAF50]">85/100</p>
              <p className="text-gray-400 text-sm">Top 15% of users</p>
            </CardContent>
          </Card>
          
          <Card className="bg-[#1a1a1a] border-[#4CAF50]/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-white text-lg flex items-center">
                <Trash2 className="w-5 h-5 text-[#4CAF50] mr-2" />
                Total Deposits
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-[#4CAF50]">32</p>
              <p className="text-gray-400 text-sm">+5 this month</p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity and Rewards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Recent Activity */}
          <Card className="bg-[#1a1a1a] border-[#4CAF50]/20">
            <CardHeader>
              <CardTitle className="text-white">Recent Activity</CardTitle>
              <CardDescription className="text-gray-300">
                Your latest waste disposal records
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { date: '2025-04-08', type: 'Plastic', weight: '1.2 kg', points: 85 },
                { date: '2025-04-06', type: 'Paper', weight: '2.3 kg', points: 65 },
                { date: '2025-04-03', type: 'Glass', weight: '0.8 kg', points: 40 },
                { date: '2025-04-01', type: 'Metal', weight: '0.5 kg', points: 30 }
              ].map((activity, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-[#242424] rounded-lg border border-[#323232]">
                  <div>
                    <p className="text-white font-medium">{activity.type}</p>
                    <p className="text-gray-400 text-sm">{activity.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[#4CAF50] font-medium">+{activity.points} pts</p>
                    <p className="text-gray-400 text-sm">{activity.weight}</p>
                  </div>
                </div>
              ))}
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full border-[#4CAF50] text-[#4CAF50] hover:bg-[#4CAF50]/10">
                View All Activity <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardFooter>
          </Card>

          {/* Available Rewards */}
          <Card className="bg-[#1a1a1a] border-[#4CAF50]/20">
            <CardHeader>
              <CardTitle className="text-white">Available Rewards</CardTitle>
              <CardDescription className="text-gray-300">
                Redeem your points for these rewards
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { name: 'Eco-friendly Water Bottle', points: 500, image: '🍶' },
                { name: 'Local Coffee Shop Voucher', points: 750, image: '☕' },
                { name: 'Public Transport Pass', points: 1000, image: '🚌' },
                { name: 'Plant a Tree Certificate', points: 1200, image: '🌳' }
              ].map((reward, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-[#242424] rounded-lg border border-[#323232]">
                  <div className="flex items-center">
                    <div className="text-2xl mr-3">{reward.image}</div>
                    <p className="text-white font-medium">{reward.name}</p>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="border-[#4CAF50] text-[#4CAF50] hover:bg-[#4CAF50]/10"
                  >
                    {reward.points} pts
                  </Button>
                </div>
              ))}
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full border-[#4CAF50] text-[#4CAF50] hover:bg-[#4CAF50]/10">
                Explore All Rewards <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
