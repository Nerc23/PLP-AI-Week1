import { cryptoDatabase } from '../data/cryptoDatabase';
import { RecommendationResult } from '../types/crypto';

export class CryptoBotLogic {
  private responses = {
    greeting: [
      "Hey there! 👋 Welcome to CryptoBuddy! I'm here to help you navigate the crypto world with smart, sustainable investment advice.",
      "Hello! 🚀 I'm CryptoBuddy, your AI-powered crypto advisor. Let's find you some profitable and eco-friendly investments!",
      "Hi! 🌟 Ready to explore the crypto universe? I'll help you balance profitability with sustainability!"
    ],
    
    help: [
      "I can help you with:\n• Finding trending cryptocurrencies\n• Sustainable investment options\n• Market analysis and advice\n• Risk assessment\n\nTry asking: 'Which crypto is most sustainable?' or 'What's trending up?'",
      "Here's what I can do for you:\n• Analyze crypto profitability\n• Recommend eco-friendly coins\n• Provide market insights\n• Balance risk and reward\n\nJust ask me about any crypto or investment strategy!"
    ],
    
    disclaimer: "⚠️ Important: Cryptocurrency investments are highly volatile and risky. Always do your own research and never invest more than you can afford to lose. This advice is for educational purposes only."
  };

  analyzeQuery(query: string): string {
    const lowerQuery = query.toLowerCase();
    
    // Greeting patterns
    if (this.matchesPattern(lowerQuery, ['hello', 'hi', 'hey', 'start', 'beginning'])) {
      return this.getRandomResponse(this.responses.greeting);
    }
    
    // Help patterns
    if (this.matchesPattern(lowerQuery, ['help', 'what can you do', 'commands', 'options'])) {
      return this.getRandomResponse(this.responses.help);
    }
    
    // Sustainability queries
    if (this.matchesPattern(lowerQuery, ['sustainable', 'eco-friendly', 'green', 'environment', 'energy efficient'])) {
      return this.getSustainabilityRecommendation();
    }
    
    // Profitability queries
    if (this.matchesPattern(lowerQuery, ['profitable', 'rising', 'trending', 'growing', 'bull', 'gains'])) {
      return this.getProfitabilityRecommendation();
    }
    
    // Balanced queries
    if (this.matchesPattern(lowerQuery, ['balanced', 'both', 'best overall', 'recommend', 'advice'])) {
      return this.getBalancedRecommendation();
    }
    
    // Specific crypto queries
    const cryptoMentioned = Object.keys(cryptoDatabase).find(crypto => 
      lowerQuery.includes(crypto.toLowerCase()) || 
      lowerQuery.includes(cryptoDatabase[crypto].symbol.toLowerCase())
    );
    
    if (cryptoMentioned) {
      return this.analyzeCrypto(cryptoMentioned);
    }
    
    // Risk and market queries
    if (this.matchesPattern(lowerQuery, ['risk', 'safe', 'volatile', 'market', 'price'])) {
      return this.getRiskAnalysis();
    }
    
    // Default response
    return this.getDefaultResponse();
  }

  private matchesPattern(query: string, patterns: string[]): boolean {
    return patterns.some(pattern => query.includes(pattern));
  }

  private getRandomResponse(responses: string[]): string {
    return responses[Math.floor(Math.random() * responses.length)];
  }

  private getSustainabilityRecommendation(): string {
    const sustainableCryptos = Object.entries(cryptoDatabase)
      .filter(([_, data]) => data.sustainability_score >= 7)
      .sort(([_, a], [__, b]) => b.sustainability_score - a.sustainability_score);
    
    if (sustainableCryptos.length === 0) {
      return "Currently, I don't have any cryptos with high sustainability scores in my database. Consider looking into proof-of-stake cryptocurrencies which are generally more energy-efficient.";
    }
    
    const [topCrypto, data] = sustainableCryptos[0];
    return `🌱 **${topCrypto} (${data.symbol})** is my top sustainable pick!\n\n` +
           `**Sustainability Score:** ${data.sustainability_score}/10\n` +
           `**Energy Use:** ${data.energy_use}\n` +
           `**Why it's great:** ${data.description}\n\n` +
           `${data.price_trend === 'rising' ? '📈 Plus, it\'s currently trending upward!' : ''}\n\n` +
           this.responses.disclaimer;
  }

  private getProfitabilityRecommendation(): string {
    const profitableCryptos = Object.entries(cryptoDatabase)
      .filter(([_, data]) => data.price_trend === 'rising' && data.market_cap === 'high')
      .sort(([_, a], [__, b]) => this.calculateProfitabilityScore(b) - this.calculateProfitabilityScore(a));
    
    if (profitableCryptos.length === 0) {
      const risingCryptos = Object.entries(cryptoDatabase)
        .filter(([_, data]) => data.price_trend === 'rising');
      
      if (risingCryptos.length === 0) {
        return "The market seems to be in a consolidation phase. Consider dollar-cost averaging into established cryptocurrencies during stable periods.";
      }
      
      const [topCrypto, data] = risingCryptos[0];
      return `📈 **${topCrypto} (${data.symbol})** is showing strong upward momentum!\n\n` +
             `**Trend:** ${data.price_trend}\n` +
             `**Market Cap:** ${data.market_cap}\n` +
             `**Description:** ${data.description}\n\n` +
             this.responses.disclaimer;
    }
    
    const [topCrypto, data] = profitableCryptos[0];
    return `🚀 **${topCrypto} (${data.symbol})** is my top profitability pick!\n\n` +
           `**Trend:** ${data.price_trend}\n` +
           `**Market Cap:** ${data.market_cap}\n` +
           `**Why it's promising:** ${data.description}\n\n` +
           this.responses.disclaimer;
  }

