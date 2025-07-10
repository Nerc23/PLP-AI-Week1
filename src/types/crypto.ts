export interface CryptoData {
  price_trend: 'rising' | 'stable' | 'falling';
  market_cap: 'high' | 'medium' | 'low';
  energy_use: 'high' | 'medium' | 'low';
  sustainability_score: number;
  symbol: string;
  description: string;
}

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  type?: 'recommendation' | 'analysis' | 'general';
}

export interface RecommendationResult {
  crypto: string;
  reason: string;
  score: number;
  category: 'profitability' | 'sustainability' | 'balanced';
}