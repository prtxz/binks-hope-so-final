
import { http, createConfig } from 'wagmi';
import { injected } from 'wagmi/connectors';
import { defineChain } from 'viem/utils';


export const coreBTC = defineChain({
  id: 1115,
  name: 'CoreBTC Testnet',
  network: 'corebtc',
  nativeCurrency: {
    name: 'tBTC',
    symbol: 'tBTC',
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ['https://rpc.test.btcs.network'],
    },
  },
  blockExplorers: {
    default: {
      name: 'CoreBTC Explorer',
      url: 'https://testnet.corebtcscan.com',
    },
  },
});

// ✅ Must be a readonly array
export const chains = [coreBTC] as const;

export const wagmiClient = createConfig({
  chains: [coreBTC],
  connectors: [injected()],
  transports: {
    [coreBTC.id]: http(),
  },
  ssr: true,
});

export const config = createConfig({
    chains: [coreBTC],
    connectors: [injected()],
    transports: {
      [coreBTC.id]: http(),
    },
    ssr: true,
  });


