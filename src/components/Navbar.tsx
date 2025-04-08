
import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleScrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-[#242424] shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <a href="#" onClick={() => handleScrollToSection('hero')} className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-white">BINKS</span>
            </a>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <a 
                href="#" 
                onClick={(e) => { e.preventDefault(); handleScrollToSection('hero'); }} 
                className="text-white border-b-2 border-[#4CAF50] px-1 pt-1 text-sm font-medium transition-colors duration-200 hover:text-[#4CAF50]"
              >
                Home
              </a>
              <a 
                href="#services" 
                onClick={(e) => { e.preventDefault(); handleScrollToSection('services'); }} 
                className="text-gray-300 border-b-2 border-transparent px-1 pt-1 text-sm font-medium transition-colors duration-200 hover:text-[#4CAF50] hover:border-[#4CAF50]"
              >
                Services
              </a>
              <a 
                href="#tokenomics" 
                onClick={(e) => { e.preventDefault(); handleScrollToSection('tokenomics'); }} 
                className="text-gray-300 border-b-2 border-transparent px-1 pt-1 text-sm font-medium transition-colors duration-200 hover:text-[#4CAF50] hover:border-[#4CAF50]"
              >
                Tokenomics
              </a>
              <a 
                href="#gamification" 
                onClick={(e) => { e.preventDefault(); handleScrollToSection('gamification'); }} 
                className="text-gray-300 border-b-2 border-transparent px-1 pt-1 text-sm font-medium transition-colors duration-200 hover:text-[#4CAF50] hover:border-[#4CAF50]"
              >
                Gamification
              </a>
              <a 
                href="#franchise" 
                onClick={(e) => { e.preventDefault(); handleScrollToSection('franchise'); }} 
                className="text-gray-300 border-b-2 border-transparent px-1 pt-1 text-sm font-medium transition-colors duration-200 hover:text-[#4CAF50] hover:border-[#4CAF50]"
              >
                Franchise
              </a>
              <a 
                href="#about" 
                onClick={(e) => { e.preventDefault(); handleScrollToSection('about'); }} 
                className="text-gray-300 border-b-2 border-transparent px-1 pt-1 text-sm font-medium transition-colors duration-200 hover:text-[#4CAF50] hover:border-[#4CAF50]"
              >
                About Us
              </a>
              <a 
                href="#contact" 
                onClick={(e) => { e.preventDefault(); handleScrollToSection('contact'); }} 
                className="text-gray-300 border-b-2 border-transparent px-1 pt-1 text-sm font-medium transition-colors duration-200 hover:text-[#4CAF50] hover:border-[#4CAF50]"
              >
                Contact Us
              </a>
            </div>
          </div>
          
          <div className="-mr-2 flex items-center sm:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#4CAF50]"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1 bg-[#242424]">
            <a 
              href="#" 
              onClick={(e) => { e.preventDefault(); handleScrollToSection('hero'); }} 
              className="text-white border-l-4 border-[#4CAF50] block pl-3 pr-4 py-2 text-base font-medium"
            >
              Home
            </a>
            <a 
              href="#services" 
              onClick={(e) => { e.preventDefault(); handleScrollToSection('services'); }} 
              className="text-gray-300 border-l-4 border-transparent hover:border-[#4CAF50] hover:text-[#4CAF50] block pl-3 pr-4 py-2 text-base font-medium transition-colors duration-200"
            >
              Services
            </a>
            <a 
              href="#tokenomics" 
              onClick={(e) => { e.preventDefault(); handleScrollToSection('tokenomics'); }} 
              className="text-gray-300 border-l-4 border-transparent hover:border-[#4CAF50] hover:text-[#4CAF50] block pl-3 pr-4 py-2 text-base font-medium transition-colors duration-200"
            >
              Tokenomics
            </a>
            <a 
              href="#gamification" 
              onClick={(e) => { e.preventDefault(); handleScrollToSection('gamification'); }} 
              className="text-gray-300 border-l-4 border-transparent hover:border-[#4CAF50] hover:text-[#4CAF50] block pl-3 pr-4 py-2 text-base font-medium transition-colors duration-200"
            >
              Gamification
            </a>
            <a 
              href="#franchise" 
              onClick={(e) => { e.preventDefault(); handleScrollToSection('franchise'); }} 
              className="text-gray-300 border-l-4 border-transparent hover:border-[#4CAF50] hover:text-[#4CAF50] block pl-3 pr-4 py-2 text-base font-medium transition-colors duration-200"
            >
              Franchise
            </a>
            <a 
              href="#about" 
              onClick={(e) => { e.preventDefault(); handleScrollToSection('about'); }} 
              className="text-gray-300 border-l-4 border-transparent hover:border-[#4CAF50] hover:text-[#4CAF50] block pl-3 pr-4 py-2 text-base font-medium transition-colors duration-200"
            >
              About Us
            </a>
            <a 
              href="#contact" 
              onClick={(e) => { e.preventDefault(); handleScrollToSection('contact'); }} 
              className="text-gray-300 border-l-4 border-transparent hover:border-[#4CAF50] hover:text-[#4CAF50] block pl-3 pr-4 py-2 text-base font-medium transition-colors duration-200"
            >
              Contact Us
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
