
import React, { useState } from 'react';
import { Menu, X, Search, User, Heart } from 'lucide-react';
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <a href="/" className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-gray-900">Binks Blend</span>
            </a>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <a href="#" className="border-b-2 border-gray-900 text-gray-900 inline-flex items-center px-1 pt-1 text-sm font-medium">
                Home
              </a>
              <a href="#" className="border-b-2 border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 text-sm font-medium">
                Gallery
              </a>
              <a href="#" className="border-b-2 border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 text-sm font-medium">
                Collections
              </a>
              <a href="#" className="border-b-2 border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 text-sm font-medium">
                About
              </a>
            </div>
          </div>
          <div className="hidden sm:flex sm:items-center sm:space-x-2">
            <Button variant="ghost" size="icon">
              <Search className="h-5 w-5 text-gray-500" />
            </Button>
            <Button variant="ghost" size="icon">
              <Heart className="h-5 w-5 text-gray-500" />
            </Button>
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5 text-gray-500" />
            </Button>
            <Button className="ml-2">
              Upload
            </Button>
          </div>
          <div className="-mr-2 flex items-center sm:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
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
          <div className="pt-2 pb-3 space-y-1">
            <a href="#" className="bg-gray-50 border-l-4 border-gray-900 text-gray-900 block pl-3 pr-4 py-2 text-base font-medium">
              Home
            </a>
            <a href="#" className="border-l-4 border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 text-base font-medium">
              Gallery
            </a>
            <a href="#" className="border-l-4 border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 text-base font-medium">
              Collections
            </a>
            <a href="#" className="border-l-4 border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 text-base font-medium">
              About
            </a>
            <div className="flex space-x-2 pl-3 pr-4 py-2">
              <Button variant="ghost" size="sm">
                <Search className="h-5 w-5 mr-2" />
                Search
              </Button>
              <Button size="sm">
                Upload
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
