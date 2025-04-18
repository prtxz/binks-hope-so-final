
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useWallet } from "@/context/WalletContext";
import { 
  LayoutDashboard, 
  Flag, 
  Award, 
  Wrench,
  Coins,
  LogOut,
  ChevronRight
} from 'lucide-react';
import { 
  Avatar,
  AvatarFallback,
  AvatarImage 
} from "@/components/ui/avatar";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const MENU_ITEMS = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/initiatives', label: 'Initiatives', icon: Flag },
  { path: '/rewards', label: 'Rewards', icon: Award },
  { path: '/services', label: 'Services', icon: Wrench },
  { path: '/tokenomics', label: 'Tokenomics', icon: Coins },
];

const shortenAddress = (address: string) => {
  if (!address) return '';
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

export const AppSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { walletInfo, disconnectUserWallet } = useWallet();

  return (
    <Sidebar className="border-r border-[#2f2f2f]">
      <SidebarHeader className="border-b border-[#2f2f2f] p-4">
        <div 
          className="flex items-center gap-2 cursor-pointer" 
          onClick={() => navigate('/dashboard')}
        >
          <img src="/placeholder.svg" alt="BINKS" className="h-8 w-8" />
          <span className="text-lg font-semibold text-white">BINKS</span>
        </div>
      </SidebarHeader>

      <SidebarContent className="p-4">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {MENU_ITEMS.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton 
                    onClick={() => navigate(item.path)}
                    className={`w-full ${location.pathname === item.path ? 'bg-[#4CAF50]/10 text-[#4CAF50]' : 'hover:bg-[#4CAF50]/5'}`}
                    tooltip={item.label}
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.label}</span>
                    {location.pathname === item.path && (
                      <ChevronRight className="ml-auto h-5 w-5" />
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-[#2f2f2f] p-4">
        {walletInfo && (
          <div className="space-y-4">
            <div className="text-sm text-gray-400">
              {shortenAddress(walletInfo.address)}
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex items-center gap-3 cursor-pointer hover:bg-[#2f2f2f] p-2 rounded-lg">
                  <Avatar>
                    <AvatarImage src={walletInfo.avatar || ''} />
                    <AvatarFallback>
                      {walletInfo.address?.slice(2, 4).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col text-sm">
                    <span className="font-medium">Profile</span>
                    <span className="text-gray-400">View details</span>
                  </div>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="p-2">
                  <div className="text-sm font-medium">Stats</div>
                  <div className="text-xs text-gray-400 mt-1">
                    <div>Total Disposals: {walletInfo.disposals || 0}</div>
                    <div>Total Rewards: {walletInfo.rewards || 0} BINK</div>
                  </div>
                </div>
                <DropdownMenuItem 
                  className="text-red-500 focus:text-red-500" 
                  onClick={disconnectUserWallet}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
};