  private getBalancedRecommendation(): string {
    const balancedCryptos = Object.entries(cryptoDatabase)
      .map(([name, data]) => ({
        name,
        data,
        score: this.calculateBalancedScore(data)
      }))
      .sort((a, b) => b.score - a.score);
    
    const top = balancedCryptos[0];
    return `⚖️ **${top.name} (${top.data.symbol})** offers the best balance!\n\n` +
           `**Balanced Score:** ${top.score.toFixed(1)}/10\n` +
           `**Trend:** ${top.data.price_trend}\n` +
           `**Sustainability:** ${top.data.sustainability_score}/10\n` +
           `**Energy Use:** ${top.data.energy_use}\n\n` +
           `**Why it's ideal:** ${top.data.description}\n\n` +
           this.responses.disclaimer;
  }

  private analyzeCrypto(cryptoName: string): string {
    const data = cryptoDatabase[cryptoName];
    const profitabilityScore = this.calculateProfitabilityScore(data);
    const balancedScore = this.calculateBalancedScore(data);
    
    return `📊 **${cryptoName} (${data.symbol}) Analysis**\n\n` +
           `**Price Trend:** ${data.price_trend} ${this.getTrendEmoji(data.price_trend)}\n` +
           `**Market Cap:** ${data.market_cap}\n` +
           `**Sustainability:** ${data.sustainability_score}/10 ${this.getSustainabilityEmoji(data.sustainability_score)}\n` +
           `**Energy Use:** ${data.energy_use}\n` +
           `**Overall Score:** ${balancedScore.toFixed(1)}/10\n\n` +
           `**About:** ${data.description}\n\n` +
           this.getRecommendationText(data) + '\n\n' +
           this.responses.disclaimer;
  }

  private getRiskAnalysis(): string {
    return `💡 **Crypto Risk Analysis**\n\n` +
           `**High Risk/High Reward:** Bitcoin, Ethereum (established but volatile)\n` +
           `**Medium Risk:** Cardano, Solana (growing ecosystems)\n` +
           `**Lower Risk:** Stablecoins, established DeFi tokens\n\n` +
           `**Key Factors to Consider:**\n` +
           `• Market volatility (can swing 20-50% daily)\n` +
           `• Regulatory changes\n` +
           `• Technology adoption\n` +
           `• Team and community strength\n\n` +
           this.responses.disclaimer;
  }

  private getDefaultResponse(): string {
    return `🤔 I'm not sure about that specific query, but I can help you with:\n\n` +
           `• **"What's sustainable?"** - Eco-friendly crypto recommendations\n` +
           `• **"What's trending?"** - Rising cryptocurrencies\n` +
           `• **"Best overall?"** - Balanced recommendations\n` +
           `• **"Tell me about [crypto name]"** - Specific analysis\n\n` +
           `Try asking about Bitcoin, Ethereum, Cardano, or any other crypto!`;
  }

  private calculateProfitabilityScore(data: any): number {
    let score = 0;
    if (data.price_trend === 'rising') score += 4;
    if (data.price_trend === 'stable') score += 2;
    if (data.market_cap === 'high') score += 3;
    if (data.market_cap === 'medium') score += 2;
    if (data.market_cap === 'low') score += 1;
    return score;
  }

  private calculateBalancedScore(data: any): number {
    const profitability = this.calculateProfitabilityScore(data);
    const sustainability = data.sustainability_score;
    return (profitability + sustainability) / 2;
  }

  private getTrendEmoji(trend: string): string {
    switch (trend) {
      case 'rising': return '📈';
      case 'stable': return '📊';
      case 'falling': return '📉';
      default: return '📊';
    }
  }

  private getSustainabilityEmoji(score: number): string {
    if (score >= 8) return '🌱';
    if (score >= 6) return '🌿';
    if (score >= 4) return '🌾';
    return '🔋';
  }

  private getRecommendationText(data: any): string {
    const balancedScore = this.calculateBalancedScore(data);
    
    if (balancedScore >= 7) {
      return `✅ **Recommendation:** Strong buy candidate with excellent balance of growth potential and sustainability.`;
    } else if (balancedScore >= 5) {
      return `⚡ **Recommendation:** Moderate investment opportunity. Consider as part of a diversified portfolio.`;
    } else {
      return `⚠️ **Recommendation:** Higher risk investment. Only consider if you understand the volatility.`;
    }
  }
}

export const cryptoBot = new CryptoBotLogic();