
import { useState } from "react";
import HeroSection from "@/components/HeroSection";
import Navbar from "@/components/Navbar";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Building, DollarSign, Truck, Mail, Video, BookOpen, Trophy, Users, Star, Award } from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  const { toast } = useToast();

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#242424] to-[#1e1e1e]">
      <Navbar />
      <HeroSection />
      
      {/* Services Section */}
      <section id="services" className="py-16 bg-[#1e1e1e]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Our Services</h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Discover how BINKS can transform your waste management experience with our innovative solutions.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="transform transition-transform hover:scale-105 bg-[#242424] border-[#4CAF50]/20 text-white">
              <CardHeader className="flex flex-col items-center">
                <div className="p-3 rounded-full bg-[#4CAF50]/20">
                  <Truck className="h-8 w-8 text-[#4CAF50]" />
                </div>
                <CardTitle className="mt-4 text-xl text-white">Smart Waste Collection</CardTitle>
              </CardHeader>
              <CardContent className="text-center text-gray-300">
                <p>Automated waste collection with intelligent sorting and processing systems.</p>
              </CardContent>
            </Card>
            
            <Card className="transform transition-transform hover:scale-105 bg-[#242424] border-[#4CAF50]/20 text-white">
              <CardHeader className="flex flex-col items-center">
                <div className="p-3 rounded-full bg-[#4CAF50]/20">
                  <DollarSign className="h-8 w-8 text-[#4CAF50]" />
                </div>
                <CardTitle className="mt-4 text-xl text-white">Reward System</CardTitle>
              </CardHeader>
              <CardContent className="text-center text-gray-300">
                <p>Earn rewards and tokens for your responsible waste disposal habits.</p>
              </CardContent>
            </Card>
            
            <Card className="transform transition-transform hover:scale-105 bg-[#242424] border-[#4CAF50]/20 text-white">
              <CardHeader className="flex flex-col items-center">
                <div className="p-3 rounded-full bg-[#4CAF50]/20">
                  <Building className="h-8 w-8 text-[#4CAF50]" />
                </div>
                <CardTitle className="mt-4 text-xl text-white">Corporate Solutions</CardTitle>
              </CardHeader>
              <CardContent className="text-center text-gray-300">
                <p>Tailored waste management solutions for businesses and organizations.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Video Section */}
      <section id="video" className="py-16 bg-[#242424]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">See How BINKS Works</h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Watch how our smart dustbin technology works and transforms waste management.
            </p>
          </div>
          
          <div className="aspect-w-16 aspect-h-9 bg-[#1a1a1a] rounded-xl overflow-hidden shadow-lg mx-auto max-w-4xl border border-[#4CAF50]/20">
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <Video className="h-16 w-16 text-[#4CAF50] mx-auto mb-4" />
                <p className="text-gray-400">Video Placeholder</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Gamification Section */}
      <section id="gamification" className="py-16 bg-[#1e1e1e]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">How BINKS Gamifies Waste Management</h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Turn waste disposal into a rewarding experience with our gamified ecosystem that incentivizes sustainability.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-[#242424] p-8 rounded-xl shadow-md border border-[#4CAF50]/20">
              <div className="flex items-center mb-6">
                <Trophy className="h-10 w-10 text-[#4CAF50] mr-4" />
                <h3 className="text-2xl font-bold text-white">Eco Score System</h3>
              </div>
              <p className="text-gray-300 mb-6">
                Every time you use BINKS, you earn eco points based on the type and quantity of waste. 
                Your eco score determines your rank in the community and unlocks exclusive rewards.
              </p>
              <div className="space-y-4">
                <div className="bg-[#1a1a1a] p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-300">Plastic Recycling</span>
                    <span className="text-[#4CAF50] font-semibold">+10 points per kg</span>
                  </div>
                  <div className="w-full bg-[#333] rounded-full h-2">
                    <div className="bg-[#4CAF50] h-2 rounded-full" style={{ width: '80%' }}></div>
                  </div>
                </div>
                <div className="bg-[#1a1a1a] p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-300">Organic Waste</span>
                    <span className="text-[#4CAF50] font-semibold">+5 points per kg</span>
                  </div>
                  <div className="w-full bg-[#333] rounded-full h-2">
                    <div className="bg-[#4CAF50] h-2 rounded-full" style={{ width: '60%' }}></div>
                  </div>
                </div>
                <div className="bg-[#1a1a1a] p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-300">E-Waste</span>
                    <span className="text-[#4CAF50] font-semibold">+25 points per kg</span>
                  </div>
                  <div className="w-full bg-[#333] rounded-full h-2">
                    <div className="bg-[#4CAF50] h-2 rounded-full" style={{ width: '40%' }}></div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-[#242424] p-8 rounded-xl shadow-md border border-[#4CAF50]/20">
              <div className="flex items-center mb-6">
                <Users className="h-10 w-10 text-[#4CAF50] mr-4" />
                <h3 className="text-2xl font-bold text-white">Community Leaderboard</h3>
              </div>
              <p className="text-gray-300 mb-6">
                Compete with friends and neighbors on our community leaderboard. Rise through the 
                ranks from "Eco Novice" to "Sustainability Champion" as you consistently recycle and reduce waste.
              </p>
              <div className="space-y-3">
                <div className="flex items-center bg-[#1a1a1a] p-3 rounded-lg border-l-4 border-[#FFD700]">
                  <Award className="h-6 w-6 text-[#FFD700] mr-3" />
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <span className="text-white font-medium">EcoWarrior92</span>
                      <span className="text-[#4CAF50]">10,245 pts</span>
                    </div>
                    <div className="text-xs text-gray-400">Sustainability Champion</div>
                  </div>
                </div>
                <div className="flex items-center bg-[#1a1a1a] p-3 rounded-lg border-l-4 border-[#C0C0C0]">
                  <Award className="h-6 w-6 text-[#C0C0C0] mr-3" />
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <span className="text-white font-medium">GreenThumb</span>
                      <span className="text-[#4CAF50]">8,954 pts</span>
                    </div>
                    <div className="text-xs text-gray-400">Eco Master</div>
                  </div>
                </div>
                <div className="flex items-center bg-[#1a1a1a] p-3 rounded-lg border-l-4 border-[#CD7F32]">
                  <Award className="h-6 w-6 text-[#CD7F32] mr-3" />
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <span className="text-white font-medium">RecyclePro</span>
                      <span className="text-[#4CAF50]">7,832 pts</span>
                    </div>
                    <div className="text-xs text-gray-400">Eco Expert</div>
                  </div>
                </div>
                <div className="flex items-center bg-[#1a1a1a] p-3 rounded-lg">
                  <Star className="h-6 w-6 text-[#4CAF50] mr-3" />
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <span className="text-white font-medium">You</span>
                      <span className="text-[#4CAF50]">5,621 pts</span>
                    </div>
                    <div className="text-xs text-gray-400">Eco Enthusiast</div>
                  </div>
                </div>
              </div>
              <Button className="mt-6 w-full bg-[#4CAF50] hover:bg-[#3e8e41] text-white">
                View Full Leaderboard
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Tokenomics Section */}
      <section id="tokenomics" className="py-16 bg-[#242424]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Tokenomics</h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Understand how our token economy works and how you can benefit from responsible waste disposal.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">How You Earn Tokens</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-[#4CAF50] flex items-center justify-center text-white font-bold">1</div>
                  <p className="ml-3 text-gray-300">Dispose waste in BINKS smart dustbins</p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-[#4CAF50] flex items-center justify-center text-white font-bold">2</div>
                  <p className="ml-3 text-gray-300">Our ML system identifies and weighs your waste</p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-[#4CAF50] flex items-center justify-center text-white font-bold">3</div>
                  <p className="ml-3 text-gray-300">Receive tokens based on waste type and weight</p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-[#4CAF50] flex items-center justify-center text-white font-bold">4</div>
                  <p className="ml-3 text-gray-300">Redeem tokens for rewards or trade them</p>
                </li>
              </ul>
            </div>
            <div className="bg-[#1a1a1a] p-8 rounded-xl shadow-md border border-[#4CAF50]/20">
              <h3 className="text-2xl font-bold text-white mb-6">Token Distribution</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">User Rewards</span>
                  <span className="font-semibold text-white">50%</span>
                </div>
                <div className="w-full bg-[#333] rounded-full h-2.5">
                  <div className="bg-[#4CAF50] h-2.5 rounded-full" style={{ width: '50%' }}></div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Ecosystem Development</span>
                  <span className="font-semibold text-white">30%</span>
                </div>
                <div className="w-full bg-[#333] rounded-full h-2.5">
                  <div className="bg-[#4CAF50] h-2.5 rounded-full" style={{ width: '30%' }}></div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Team & Advisors</span>
                  <span className="font-semibold text-white">15%</span>
                </div>
                <div className="w-full bg-[#333] rounded-full h-2.5">
                  <div className="bg-[#4CAF50] h-2.5 rounded-full" style={{ width: '15%' }}></div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Reserve</span>
                  <span className="font-semibold text-white">5%</span>
                </div>
                <div className="w-full bg-[#333] rounded-full h-2.5">
                  <div className="bg-[#4CAF50] h-2.5 rounded-full" style={{ width: '5%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Franchise Section */}
      <section id="franchise" className="py-16 bg-[#1e1e1e]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Franchise Opportunities</h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Join the BINKS network and become part of the waste management revolution.
            </p>
          </div>
          
          <div className="bg-[#242424] rounded-xl shadow-xl overflow-hidden border border-[#4CAF50]/20">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="p-10">
                <h3 className="text-2xl font-bold text-white mb-6">Why Franchise With BINKS?</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="flex-shrink-0 text-[#4CAF50]">✓</div>
                    <p className="ml-3 text-gray-300">Low initial investment with high returns</p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 text-[#4CAF50]">✓</div>
                    <p className="ml-3 text-gray-300">Comprehensive training and ongoing support</p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 text-[#4CAF50]">✓</div>
                    <p className="ml-3 text-gray-300">Proven business model with recurring revenue</p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 text-[#4CAF50]">✓</div>
                    <p className="ml-3 text-gray-300">Exclusive territory rights</p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 text-[#4CAF50]">✓</div>
                    <p className="ml-3 text-gray-300">Be part of an environmentally conscious business</p>
                  </li>
                </ul>
                <Button className="mt-8 bg-[#4CAF50] hover:bg-[#3e8e41] text-white">
                  Request Franchise Information
                </Button>
              </div>
              <div className="bg-[#4CAF50] p-10 text-white flex items-center">
                <div>
                  <h3 className="text-2xl font-bold mb-6">Franchise Benefits</h3>
                  <p className="mb-6">Join our network of over 50+ franchise owners who are making a difference in waste management while generating sustainable income.</p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-[#3e8e41] p-4 rounded-lg text-center">
                      <div className="text-3xl font-bold">97%</div>
                      <div className="text-sm">Franchise Success Rate</div>
                    </div>
                    <div className="bg-[#3e8e41] p-4 rounded-lg text-center">
                      <div className="text-3xl font-bold">6 mo</div>
                      <div className="text-sm">Average ROI Period</div>
                    </div>
                    <div className="bg-[#3e8e41] p-4 rounded-lg text-center">
                      <div className="text-3xl font-bold">24/7</div>
                      <div className="text-sm">Technical Support</div>
                    </div>
                    <div className="bg-[#3e8e41] p-4 rounded-lg text-center">
                      <div className="text-3xl font-bold">15+</div>
                      <div className="text-sm">Countries Worldwide</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* About Us Section */}
      <section id="about" className="py-16 bg-[#242424]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">About Us</h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Learn about our mission to revolutionize waste management through technology and incentives.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">Our Story</h3>
              <p className="text-gray-300 mb-4">
                BINKS was founded in 2022 by a team of environmental engineers and blockchain enthusiasts who saw the potential to transform waste management through technology and incentives.
              </p>
              <p className="text-gray-300 mb-4">
                Our mission is to reduce waste pollution worldwide by making responsible disposal rewarding and convenient. We believe in the power of individual actions to create global impact.
              </p>
              <p className="text-gray-300">
                Today, BINKS smart dustbins are deployed in cities across the globe, helping communities reduce waste while rewarding users for their environmental consciousness.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#1a1a1a] p-6 rounded-lg text-center border border-[#4CAF50]/20">
                <div className="text-3xl font-bold text-[#4CAF50] mb-2">500+</div>
                <div className="text-gray-300">Smart Dustbins Deployed</div>
              </div>
              <div className="bg-[#1a1a1a] p-6 rounded-lg text-center border border-[#4CAF50]/20">
                <div className="text-3xl font-bold text-[#4CAF50] mb-2">15+</div>
                <div className="text-gray-300">Cities Worldwide</div>
              </div>
              <div className="bg-[#1a1a1a] p-6 rounded-lg text-center border border-[#4CAF50]/20">
                <div className="text-3xl font-bold text-[#4CAF50] mb-2">200k+</div>
                <div className="text-gray-300">Active Users</div>
              </div>
              <div className="bg-[#1a1a1a] p-6 rounded-lg text-center border border-[#4CAF50]/20">
                <div className="text-3xl font-bold text-[#4CAF50] mb-2">50k+</div>
                <div className="text-gray-300">Tons of Waste Recycled</div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Contact Us Section */}
      <section id="contact" className="py-16 bg-[#1e1e1e]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Contact Us</h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Have questions or interested in our solutions? Reach out to us and we'll get back to you.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-[#242424] p-8 rounded-xl shadow-md border border-[#4CAF50]/20">
              <h3 className="text-2xl font-bold text-white mb-6">Send Us a Message</h3>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">Name</label>
                    <input type="text" id="name" className="w-full px-4 py-2 bg-[#1a1a1a] border border-[#4CAF50]/20 rounded-md focus:ring-[#4CAF50] focus:border-[#4CAF50] text-white" />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                    <input type="email" id="email" className="w-full px-4 py-2 bg-[#1a1a1a] border border-[#4CAF50]/20 rounded-md focus:ring-[#4CAF50] focus:border-[#4CAF50] text-white" />
                  </div>
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-1">Subject</label>
                  <input type="text" id="subject" className="w-full px-4 py-2 bg-[#1a1a1a] border border-[#4CAF50]/20 rounded-md focus:ring-[#4CAF50] focus:border-[#4CAF50] text-white" />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">Message</label>
                  <textarea id="message" rows={4} className="w-full px-4 py-2 bg-[#1a1a1a] border border-[#4CAF50]/20 rounded-md focus:ring-[#4CAF50] focus:border-[#4CAF50] text-white"></textarea>
                </div>
                <Button type="submit" className="w-full bg-[#4CAF50] hover:bg-[#3e8e41] text-white">
                  Send Message
                </Button>
              </form>
            </div>
            
            <div>
              <div className="bg-[#4CAF50] p-8 rounded-xl text-white mb-8">
                <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <Mail className="h-6 w-6 mr-3 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Email</p>
                      <p>info@binksmart.com</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Building className="h-6 w-6 mr-3 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Headquarters</p>
                      <p>123 Eco Street, Green City, 10001</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-[#242424] p-8 rounded-xl border border-[#4CAF50]/20">
                <h3 className="text-2xl font-bold text-white mb-6">Connect With Us</h3>
                <p className="text-gray-300 mb-4">
                  Follow us on social media for the latest updates, waste management tips, and success stories from our BINKS community.
                </p>
                <div className="flex space-x-4">
                  <a href="#" className="bg-[#4267B2] text-white p-3 rounded-full hover:bg-opacity-80 transition">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path>
                    </svg>
                  </a>
                  <a href="#" className="bg-[#1DA1F2] text-white p-3 rounded-full hover:bg-opacity-80 transition">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                    </svg>
                  </a>
                  <a href="#" className="bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#FCAF45] text-white p-3 rounded-full hover:from-[#833AB4]/80 hover:via-[#FD1D1D]/80 hover:to-[#FCAF45]/80 transition">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd"></path>
                    </svg>
                  </a>
                  <a href="#" className="bg-[#0A66C2] text-white p-3 rounded-full hover:bg-opacity-80 transition">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <footer className="bg-[#121212] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">BINKS</h3>
              <p className="text-gray-400">
                Revolutionizing waste management through smart technology and incentives.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-[#4CAF50] transition">Home</a></li>
                <li><a href="#services" className="text-gray-400 hover:text-[#4CAF50] transition">Services</a></li>
                <li><a href="#tokenomics" className="text-gray-400 hover:text-[#4CAF50] transition">Tokenomics</a></li>
                <li><a href="#franchise" className="text-gray-400 hover:text-[#4CAF50] transition">Franchise</a></li>
                <li><a href="#about" className="text-gray-400 hover:text-[#4CAF50] transition">About</a></li>
                <li><a href="#contact" className="text-gray-400 hover:text-[#4CAF50] transition">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Subscribe</h3>
              <p className="text-gray-400 mb-4">
                Get the latest updates about BINKS and waste management.
              </p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="px-4 py-2 rounded-l-md bg-[#242424] border border-[#4CAF50]/20 text-white w-full"
                />
                <Button className="bg-[#4CAF50] hover:bg-[#3e8e41] px-4 py-2 rounded-r-md transition">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
          <div className="border-t border-[#242424] mt-8 pt-8 text-center text-gray-400">
            <p>© 2025 BINKS. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
