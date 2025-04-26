import React, { useState } from 'react';
import Navbar from '@/components/Navbar'; // Assuming you have a Navbar component
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Coins, ShoppingCart, Leaf } from 'lucide-react';

// Placeholder data for products
const products = [
  { id: 1, name: 'BINKS Eco Tote Bag', description: 'Durable tote bag made from recycled materials.', price: 150, image: '/images/merch/tote-bag.png', category: 'merch', ecoFriendly: true },
  { id: 2, name: 'BINKS Reusable Water Bottle', description: 'Stainless steel bottle to keep you hydrated.', price: 250, image: '/images/merch/water-bottle.png', category: 'merch', ecoFriendly: true },
  { id: 3, name: 'Organic Cotton T-Shirt', description: 'Soft, breathable tee made with 100% organic cotton.', price: 300, image: '/images/eco/t-shirt.png', category: 'eco', ecoFriendly: true },
  { id: 4, name: 'Bamboo Toothbrush Set', description: 'Set of 4 biodegradable bamboo toothbrushes.', price: 100, image: '/images/eco/toothbrush.png', category: 'eco', ecoFriendly: true },
  { id: 5, name: 'BINKS Hoodie', description: 'Comfortable hoodie featuring the BINKS logo.', price: 500, image: '/images/merch/hoodie.png', category: 'merch', ecoFriendly: false }, // Example of non-eco merch
  { id: 6, name: 'Seed Starter Kit', description: 'Grow your own herbs with this easy starter kit.', price: 200, image: '/images/eco/seed-kit.png', category: 'eco', ecoFriendly: true },
];

const Marketplace: React.FC = () => {
  // Placeholder for user's coin balance - fetch this from user data later
  const [userCoins, setUserCoins] = useState(1250);

  const handlePurchase = (productId: number, price: number) => {
    // Placeholder function - implement purchase logic later
    if (userCoins >= price) {
      setUserCoins(userCoins - price);
      alert(`Purchased product ID: ${productId}! Remaining coins: ${userCoins - price}`);
      // Add logic to update user inventory/orders
    } else {
      alert('Not enough BINKS coins!');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#242424] to-[#1e1e1e] text-white">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-bold text-white">BINKS Marketplace</h1>
          <div className="flex items-center bg-[#1a1a1a] p-3 rounded-lg border border-[#4CAF50]/20">
            <Coins className="h-6 w-6 text-[#4CAF50] mr-2" />
            <span className="text-xl font-semibold">{userCoins} Coins</span>
          </div>
        </div>

        {/* Section for BINKS Merchandise */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-white mb-6 border-l-4 border-[#4CAF50] pl-3">Official BINKS Merch</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.filter(p => p.category === 'merch').map(product => (
              <Card key={product.id} className="bg-[#242424] border-[#4CAF50]/20 text-white overflow-hidden transform transition-transform hover:scale-105 flex flex-col">
                <CardHeader className="p-0">
                  {/* Placeholder Image */}
                  <div className="w-full h-48 bg-[#333] flex items-center justify-center">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" onError={(e) => e.currentTarget.style.display = 'none'} />
                    {/* Fallback text if image fails */}
                    {!product.image && <span className="text-gray-500">Image coming soon</span>}
                  </div>
                </CardHeader>
                <CardContent className="p-4 flex-grow">
                  <CardTitle className="text-lg mb-2">{product.name}</CardTitle>
                  <p className="text-sm text-gray-300 mb-3">{product.description}</p>
                  {product.ecoFriendly && (
                    <div className="flex items-center text-xs text-green-400 mb-2">
                      <Leaf size={14} className="mr-1" /> Eco-Friendly
                    </div>
                  )}
                </CardContent>
                <CardFooter className="p-4 bg-[#1a1a1a] border-t border-[#4CAF50]/10 flex justify-between items-center">
                  <div className="flex items-center font-semibold">
                    <Coins className="h-5 w-5 text-[#4CAF50] mr-1" />
                    {product.price}
                  </div>
                  <Button
                    size="sm"
                    className="bg-[#4CAF50] hover:bg-[#3e8e41]"
                    onClick={() => handlePurchase(product.id, product.price)}
                  >
                    <ShoppingCart size={16} className="mr-1" /> Buy
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>

        {/* Section for Eco-Friendly Products */}
        <section>
          <h2 className="text-2xl font-semibold text-white mb-6 border-l-4 border-[#4CAF50] pl-3">Featured Eco-Friendly Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.filter(p => p.category === 'eco').map(product => (
              <Card key={product.id} className="bg-[#242424] border-[#4CAF50]/20 text-white overflow-hidden transform transition-transform hover:scale-105 flex flex-col">
                <CardHeader className="p-0">
                  {/* Placeholder Image */}
                  <div className="w-full h-48 bg-[#333] flex items-center justify-center">
                     <img src={product.image} alt={product.name} className="w-full h-full object-cover" onError={(e) => e.currentTarget.style.display = 'none'} />
                     {/* Fallback text if image fails */}
                     {!product.image && <span className="text-gray-500">Image coming soon</span>}
                  </div>
                </CardHeader>
                <CardContent className="p-4 flex-grow">
                  <CardTitle className="text-lg mb-2">{product.name}</CardTitle>
                  <p className="text-sm text-gray-300 mb-3">{product.description}</p>
                   <div className="flex items-center text-xs text-green-400 mb-2">
                      <Leaf size={14} className="mr-1" /> Eco-Friendly
                    </div>
                </CardContent>
                <CardFooter className="p-4 bg-[#1a1a1a] border-t border-[#4CAF50]/10 flex justify-between items-center">
                  <div className="flex items-center font-semibold">
                    <Coins className="h-5 w-5 text-[#4CAF50] mr-1" />
                    {product.price}
                  </div>
                  <Button
                    size="sm"
                    className="bg-[#4CAF50] hover:bg-[#3e8e41]"
                    onClick={() => handlePurchase(product.id, product.price)}
                  >
                    <ShoppingCart size={16} className="mr-1" /> Buy
                  </Button>
                </CardFooter>
              </Card>
            ))}
           {/* Section for Small Businesses to Get Featured */}
<section className="mt-20 bg-[#1a1a1a] px-6 py-12 rounded-2xl border border-[#4CAF50]/20 shadow-xl">
  <div className="max-w-3xl mx-auto text-center">
    <h2 className="text-3xl font-bold text-white mb-4">Are You an Eco-Friendly Seller?</h2>
    <p className="text-lg text-gray-300 mb-8">
      If you're a small-scale business creating sustainable products, we'd love to showcase your creations on the BINKS Marketplace.
      Let’s collaborate to build a greener tomorrow.
    </p>
    <Button
      className="bg-[#4CAF50] hover:bg-[#45a049] text-white px-8 py-3 text-lg transition-transform transform hover:scale-105"
      onClick={() => window.location.href = "mailto:contact@binks.eco?subject=Eco-Friendly Seller Inquiry&body=Hi BINKS Team,%0D%0A%0D%0AI am interested in featuring my eco-friendly products on your marketplace. Please get in touch with me!"}
    >
       Contact BINKS
    </Button>
  </div>
</section>


          </div>
        </section>
      </main>

      {/* You might want a Footer component here as well */}
      {/* <Footer /> */}
    </div>
  );
};

export default Marketplace;