
import React from 'react';
import { Button } from "@/components/ui/button";
import { Search } from 'lucide-react';

const HeroSection = () => {
  return (
    <div className="relative">
      {/* Hero Image */}
      <div className="absolute inset-0 overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b" 
          alt="Hero background" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30"></div>
      </div>
      
      {/* Hero Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 sm:py-40 lg:py-48 text-center">
        <div className="mx-auto w-32 h-32 bg-white rounded-full flex items-center justify-center mb-8 shadow-lg">
          <h1 className="text-3xl font-bold text-blue-600">BINKS</h1>
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
          <span className="block">The Smart Dustbin</span>
          <span className="block text-blue-400">That Rewards You</span>
        </h1>
        <p className="mt-6 max-w-lg mx-auto text-xl text-gray-300">
          Meet BINKS – the smart dustbin that rewards you for responsible waste disposal! 
          Our ML-powered system weighs, identifies, and sorts trash while you earn rewards 
          based on our tokenomics. Turn waste into value and join the recycling revolution today!
        </p>
        <div className="mt-10 flex justify-center gap-4">
          <Button className="text-lg px-8 py-6" size="lg">
            Learn More
          </Button>
          <Button className="text-lg px-8 py-6" variant="outline" size="lg">
            Contact Us
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
