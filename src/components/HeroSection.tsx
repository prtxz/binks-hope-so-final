
import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";

const HeroSection = () => {
  const [initialAnimation, setInitialAnimation] = useState(true);
  const [logoAnimationComplete, setLogoAnimationComplete] = useState(false);
  const [contentVisible, setContentVisible] = useState(false);
  const [navbarVisible, setNavbarVisible] = useState(false);

  useEffect(() => {
    // Initial pop-up animation
    setTimeout(() => {
      setInitialAnimation(false);
      // After the pop-up animation completes, immediately set the logo as visible
      // This creates a seamless transition from pop-up to permanent position
      setLogoAnimationComplete(true);
      
      // Show navbar coming from top
      setTimeout(() => {
        setNavbarVisible(true);
        
        // Wait a short time before showing content sliding from bottom
        setTimeout(() => {
          setContentVisible(true);
        }, 300);
      }, 300);
    }, 1000); // Show the pop-up for 1 second
  }, []);

  const handleScrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div id="hero" className="relative bg-[#2b2b2b] py-12">
      {/* Initial Pop-up Animation */}
      {initialAnimation && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-[#2b2b2b]">
          <div className="w-40 h-40 bg-[#2b2b2b] border-2 border-[#4CAF50] rounded-full flex items-center justify-center shadow-lg animate-pop-in">
            <h1 className="text-4xl font-bold text-[#4CAF50]">BINKS</h1>
          </div>
        </div>
      )}

      {/* Hero Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 text-center">
        {/* This logo is now displayed immediately after the pop-up disappears */}
        <div 
          className={`mx-auto w-32 h-32 bg-[#2b2b2b] border-2 border-[#4CAF50] rounded-full flex items-center justify-center mb-6 shadow-lg transition-opacity duration-300 ${
            initialAnimation ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <h1 className="text-3xl font-bold text-[#4CAF50]">BINKS</h1>
        </div>
        
        <div className={`transition-all duration-700 ease-in-out transform ${
          contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
        }`}>
          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl">
            <span className="block">The Smart Dustbin</span>
            <span className="block text-[#4CAF50]">That Rewards You</span>
          </h1>
          <p className="mt-4 max-w-lg mx-auto text-lg text-gray-300">
            Meet BINKS – the smart dustbin that rewards you for responsible waste disposal! 
            Our ML-powered system weighs, identifies, and sorts trash while you earn rewards 
            based on our tokenomics. Turn waste into value and join the recycling revolution today!
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Button 
              className="text-sm px-4 py-2 bg-[#4CAF50] hover:bg-[#3e8e41] transition-colors duration-300 text-white rounded-full shadow-md" 
              size="sm"
              onClick={() => {
                handleScrollToSection('video');
              }}
            >
              How It Works
            </Button>
            <Button 
              className="text-sm px-4 py-2 bg-transparent border-2 border-[#4CAF50] text-[#4CAF50] hover:bg-[#4CAF50]/10 transition-colors duration-300 rounded-full shadow-md" 
              variant="outline" 
              size="sm"
            >
              Connect Wallet
            </Button>
          </div>
        </div>
      </div>

      {/* Chatbot Button - Fixed at bottom right */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button 
          className="w-16 h-16 rounded-full bg-[#4CAF50] hover:bg-[#3e8e41] transition-all duration-300 shadow-lg flex items-center justify-center group"
          onClick={() => {
            // This will be implemented later when the chatbot page is created
            console.log("Chatbot button clicked");
          }}
        >
          <MessageCircle className="h-8 w-8 text-white group-hover:scale-110 transition-transform duration-300" />
          <span className="sr-only">Open Chatbot</span>
        </Button>
      </div>
    </div>
  );
};

export default HeroSection;
