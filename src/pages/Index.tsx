
import { useState } from "react";
import HeroSection from "@/components/HeroSection";
import PhotoGrid from "@/components/PhotoGrid";
import Navbar from "@/components/Navbar";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const { toast } = useToast();
  const [activeFilter, setActiveFilter] = useState("all");

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
    toast({
      title: `Filtered to ${filter}`,
      description: "Showing photos from this category",
      duration: 2000,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Navbar />
      <HeroSection />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Explore Our Collection</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Browse through our carefully curated selection of stunning photography and find inspiration for your next project.
          </p>
          
          <div className="flex flex-wrap justify-center gap-2 mt-6">
            {["all", "workspace", "technology", "lifestyle", "design"].map((filter) => (
              <button
                key={filter}
                onClick={() => handleFilterChange(filter)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeFilter === filter
                    ? "bg-gray-900 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
              </button>
            ))}
          </div>
        </div>
        
        <PhotoGrid activeFilter={activeFilter} />
      </div>
      
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Binks Blend</h3>
              <p className="text-gray-400">
                Curating beautiful imagery for your creative inspiration.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition">Home</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">About</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Gallery</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Subscribe</h3>
              <p className="text-gray-400 mb-4">
                Get the latest updates from our collection.
              </p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="px-4 py-2 rounded-l-md text-gray-900 w-full"
                />
                <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-r-md transition">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>© 2025 Binks Blend. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
