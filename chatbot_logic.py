"""
CryptoBuddy - AI-powered cryptocurrency advisor chatbot logic
"""

import random
from crypto_data import crypto_db

class CryptoBuddy:
    def __init__(self):
        self.name = "CryptoBuddy"
        self.greetings = [
            "Hey there! 👋 Welcome to CryptoBuddy! I'm here to help you navigate the crypto world with smart, sustainable investment advice.",
            "Hello! 🚀 I'm CryptoBuddy, your AI-powered crypto advisor. Let's find you some profitable and eco-friendly investments!",
            "Hi! 🌟 Ready to explore the crypto universe? I'll help you balance profitability with sustainability!"
        ]
        
        self.help_messages = [
            """I can help you with:
• Finding trending cryptocurrencies
• Sustainable investment options  
• Market analysis and advice
• Risk assessment

Try asking: 'Which crypto is most sustainable?' or 'What's trending up?'""",
            """Here's what I can do for you:
• Analyze crypto profitability
• Recommend eco-friendly coins
• Provide market insights
• Balance risk and reward

Just ask me about any crypto or investment strategy!"""
        ]
        
        self.disclaimer = "⚠️  Important: Cryptocurrency investments are highly volatile and risky. Always do your own research and never invest more than you can afford to lose. This advice is for educational purposes only."

    def greet(self):
        """Return a random greeting message"""
        return random.choice(self.greetings)

    def analyze_query(self, user_input):
        """Analyze user query and provide appropriate response"""
        query = user_input.lower().strip()
        
        # Greeting patterns
        if any(word in query for word in ['hello', 'hi', 'hey', 'start', 'beginning']):
            return self.greet()
        
        # Help patterns
        if any(word in query for word in ['help', 'what can you do', 'commands', 'options']):
            return random.choice(self.help_messages)
        
        # Exit patterns
        if any(word in query for word in ['bye', 'goodbye', 'exit', 'quit', 'stop']):
            return "Thanks for using CryptoBuddy! Remember to always do your own research. Happy investing! 🚀"
        
        # Sustainability queries
        if any(word in query for word in ['sustainable', 'eco-friendly', 'green', 'environment', 'energy efficient']):
            return self.get_sustainability_recommendation()
        
        # Profitability queries
        if any(word in query for word in ['profitable', 'rising', 'trending', 'growing', 'bull', 'gains']):
            return self.get_profitability_recommendation()
        
        # Balanced queries
        if any(word in query for word in ['balanced', 'both', 'best overall', 'recommend', 'advice']):
            return self.get_balanced_recommendation()
        
        # Specific crypto queries
        crypto_mentioned = None
        for crypto in crypto_db.keys():
            if crypto.lower() in query or crypto_db[crypto]['symbol'].lower() in query:
                crypto_mentioned = crypto
                break
        
        if crypto_mentioned:
            return self.analyze_specific_crypto(crypto_mentioned)
        
        # Risk and market queries
        if any(word in query for word in ['risk', 'safe', 'volatile', 'market', 'price']):
            return self.get_risk_analysis()
        
        # Default response
        return self.get_default_response()

    def get_sustainability_recommendation(self):
        """Find and recommend the most sustainable cryptocurrency"""
        sustainable_cryptos = [(name, data) for name, data in crypto_db.items() 
                             if data['sustainability_score'] >= 7]
        
        if not sustainable_cryptos:
            return "Currently, I don't have any cryptos with high sustainability scores in my database. Consider looking into proof-of-stake cryptocurrencies which are generally more energy-efficient."
        
        # Sort by sustainability score
        sustainable_cryptos.sort(key=lambda x: x[1]['sustainability_score'], reverse=True)
        top_crypto, data = sustainable_cryptos[0]
        
        response = f"""🌱 **{top_crypto} ({data['symbol']})** is my top sustainable pick!

**Sustainability Score:** {data['sustainability_score']}/10
**Energy Use:** {data['energy_use']}
**Why it's great:** {data['description']}
"""
        
        if data['price_trend'] == 'rising':
            response += "\n📈 Plus, it's currently trending upward!"
        
        response += f"\n\n{self.disclaimer}"
        return response

    def get_profitability_recommendation(self):
        """Find and recommend the most profitable cryptocurrency"""
        profitable_cryptos = [(name, data) for name, data in crypto_db.items() 
                            if data['price_trend'] == 'rising']
        
        if not profitable_cryptos:
            return "The market seems to be in a consolidation phase. Consider dollar-cost averaging into established cryptocurrencies during stable periods."
        
        # Sort by profitability score (considering market cap and trend)
        profitable_cryptos.sort(key=lambda x: self.calculate_profitability_score(x[1]), reverse=True)
        top_crypto, data = profitable_cryptos[0]
        
        response = f"""🚀 **{top_crypto} ({data['symbol']})** is my top profitability pick!

**Trend:** {data['price_trend']} 📈
**Market Cap:** {data['market_cap']}
**Why it's promising:** {data['description']}

{self.disclaimer}"""
        
        return response

    def get_balanced_recommendation(self):
        """Find and recommend the most balanced cryptocurrency"""
        balanced_cryptos = [(name, data, self.calculate_balanced_score(data)) 
                          for name, data in crypto_db.items()]
        
        # Sort by balanced score
        balanced_cryptos.sort(key=lambda x: x[2], reverse=True)
        top_crypto, data, score = balanced_cryptos[0]
        
        response = f"""⚖️ **{top_crypto} ({data['symbol']})** offers the best balance!

**Balanced Score:** {score:.1f}/10
**Trend:** {data['price_trend']} {self.get_trend_emoji(data['price_trend'])}
**Sustainability:** {data['sustainability_score']}/10 {self.get_sustainability_emoji(data['sustainability_score'])}
**Energy Use:** {data['energy_use']}

**Why it's ideal:** {data['description']}

{self.disclaimer}"""
        
        return response

    def analyze_specific_crypto(self, crypto_name):
        """Provide detailed analysis of a specific cryptocurrency"""
        data = crypto_db[crypto_name]
        balanced_score = self.calculate_balanced_score(data)
        
        response = f"""📊 **{crypto_name} ({data['symbol']}) Analysis**

**Price Trend:** {data['price_trend']} {self.get_trend_emoji(data['price_trend'])}
**Market Cap:** {data['market_cap']}
**Sustainability:** {data['sustainability_score']}/10 {self.get_sustainability_emoji(data['sustainability_score'])}
**Energy Use:** {data['energy_use']}
**Overall Score:** {balanced_score:.1f}/10

**About:** {data['description']}

{self.get_recommendation_text(data)}

{self.disclaimer}"""
        
        return response

    def get_risk_analysis(self):
        """Provide general risk analysis for crypto investments"""
        return f"""💡 **Crypto Risk Analysis**

**High Risk/High Reward:** Bitcoin, Ethereum (established but volatile)
**Medium Risk:** Cardano, Solana (growing ecosystems)
**Lower Risk:** Stablecoins, established DeFi tokens

**Key Factors to Consider:**
• Market volatility (can swing 20-50% daily)
• Regulatory changes
• Technology adoption
• Team and community strength

{self.disclaimer}"""

    def get_default_response(self):
        """Default response for unrecognized queries"""
        return """🤔 I'm not sure about that specific query, but I can help you with:

• **"What's sustainable?"** - Eco-friendly crypto recommendations
• **"What's trending?"** - Rising cryptocurrencies  
• **"Best overall?"** - Balanced recommendations
• **"Tell me about [crypto name]"** - Specific analysis

Try asking about Bitcoin, Ethereum, Cardano, or any other crypto!"""

    def calculate_profitability_score(self, data):
        """Calculate profitability score based on trend and market cap"""
        score = 0
        if data['price_trend'] == 'rising':
            score += 4
        elif data['price_trend'] == 'stable':
            score += 2
        
        if data['market_cap'] == 'high':
            score += 3
        elif data['market_cap'] == 'medium':
            score += 2
        else:
            score += 1
        
        return score

    def calculate_balanced_score(self, data):
        """Calculate balanced score considering both profitability and sustainability"""
        profitability = self.calculate_profitability_score(data)
        sustainability = data['sustainability_score']
        return (profitability + sustainability) / 2

    def get_trend_emoji(self, trend):
        """Get emoji for price trend"""
        if trend == 'rising':
            return '📈'
        elif trend == 'stable':
            return '📊'
        else:
            return '📉'

    def get_sustainability_emoji(self, score):
        """Get emoji for sustainability score"""
        if score >= 8:
            return '🌱'
        elif score >= 6:
            return '🌿'
        elif score >= 4:
            return '🌾'
        else:
            return '🔋'

    def get_recommendation_text(self, data):
        """Get recommendation text based on crypto data"""
        balanced_score = self.calculate_balanced_score(data)
        
        if balanced_score >= 7:
            return "✅ **Recommendation:** Strong buy candidate with excellent balance of growth potential and sustainability."
        elif balanced_score >= 5:
            return "⚡ **Recommendation:** Moderate investment opportunity. Consider as part of a diversified portfolio."
        else:
            return "⚠️ **Recommendation:** Higher risk investment. Only consider if you understand the volatility."