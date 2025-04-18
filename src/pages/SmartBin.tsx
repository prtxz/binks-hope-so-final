
import React, { useState } from 'react';
import { Camera, Loader2, Wallet, Award, ChevronRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useToast } from "@/components/ui/use-toast";

// Mock data - replace with real data from Supabase later
const mockUser = {
  address: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
  totalDisposals: 32,
  totalRewards: 1240,
  name: "User",
};

const SmartBin = () => {
  const [identifying, setIdentifying] = useState(false);
  const [wasteInfo, setWasteInfo] = useState<any>(null);
  const [processing, setProcessing] = useState(false);
  const { toast } = useToast();

  const identifyWaste = async () => {
    setIdentifying(true);
    // Simulate API call
    setTimeout(() => {
      setWasteInfo({
        type: "Plastic",
        weight: 0.34,
        category: "Recyclable"
      });
      setIdentifying(false);
    }, 2000);
  };

  const handleDispose = async () => {
    if (!wasteInfo) return;
    
    setProcessing(true);
    // Simulate blockchain transaction
    setTimeout(() => {
      toast({
        title: "Success!",
        description: "You earned 25 BINK tokens for your disposal!",
      });
      setProcessing(false);
      setWasteInfo(null);
    }, 2000);
  };

  return (
    <div className="container mx-auto p-6">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Left Column - Main Interaction Area (3 columns wide) */}
        <div className="lg:col-span-3 space-y-6">
          <Card className="bg-[#242424] border-[#4CAF50]/20">
            <CardHeader>
              <CardTitle className="text-white">Smart Bin Camera</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-[#1a1a1a] rounded-lg flex items-center justify-center border border-[#4CAF50]/20">
                <div className="text-center">
                  <Camera className="h-16 w-16 text-[#4CAF50] mx-auto mb-4" />
                  <p className="text-gray-400">Simulated Live Feed</p>
                </div>
              </div>
              
              <div className="mt-6 space-y-6">
                <Button 
                  className="w-full bg-[#4CAF50] hover:bg-[#45a049] text-white"
                  onClick={identifyWaste}
                  disabled={identifying}
                >
                  {identifying ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Identifying Waste...
                    </>
                  ) : (
                    'Identify Waste'
                  )}
                </Button>

                {wasteInfo && (
                  <Card className="bg-[#1a1a1a] border-[#4CAF50]/20">
                    <CardHeader>
                      <CardTitle className="text-white text-lg">Identified Waste Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Waste Type:</span>
                        <Badge variant="outline" className="bg-[#4CAF50]/10 text-[#4CAF50] border-[#4CAF50]/20">
                          {wasteInfo.type}
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Estimated Weight:</span>
                        <span className="text-white font-mono">{wasteInfo.weight} kg</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Category:</span>
                        <Badge variant="outline" className="bg-[#4CAF50]/10 text-[#4CAF50] border-[#4CAF50]/20">
                          {wasteInfo.category}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - User & Disposal Details (2 columns wide) */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-[#242424] border-[#4CAF50]/20">
            <CardHeader>
              <CardTitle className="text-white">User Profile</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-4">
                <Avatar className="h-16 w-16 border-2 border-[#4CAF50]">
                  <AvatarFallback className="bg-[#4CAF50]/20 text-[#4CAF50] text-xl">
                    {mockUser.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm text-gray-400">Wallet Address</p>
                  <p className="text-white font-mono text-sm">
                    {mockUser.address.slice(0, 6)}...{mockUser.address.slice(-4)}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#1a1a1a] p-4 rounded-lg border border-[#4CAF50]/20">
                  <p className="text-gray-400 text-sm">Total Disposals</p>
                  <p className="text-2xl font-bold text-white">{mockUser.totalDisposals}</p>
                </div>
                <div className="bg-[#1a1a1a] p-4 rounded-lg border border-[#4CAF50]/20">
                  <p className="text-gray-400 text-sm">BINK Tokens</p>
                  <p className="text-2xl font-bold text-[#4CAF50]">{mockUser.totalRewards}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#242424] border-[#4CAF50]/20">
            <CardHeader>
              <CardTitle className="text-white">Disposal Action</CardTitle>
            </CardHeader>
            <CardContent>
              <Button
                className="w-full bg-[#4CAF50] hover:bg-[#45a049] text-white"
                onClick={handleDispose}
                disabled={!wasteInfo || processing}
              >
                {processing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    Dispose & Reward Me
                    <Award className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
              
              {!wasteInfo && (
                <p className="text-sm text-gray-400 text-center mt-4">
                  Identify waste first to enable disposal
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SmartBin;
