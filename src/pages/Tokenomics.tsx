import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Coins, Leaf, BadgeDollarSign, Link as LinkIcon, Info } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useWallet } from "@/context/WalletContext";
import { connectMetaMask } from "@/utils/wallet";

const Tokenomics = () => {
  const navigate = useNavigate();
  const { walletInfo, connectWallet } = useWallet();
  const [isVisible, setIsVisible] = useState<{[key: string]: boolean}>({
    hero: false,
    formula: false,
    distribution: false,
    utility: false,
    contract: false,
    cta: false
  });

  // Observer for scroll animations
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.2,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(prev => ({ ...prev, [entry.target.id]: true }));
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    const sections = document.querySelectorAll('.animate-on-scroll');
    sections.forEach(section => observer.observe(section));
    
    return () => {
      sections.forEach(section => observer.unobserve(section));
    };
  }, []);

  // Material multipliers data for the table
  const materials = [
    { name: 'Plastic', multiplier: '0.8x', tooltip: 'Common but harmful to the environment. Moderate rewards to encourage recycling.' },
    { name: 'Paper', multiplier: '0.6x', tooltip: 'Easily recycled and biodegradable. Lower rewards due to abundance and lower environmental impact.' },
    { name: 'Glass', multiplier: '1.2x', tooltip: 'Infinitely recyclable with significant energy savings. Higher rewards to promote reuse.' },
    { name: 'Metal', multiplier: '1.5x', tooltip: 'Valuable and energy-intensive to produce. Higher rewards due to high recycling value.' },
    { name: 'Organic', multiplier: '0.4x', tooltip: 'Naturally biodegradable. Lower rewards but important for composting initiatives.' },
    { name: 'E-waste', multiplier: '3.0x', tooltip: 'Contains rare metals and hazardous materials. Highest rewards due to environmental impact and recovery value.' },
  ];

  // Token distribution data for pie chart
  const distributionData = [
    { name: 'User Rewards', value: 40, color: '#4CAF50' },
    { name: 'Ecosystem & Partnerships', value: 25, color: '#81C784' },
    { name: 'Dev & Ops', value: 15, color: '#66BB6A' },
    { name: 'Treasury', value: 10, color: '#A5D6A7' },
    { name: 'Marketing & Grants', value: 10, color: '#C8E6C9' },
  ];

  // Token utility data
  const utilityCards = [
    {
      title: 'Redeem for Vouchers',
      description: 'Convert your BINK tokens into vouchers for eco-friendly products and services from our partners.',
      icon: Coins
    },
    {
      title: 'Stake for Initiatives',
      description: 'Stake your tokens to support environmental initiatives and earn additional rewards.',
      icon: Leaf
    },
    {
      title: 'Earn NFT Badges',
      description: 'Collect NFT badges that showcase your environmental contributions and grant special privileges.',
      icon: BadgeDollarSign
    }
  ];

  // Handle wallet connection for the contract section
  const handleConnectWallet = () => {
    // If wallet is already connected, navigate to rewards
    if (walletInfo) {
      navigate('/rewards');
    } else {
      // Otherwise, connect wallet using MetaMask implementation
      connectWallet(connectMetaMask);
    }
  };

  return (
    <div className="min-h-screen bg-[#1a1a1a] pb-12">
      {/* Hero Section */}
      <section 
        id="hero" 
        className={`animate-on-scroll px-6 py-16 md:py-24 transition-all duration-1000 ease-out transform ${
          isVisible.hero ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-5xl mx-auto text-center">
          <div className="mb-6 flex justify-center">
            <div className="relative w-20 h-20 md:w-24 md:h-24 bg-[#242424] rounded-full flex items-center justify-center border border-[#4CAF50]/30 shadow-[0_0_15px_rgba(76,175,80,0.25)]">
              <Coins className="w-10 h-10 md:w-12 md:h-12 text-[#4CAF50]" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Tokenomics</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">The economics behind your green rewards.</p>
        </div>
      </section>

      {/* Reward Formula Card */}
      <section 
        id="formula" 
        className={`animate-on-scroll px-6 mb-16 transition-all duration-1000 ease-out delay-100 transform ${
          isVisible.formula ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <Card className="max-w-5xl mx-auto bg-[#242424] border-[#4CAF50]/20 shadow-lg overflow-hidden">
          <CardHeader>
            <CardTitle className="text-2xl text-white">How Rewards Are Calculated</CardTitle>
            <CardDescription className="text-gray-400">Understanding the BINK token earning formula</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="p-4 bg-[#1a1a1a] rounded-lg border border-[#4CAF50]/10 mb-6">
              <p className="text-center text-lg font-mono text-[#4CAF50] md:text-xl">
                Reward = BaseRate × MaterialMultiplier × Weight × EnvironmentalFactor
              </p>
            </div>
            
            <h3 className="text-white font-medium mb-4">Material Multipliers</h3>
            
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Material</TableHead>
                    <TableHead>Multiplier</TableHead>
                    <TableHead className="text-right">Why?</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {materials.map((material) => (
                    <TableRow key={material.name}>
                      <TableCell className="font-medium">{material.name}</TableCell>
                      <TableCell className="text-[#4CAF50] font-mono">{material.multiplier}</TableCell>
                      <TableCell className="text-right">
                        <HoverCard>
                          <HoverCardTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Info className="h-4 w-4" />
                              <span className="sr-only">Why this multiplier?</span>
                            </Button>
                          </HoverCardTrigger>
                          <HoverCardContent className="w-80 bg-[#323232] border-[#4CAF50]/20">
                            <p className="text-sm text-gray-300">{material.tooltip}</p>
                          </HoverCardContent>
                        </HoverCard>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Token Distribution Pie Chart */}
      <section 
        id="distribution" 
        className={`animate-on-scroll px-6 mb-16 transition-all duration-1000 ease-out delay-200 transform ${
          isVisible.distribution ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <Card className="max-w-5xl mx-auto bg-[#242424] border-[#4CAF50]/20 shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl text-white">Token Distribution</CardTitle>
            <CardDescription className="text-gray-400">How BINK tokens are allocated in the ecosystem</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[400px] w-full">
              <ChartContainer
                config={{
                  ...distributionData.reduce((acc, item) => ({ 
                    ...acc, 
                    [item.name]: { theme: { dark: item.color } } 
                  }), {})
                }}
                className="w-full"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={distributionData}
                      cx="50%"
                      cy="50%"
                      outerRadius={120}
                      innerRadius={60}
                      paddingAngle={4}
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}%`}
                    >
                      {distributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <ChartTooltip 
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload;
                          return (
                            <div className="bg-[#323232] border border-[#4CAF50]/20 p-3 rounded-lg shadow-lg">
                              <p className="text-white font-medium">{data.name}</p>
                              <p className="text-[#4CAF50]">{data.value}%</p>
                            </div>
                          );
                        }
                        return null;
                      }} 
                    />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Token Utility Cards */}
      <section 
        id="utility" 
        className={`animate-on-scroll px-6 mb-16 transition-all duration-1000 ease-out delay-300 transform ${
          isVisible.utility ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">Token Utility</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {utilityCards.map((card, index) => (
              <Card 
                key={index} 
                className="bg-[#242424] border-[#4CAF50]/20 shadow-lg hover:shadow-[0_0_15px_rgba(76,175,80,0.2)] transition-all duration-300"
              >
                <CardHeader>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-[#1a1a1a] rounded-md flex items-center justify-center mr-4 border border-[#4CAF50]/20">
                      <card.icon className="w-6 h-6 text-[#4CAF50]" />
                    </div>
                    <CardTitle className="text-xl text-white">{card.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="text-gray-300 text-sm">
                  <p>{card.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Smart Contract Section */}
      <section 
        id="contract" 
        className={`animate-on-scroll px-6 mb-16 transition-all duration-1000 ease-out delay-400 transform ${
          isVisible.contract ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <Card className="max-w-3xl mx-auto bg-[#242424] border-[#4CAF50]/20 shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl text-white">Verified Smart Contract</CardTitle>
            <CardDescription className="text-gray-400">View the BINK token contract on the blockchain</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row items-center justify-between p-4 bg-[#1a1a1a] rounded-lg border border-[#4CAF50]/10">
              <div className="flex items-center mb-4 md:mb-0">
                <span className="text-gray-400 mr-2">Contract:</span>
                <span className="text-[#4CAF50] font-mono">0x7cF...8A21</span>
              </div>
              <a 
                href="https://etherscan.io" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center text-[#4CAF50] hover:text-[#66BB6A] transition-colors"
              >
                <span className="mr-2">View on Chain Explorer</span>
                <LinkIcon className="w-4 h-4" />
              </a>
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              onClick={handleConnectWallet} 
              className="w-full bg-[#4CAF50] hover:bg-[#66BB6A] text-white"
            >
              {walletInfo ? "View Your Rewards" : "Connect Wallet to View Rewards"}
            </Button>
          </CardFooter>
        </Card>
      </section>

      {/* CTA Footer */}
      <section 
        id="cta" 
        className={`animate-on-scroll px-6 transition-all duration-1000 ease-out delay-500 transform ${
          isVisible.cta ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => navigate('/initiatives')} 
              className="bg-[#323232] hover:bg-[#4CAF50] text-white border border-[#4CAF50]/30 transition-colors"
            >
              Join an Initiative
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button 
              onClick={() => navigate('/rewards')} 
              className="bg-[#323232] hover:bg-[#4CAF50] text-white border border-[#4CAF50]/30 transition-colors"
            >
              See Your Rewards
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Tokenomics;
