
import React from 'react';
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <div className="relative bg-[#1a1a1a] py-20">
      {/* Hero Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 sm:py-40 lg:py-48 text-center">
        <div className="mx-auto w-32 h-32 bg-[#1a1a1a] border-2 border-[#4CAF50] rounded-full flex items-center justify-center mb-8 shadow-lg">
          <h1 className="text-3xl font-bold text-[#4CAF50]">BINKS</h1>
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
          <span className="block">The Smart Dustbin</span>
          <span className="block text-[#4CAF50]">That Rewards You</span>
        </h1>
        <p className="mt-6 max-w-lg mx-auto text-xl text-gray-300">
          Meet BINKS – the smart dustbin that rewards you for responsible waste disposal! 
          Our ML-powered system weighs, identifies, and sorts trash while you earn rewards 
          based on our tokenomics. Turn waste into value and join the recycling revolution today!
        </p>
        <div className="mt-10 flex justify-center gap-4">
          <Button 
            className="text-lg px-8 py-6 bg-[#4CAF50] hover:bg-[#3e8e41] transition-colors duration-300 text-white w-48" 
            size="lg"
            onClick={() => {
              document.getElementById('video')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            How It Works
          </Button>
          <Button 
            className="text-lg px-8 py-6 bg-transparent border-2 border-[#4CAF50] text-[#4CAF50] hover:bg-[#4CAF50]/10 transition-colors duration-300 w-48" 
            variant="outline" 
            size="lg"
          >
            Connect Wallet
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
