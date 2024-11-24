'use client'

import { wagmiAdapter, projectId } from "@/config";
import { siweConfig } from "@/config/siwe";
import { createAppKit } from "@reown/appkit";
import { mainnet, arbitrum, sepolia } from "@reown/appkit/networks";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { type ReactNode } from 'react';
import { cookieToInitialState, WagmiProvider, type Config } from "wagmi";

const queryClient = new QueryClient();


if(!projectId) throw new Error("Project ID is not defined.");

const metadata = {
    name: "Cytric Task",
    description: "Cytric Task - Nextjs 13.5 used",
    url: "https://exampleapp.com/",
    icons: ['https://assets.reown.com/reown-profile-pic.png']
};

export const modal = createAppKit({
    adapters: [wagmiAdapter],
    projectId,
    networks: [mainnet, arbitrum, sepolia],
    defaultNetwork: sepolia,
    features: {
        analytics: true,
        email: true,
        socials: ['google', 'x', 'github', 'discord', 'farcaster'],
        emailShowWallets: true
    },
    themeMode: "dark",
    siweConfig: siweConfig
});

function ContextProvider({ children, cookies }: { children: ReactNode; cookies: string | null }) {
    const initialState = cookieToInitialState(wagmiAdapter.wagmiConfig as Config, cookies)
  
    return (
      <WagmiProvider config={wagmiAdapter.wagmiConfig as Config} initialState={initialState}>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </WagmiProvider>
    )
  }
  
export default ContextProvider