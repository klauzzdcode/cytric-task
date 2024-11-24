import {cookieStorage, createStorage} from 'wagmi';
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi';
import { mainnet, arbitrum, sepolia } from '@reown/appkit/networks';
import { createPublicClient, http } from 'viem';

export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;

if(!projectId) throw new Error("Project ID is not defined.");

export const networks = [mainnet, arbitrum, sepolia];

export const wagmiAdapter = new WagmiAdapter({
    storage: createStorage({
        storage: cookieStorage,
    }),
    ssr: true,
    networks,
    projectId
});

export const config = wagmiAdapter.wagmiConfig;