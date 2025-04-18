
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWallet } from "@/context/WalletContext";
import { formatAddress } from "@/utils/wallet";
import { BarChart, Calendar, ChevronDown, CircleUser, Github, Home, LineChart, LogOut, Plus, Recycle, Settings, Trash2, Trophy, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from "@/components/ui/chart";
import { BarChart as RechartsBarChart, XAxis, YAxis, Bar, ResponsiveContainer, Tooltip, CartesianGrid } from 'recharts';

// Sample chart data
const weeklyDisposalData = [
  { day: 'Mon', amount: 1.5 },
  { day: 'Tue', amount: 2.3 },
  { day: 'Wed', amount: 0.8 },
  { day: 'Thu', amount: 1.1 },
  { day: 'Fri', amount: 1.9 },
  { day: 'Sat', amount: 0.6 },
  { day: 'Sun', amount: 0.4 },
];

const Dashboard = () => {
  const { walletInfo, isConnected, disconnectUserWallet } = useWallet();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard");
  const userName = walletInfo?.name || "User";
  const userInitials = userName.charAt(0).toUpperCase();

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
    <div className="min-h-screen bg-[#1a1a1a]">
      {/* Top Navigation Bar */}
      <header className="bg-[#242424] border-b border-[#4CAF50]/20 px-4 py-3 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <div className="w-10 h-10 bg-[#323232] border-2 border-[#4CAF50] rounded-full flex items-center justify-center mr-3">
              <h1 className="text-sm font-bold text-[#4CAF50]">BINKS</h1>
            </div>
            <h2 className="text-xl font-bold text-white hidden sm:block">Smart Bin</h2>
          </div>

          {/* Tabs - Center */}
          <div className="hidden md:flex">
            <TabsList className="bg-[#2a2a2a] border border-[#4CAF50]/20">
              <TabsTrigger 
                value="dashboard"
                className="data-[state=active]:bg-[#4CAF50]/20 data-[state=active]:text-[#4CAF50]"
                onClick={() => setActiveTab("dashboard")}
              >
                <Home className="w-4 h-4 mr-2" />
                Dashboard
              </TabsTrigger>
              <TabsTrigger 
                value="initiatives"
                className="data-[state=active]:bg-[#4CAF50]/20 data-[state=active]:text-[#4CAF50]"
                onClick={() => setActiveTab("initiatives")}
              >
                <Trophy className="w-4 h-4 mr-2" />
                Initiatives
              </TabsTrigger>
              <TabsTrigger 
                value="activity"
                className="data-[state=active]:bg-[#4CAF50]/20 data-[state=active]:text-[#4CAF50]"
                onClick={() => setActiveTab("activity")}
              >
                <Calendar className="w-4 h-4 mr-2" />
                Activity
              </TabsTrigger>
              <TabsTrigger 
                value="tokenomics"
                className="data-[state=active]:bg-[#4CAF50]/20 data-[state=active]:text-[#4CAF50]"
                onClick={() => setActiveTab("tokenomics")}
              >
                <BarChart className="w-4 h-4 mr-2" />
                Tokenomics
              </TabsTrigger>
            </TabsList>
          </div>

          {/* User Profile - Right */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center bg-[#2a2a2a] rounded-full pl-3 pr-1 py-1.5 border border-[#4CAF50]/20">
              <Wallet className="h-4 w-4 text-[#4CAF50] mr-2" />
              <span className="text-gray-300 text-sm mr-2 hidden sm:inline">{formatAddress(walletInfo.address)}</span>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full h-8 w-8 p-0 bg-[#323232] hover:bg-[#4CAF50]/20">
                    <Avatar className="h-8 w-8 border border-[#4CAF50]/30">
                      <AvatarFallback className="bg-[#4CAF50]/20 text-[#4CAF50]">{userInitials}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-[#2a2a2a] border-[#4CAF50]/20">
                  <div className="px-4 py-2 text-center">
                    <p className="text-white font-medium">{userName}</p>
                    <p className="text-gray-400 text-sm">{formatAddress(walletInfo.address)}</p>
                  </div>
                  <DropdownMenuSeparator className="bg-[#4CAF50]/10" />
                  <DropdownMenuItem className="cursor-pointer hover:bg-[#4CAF50]/10 hover:text-[#4CAF50]">
                    <Trash2 className="mr-2 h-4 w-4" />
                    <span>Total Disposals: 32</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer hover:bg-[#4CAF50]/10 hover:text-[#4CAF50]">
                    <Trophy className="mr-2 h-4 w-4" />
                    <span>Total Rewards: 1,240</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-[#4CAF50]/10" />
                  <DropdownMenuItem className="cursor-pointer hover:bg-[#4CAF50]/10 hover:text-[#4CAF50]">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={disconnectUserWallet} className="cursor-pointer hover:bg-[#4CAF50]/10 hover:text-[#4CAF50]">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Tabs defaultValue="dashboard" value={activeTab} className="w-full">
          {/* Mobile Tabs (shown only on mobile) */}
          <div className="md:hidden mb-4">
            <TabsList className="w-full bg-[#2a2a2a] border border-[#4CAF50]/20 grid grid-cols-4">
              <TabsTrigger 
                value="dashboard"
                className="data-[state=active]:bg-[#4CAF50]/20 data-[state=active]:text-[#4CAF50]"
                onClick={() => setActiveTab("dashboard")}
              >
                <Home className="w-4 h-4" />
              </TabsTrigger>
              <TabsTrigger 
                value="initiatives"
                className="data-[state=active]:bg-[#4CAF50]/20 data-[state=active]:text-[#4CAF50]"
                onClick={() => setActiveTab("initiatives")}
              >
                <Trophy className="w-4 h-4" />
              </TabsTrigger>
              <TabsTrigger 
                value="activity"
                className="data-[state=active]:bg-[#4CAF50]/20 data-[state=active]:text-[#4CAF50]"
                onClick={() => setActiveTab("activity")}
              >
                <Calendar className="w-4 h-4" />
              </TabsTrigger>
              <TabsTrigger 
                value="tokenomics"
                className="data-[state=active]:bg-[#4CAF50]/20 data-[state=active]:text-[#4CAF50]"
                onClick={() => setActiveTab("tokenomics")}
              >
                <BarChart className="w-4 h-4" />
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Dashboard Tab Content */}
          <TabsContent value="dashboard" className="space-y-6">
            {/* Welcome Banner */}
            <Card className="bg-gradient-to-r from-[#1a1a1a] to-[#2a2a2a] border-[#4CAF50]/20">
              <CardHeader>
                <CardTitle className="text-2xl text-white">Welcome back, {userName}!</CardTitle>
                <CardDescription className="text-gray-300">
                  Track your recycling impact and rewards in one place
                </CardDescription>
              </CardHeader>
              <CardContent className="text-gray-300">
                <p>Your overall eco score is <span className="text-[#4CAF50] font-bold">85/100</span>, placing you in the top 15% of all users.</p>
              </CardContent>
            </Card>

            {/* Stats Panel */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="bg-[#242424] border-[#4CAF50]/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-white text-lg flex items-center">
                    <Trash2 className="w-5 h-5 text-[#4CAF50] mr-2" />
                    Total Waste
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-[#4CAF50]">24.8 kg</p>
                  <p className="text-gray-400 text-sm">+3.2 kg this week</p>
                </CardContent>
              </Card>
              
              <Card className="bg-[#242424] border-[#4CAF50]/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-white text-lg flex items-center">
                    <Trophy className="w-5 h-5 text-[#4CAF50] mr-2" />
                    BINK Tokens
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-[#4CAF50]">1,240</p>
                  <p className="text-gray-400 text-sm">+120 this week</p>
                </CardContent>
              </Card>
              
              <Card className="bg-[#242424] border-[#4CAF50]/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-white text-lg flex items-center">
                    <LineChart className="w-5 h-5 text-[#4CAF50] mr-2" />
                    Recycling Score
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-[#4CAF50]">85/100</p>
                  <p className="text-gray-400 text-sm">Top 15% of users</p>
                </CardContent>
              </Card>
              
              <Card className="bg-[#242424] border-[#4CAF50]/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-white text-lg flex items-center">
                    <Calendar className="w-5 h-5 text-[#4CAF50] mr-2" />
                    Last Disposal
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xl font-bold text-[#4CAF50]">2 days ago</p>
                  <p className="text-gray-400 text-sm">Apr 16, 2025 - 3:45 PM</p>
                </CardContent>
              </Card>
            </div>

            {/* Chart Section */}
            <Card className="bg-[#242424] border-[#4CAF50]/20">
              <CardHeader>
                <CardTitle className="text-white">Weekly Disposals</CardTitle>
                <CardDescription className="text-gray-300">
                  Your waste disposal activity for the past week
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full">
                  <ChartContainer
                    config={{
                      disposals: {
                        label: "Disposals",
                        color: "#4CAF50"
                      }
                    }}
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsBarChart data={weeklyDisposalData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                        <CartesianGrid stroke="#333" strokeDasharray="3 3" />
                        <XAxis dataKey="day" stroke="#888" />
                        <YAxis stroke="#888" />
                        <Tooltip content={<CustomTooltip />} />
                        <Bar dataKey="amount" name="disposals" fill="#4CAF50" radius={[4, 4, 0, 0]} />
                      </RechartsBarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions Panel */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Button 
                className="bg-[#4CAF50] hover:bg-[#45a049] text-white h-14 shadow-lg shadow-[#4CAF50]/20"
                onClick={() => navigate('/dispose')}
              >
                <Recycle className="mr-2 h-5 w-5" />
                Dispose Now
              </Button>
              <Button 
                variant="outline" 
                className="border-[#4CAF50] text-[#4CAF50] hover:bg-[#4CAF50]/10 h-14"
                onClick={() => setActiveTab("initiatives")}
              >
                <Plus className="mr-2 h-5 w-5" />
                Create Initiative
              </Button>
            </div>
          </TabsContent>

          {/* Initiatives Tab Placeholder */}
          <TabsContent value="initiatives">
            <Card className="bg-[#242424] border-[#4CAF50]/20">
              <CardHeader>
                <CardTitle className="text-white">Initiatives</CardTitle>
                <CardDescription className="text-gray-300">
                  Start or join community recycling initiatives
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center py-12">
                <Trophy className="w-16 h-16 text-[#4CAF50]/30 mx-auto mb-4" />
                <h3 className="text-white text-xl font-bold mb-2">No Active Initiatives</h3>
                <p className="text-gray-400 mb-6">Create or join a community recycling initiative</p>
                <Button className="bg-[#4CAF50] hover:bg-[#45a049] text-white">
                  <Plus className="mr-2 h-5 w-5" />
                  Create Initiative
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Activity Tab Placeholder */}
          <TabsContent value="activity">
            <Card className="bg-[#242424] border-[#4CAF50]/20">
              <CardHeader>
                <CardTitle className="text-white">Recent Activity</CardTitle>
                <CardDescription className="text-gray-300">
                  Your latest waste disposal records
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { date: '2025-04-16', type: 'Recyclable', weight: '1.2 kg', points: 85 },
                  { date: '2025-04-14', type: 'Recyclable', weight: '2.3 kg', points: 65 },
                  { date: '2025-04-10', type: 'Non-Recyclable', weight: '0.8 kg', points: 20 },
                  { date: '2025-04-07', type: 'Recyclable', weight: '0.5 kg', points: 30 }
                ].map((activity, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-[#2a2a2a] rounded-lg border border-[#323232]">
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
                  View All Activity
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Tokenomics Tab Placeholder */}
          <TabsContent value="tokenomics">
            <Card className="bg-[#242424] border-[#4CAF50]/20">
              <CardHeader>
                <CardTitle className="text-white">Tokenomics</CardTitle>
                <CardDescription className="text-gray-300">
                  BINK token statistics and rewards
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center py-12">
                <BarChart className="w-16 h-16 text-[#4CAF50]/30 mx-auto mb-4" />
                <h3 className="text-white text-xl font-bold mb-2">Token Dashboard Coming Soon</h3>
                <p className="text-gray-400 mb-6">Track your rewards and token performance</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Footer */}
      <footer className="bg-[#242424] border-t border-[#4CAF50]/20 py-6 mt-auto">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
          <div className="text-gray-400 mb-4 md:mb-0">
            BINKS Smart Bin © 2025. All rights reserved.
          </div>
          <div className="flex space-x-4">
            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-[#4CAF50]">
              <Github className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Custom tooltip for the chart
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#2a2a2a] border border-[#4CAF50]/20 p-2 rounded shadow-lg">
        <p className="text-white">{`${payload[0].payload.day}: ${payload[0].value} kg`}</p>
      </div>
    );
  }
  return null;
};

export default Dashboard;
