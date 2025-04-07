
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
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 sm:py-48 lg:py-56 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
          <span className="block">Discover the world through</span>
          <span className="block text-blue-400">beautiful imagery</span>
        </h1>
        <p className="mt-6 max-w-lg mx-auto text-xl text-gray-300">
          Explore our curated collection of high-quality photographs for inspiration and creative projects.
        </p>
        <div className="mt-10 max-w-xl mx-auto">
          <div className="flex items-center bg-white rounded-full shadow-lg overflow-hidden p-1">
            <Search className="h-5 w-5 text-gray-400 ml-3 flex-shrink-0" />
            <input
              type="text"
              placeholder="Search for photos, collections, or themes..."
              className="w-full px-4 py-2 focus:outline-none text-gray-800 placeholder-gray-400"
            />
            <Button className="flex-shrink-0 rounded-full">
              Search
            </Button>
          </div>
          <div className="mt-4 text-white text-sm">
            <span>Popular: </span>
            {["Workspace", "Technology", "Lifestyle", "Nature", "Design"].map((tag) => (
              <a 
                key={tag} 
                href="#" 
                className="inline-block mx-1 hover:text-blue-400 transition"
              >
                {tag}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
