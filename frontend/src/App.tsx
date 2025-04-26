import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import TestBalance from "./pages/TestBalance";

import {
  WagmiProvider
} from "wagmi";
import {
  RainbowKitProvider
} from "@rainbow-me/rainbowkit";

import { wagmiClient, chains } from "./wagmi-config";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import FranchiseInfo from "./pages/FranchiseInfo";
import Initiatives from "./pages/Initiatives";
import CreateInitiative from "./pages/CreateInitiative";
import Rewards from "./pages/Rewards";
import Services from "./pages/Services";
import Tokenomics from "./pages/Tokenomics";
import SmartBin from "./pages/SmartBin";
import Marketplace from "./pages/Marketplace";
import Profile from "./pages/Profile";
import Liquidation from "./pages/Liquidation";

import { WalletProvider } from "./context/WalletContext";
import DashboardLayout from "./components/layout/DashboardLayout";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      staleTime: 5000
    },
  },
});

function App() {
  return (
    <WagmiProvider config={wagmiClient}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <Routes>
              <Route
                path="/"
                element={
                  <WalletProvider>
                    <Index />
                  </WalletProvider>
                }
              />
              <Route path="/franchise-info" element={<FranchiseInfo />} />
              <Route path="/test-balance" element={<TestBalance />} />

              {/* Dashboard Layout Routes - Wrapped with WalletProvider */}
              <Route
                element={
                  <WalletProvider>
                    <DashboardLayout />
                  </WalletProvider>
                }
              >
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/initiatives" element={<Initiatives />} />
                <Route path="/create-initiative" element={<CreateInitiative />} />
                <Route path="/rewards" element={<Rewards />} />
                <Route path="/services" element={<Services />} />
                <Route path="/tokenomics" element={<Tokenomics />} />
                <Route path="/smart-bin" element={<SmartBin />} />
                <Route path="/marketplace" element={<Marketplace />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/liquidation" element={<Liquidation />} />
              </Route>

              {/* Catch-All Route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </TooltipProvider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App;
