import { CryptoData } from '../types/crypto';

export const cryptoDatabase: Record<string, CryptoData> = {
  'Bitcoin': {
    price_trend: 'rising',
    market_cap: 'high',
    energy_use: 'high',
    sustainability_score: 3,
    symbol: 'BTC',
    description: 'The original cryptocurrency and digital gold standard'
  },
  'Ethereum': {
    price_trend: 'stable',
    market_cap: 'high',
    energy_use: 'medium',
    sustainability_score: 6,
    symbol: 'ETH',
    description: 'Smart contract platform powering decentralized applications'
  },
  'Cardano': {
    price_trend: 'rising',
    market_cap: 'medium',
    energy_use: 'low',
    sustainability_score: 8,
    symbol: 'ADA',
    description: 'Proof-of-stake blockchain focused on sustainability and academic research'
  },
  'Solana': {
    price_trend: 'rising',
    market_cap: 'medium',
    energy_use: 'low',
    sustainability_score: 7,
    symbol: 'SOL',
    description: 'High-performance blockchain for decentralized apps and crypto projects'
  },
  'Polygon': {
    price_trend: 'stable',
    market_cap: 'medium',
    energy_use: 'low',
    sustainability_score: 8,
    symbol: 'MATIC',
    description: 'Layer 2 scaling solution for Ethereum with lower fees'
  },
  'Chainlink': {
    price_trend: 'stable',
    market_cap: 'medium',
    energy_use: 'low',
    sustainability_score: 7,
    symbol: 'LINK',
    description: 'Decentralized oracle network connecting smart contracts to real-world data'
  }
};