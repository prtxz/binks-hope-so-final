
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useWallet } from "@/context/WalletContext";
import { cn } from "@/lib/utils";
import { formatAddress } from "@/utils/wallet";
import {
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  Flag,
  Trophy,
  Wrench,
  CoinsIcon,
  LogOut,
  User
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();
  const { walletInfo, disconnectUserWallet } = useWallet();

  const navigationItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: Flag, label: 'Initiatives', path: '/initiatives' },
    { icon: Trophy, label: 'Rewards', path: '/rewards' },
    { icon: Wrench, label: 'Services', path: '/services' },
    { icon: CoinsIcon, label: 'Tokenomics', path: '/tokenomics' },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {!isCollapsed && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden" 
          onClick={() => setIsCollapsed(true)}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed left-0 top-0 z-50 h-full w-[280px] bg-[#1a1a1a] border-r border-[#4CAF50]/20 transition-all duration-300 ease-in-out transform",
        isCollapsed ? "-translate-x-full lg:translate-x-0 lg:w-20" : "translate-x-0"
      )}>
        {/* Toggle button */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-4 top-7 bg-[#4CAF50] text-white p-1 rounded-full shadow-lg hidden lg:block"
        >
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </button>

        {/* Logo */}
        <Link to="/dashboard" className="flex items-center p-6">
          <div className="w-10 h-10 bg-[#323232] border-2 border-[#4CAF50] rounded-full flex items-center justify-center">
            <h1 className="text-sm font-bold text-[#4CAF50]">BINKS</h1>
          </div>
          {!isCollapsed && (
            <span className="ml-3 text-lg font-semibold text-white">Smart Bin</span>
          )}
        </Link>

        {/* Navigation */}
        <nav className="px-3 py-4">
          {navigationItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center px-3 py-2 mb-1 rounded-lg transition-all duration-200",
                  isActive 
                    ? "bg-[#4CAF50]/20 text-[#4CAF50]" 
                    : "text-gray-400 hover:bg-[#4CAF50]/10 hover:text-[#4CAF50]"
                )}
              >
                <item.icon className={cn(
                  "h-5 w-5 transition-colors",
                  isActive && "text-[#4CAF50]"
                )} />
                {!isCollapsed && (
                  <span className="ml-3">{item.label}</span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Profile Section */}
        <div className={cn(
          "absolute bottom-0 left-0 right-0 p-4 border-t border-[#4CAF50]/20",
          "bg-gradient-to-t from-[#1a1a1a] to-transparent pb-6"
        )}>
          {walletInfo && (
            <div className="flex flex-col space-y-3">
              {!isCollapsed && (
                <div className="px-3 py-2 text-sm text-gray-400 bg-[#242424] rounded-lg">
                  {formatAddress(walletInfo.address)}
                </div>
              )}
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="w-full flex items-center justify-start p-2 hover:bg-[#4CAF50]/10">
                    <Avatar className="h-8 w-8 border border-[#4CAF50]/30">
                      <AvatarFallback className="bg-[#4CAF50]/20 text-[#4CAF50]">
                        {walletInfo.name?.charAt(0).toUpperCase() || 'U'}
                      </AvatarFallback>
                    </Avatar>
                    {!isCollapsed && (
                      <div className="ml-3 text-left">
                        <p className="text-sm font-medium text-white truncate">
                          {walletInfo.name || 'User'}
                        </p>
                      </div>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-[#242424] border-[#4CAF50]/20">
                  <div className="px-2 py-1.5 text-sm text-white">
                    <div className="flex items-center">
                      <User className="mr-2 h-4 w-4 text-[#4CAF50]" />
                      <span>Profile Stats</span>
                    </div>
                  </div>
                  <DropdownMenuSeparator className="bg-[#4CAF50]/10" />
                  <div className="px-4 py-2">
                    <div className="text-xs text-gray-400">Total Disposals</div>
                    <div className="text-sm text-white">32 items</div>
                  </div>
                  <div className="px-4 py-2">
                    <div className="text-xs text-gray-400">Total Rewards</div>
                    <div className="text-sm text-[#4CAF50]">1,240 BINK</div>
                  </div>
                  <DropdownMenuSeparator className="bg-[#4CAF50]/10" />
                  <DropdownMenuItem 
                    className="text-red-400 hover:text-red-300 hover:bg-red-500/10 cursor-pointer"
                    onClick={disconnectUserWallet}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
