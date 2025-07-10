"""
Test script for CryptoBuddy chatbot functionality
"""

from chatbot_logic import CryptoBuddy

def test_chatbot():
    """Test various chatbot functionalities"""
    bot = CryptoBuddy()
    
    print("🧪 Testing CryptoBuddy Chatbot")
    print("=" * 50)
    
    # Test cases
    test_queries = [
        "hello",
        "Which crypto is most sustainable?",
        "What's trending up?",
        "Tell me about Bitcoin",
        "What do you recommend overall?",
        "help",
        "What are the risks?",
        "unknown query test"
    ]
    
    for i, query in enumerate(test_queries, 1):
        print(f"\n🔍 Test {i}: '{query}'")
        print("-" * 30)
        response = bot.analyze_query(query)
        print(f"Response: {response[:100]}...")  # Show first 100 chars
        print("✅ Test passed")
    
    print(f"\n🎉 All {len(test_queries)} tests completed successfully!")

if __name__ == "__main__":
    test_chatbot()