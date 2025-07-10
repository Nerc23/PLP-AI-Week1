"""
CryptoBuddy - Your AI-Powered Cryptocurrency Advisor
A rule-based chatbot that analyzes cryptocurrency data and provides 
investment advice based on profitability and sustainability.
"""

import os
import time
from chatbot_logic import CryptoBuddy

def print_header():
    """Print the chatbot header with styling"""
    print("=" * 60)
    print("🚀 CRYPTOBUDDY - Your AI-Powered Crypto Advisor 🌟")
    print("=" * 60)
    print("💡 Get smart investment advice balancing profit & sustainability")
    print("📊 Type 'help' for commands or 'quit' to exit")
    print("-" * 60)

def print_message(sender, message, delay=0.02):
    """Print message with typing effect"""
    if sender == "CryptoBuddy":
        print(f"\n🤖 {sender}:")
        print("-" * 40)
    else:
        print(f"\n👤 {sender}:")
    
    # Typing effect for bot messages
    if sender == "CryptoBuddy" and delay > 0:
        for char in message:
            print(char, end='', flush=True)
            time.sleep(delay)
        print()  # New line after message
    else:
        print(message)
    
    print()

def main():
    """Main chatbot loop"""
    # Initialize chatbot
    bot = CryptoBuddy()
    
    # Show header
    print_header()
    
    # Welcome message
    welcome_msg = bot.greet()
    print_message("CryptoBuddy", welcome_msg)
    
    # Main conversation loop
    while True:
        try:
            # Get user input
            user_input = input("💬 You: ").strip()
            
            # Check for empty input
            if not user_input:
                print_message("CryptoBuddy", "Please enter a message! 😊")
                continue
            
            # Check for exit commands
            if user_input.lower() in ['quit', 'exit', 'bye', 'goodbye']:
                farewell = bot.analyze_query(user_input)
                print_message("CryptoBuddy", farewell)
                break
            
            # Get bot response
            response = bot.analyze_query(user_input)
            print_message("CryptoBuddy", response)
            
        except KeyboardInterrupt:
            print_message("CryptoBuddy", "\n\nThanks for using CryptoBuddy! Stay safe and happy investing! 🚀")
            break
        except Exception as e:
            print_message("CryptoBuddy", f"Oops! Something went wrong: {str(e)}")
            print_message("CryptoBuddy", "Let's try again! 💪")

if __name__ == "__main__":
    main()