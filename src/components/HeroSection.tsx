
import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  const [initialAnimation, setInitialAnimation] = useState(true);
  const [logoAnimationComplete, setLogoAnimationComplete] = useState(false);
  const [contentVisible, setContentVisible] = useState(false);

  useEffect(() => {
    // Initial pop-up animation
    setTimeout(() => {
      setInitialAnimation(false);
      // Trigger the logo animation after the pop-up
      setTimeout(() => {
        setLogoAnimationComplete(true);
        // Wait for logo animation to complete before showing content
        setTimeout(() => {
          setContentVisible(true);
        }, 500);
      }, 800);
    }, 1000); // Show the pop-up for 1 second
  }, []);

  const handleScrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div id="hero" className="relative bg-[#242424] py-20">
      {/* Initial Pop-up Animation */}
      {initialAnimation && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-[#242424]">
          <div className="w-40 h-40 bg-[#242424] border-2 border-[#4CAF50] rounded-full flex items-center justify-center shadow-lg animate-pop-in">
            <h1 className="text-4xl font-bold text-[#4CAF50]">BINKS</h1>
          </div>
        </div>
      )}

      {/* Hero Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 sm:py-40 lg:py-48 text-center">
        <div 
          className={`mx-auto w-32 h-32 bg-[#242424] border-2 border-[#4CAF50] rounded-full flex items-center justify-center mb-8 shadow-lg transform transition-all duration-1000 ease-in-out ${
            logoAnimationComplete ? 'scale-100' : 'scale-0 translate-y-[-100px]'
          }`}
        >
          <h1 className="text-3xl font-bold text-[#4CAF50]">BINKS</h1>
        </div>
        
        <div className={`transition-opacity duration-1000 ease-in-out ${
          contentVisible ? 'opacity-100' : 'opacity-0'
        }`}>
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
              className="text-lg px-8 py-6 bg-[#4CAF50] hover:bg-[#3e8e41] transition-colors duration-300 text-white w-48 h-auto" 
              size="lg"
              onClick={() => {
                handleScrollToSection('video');
              }}
            >
              How It Works
            </Button>
            <Button 
              className="text-lg px-8 py-6 bg-transparent border-2 border-[#4CAF50] text-[#4CAF50] hover:bg-[#4CAF50]/10 transition-colors duration-300 w-48 h-auto" 
              variant="outline" 
              size="lg"
            >
              Connect Wallet
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
