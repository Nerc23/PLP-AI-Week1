import React from 'react';
import { Bot, User } from 'lucide-react';
import { ChatMessage as ChatMessageType } from '../types/crypto';

interface ChatMessageProps {
  message: ChatMessageType;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isBot = message.sender === 'bot';
  
  return (
    <div className={`flex ${isBot ? 'justify-start' : 'justify-end'} mb-4 animate-fade-in`}>
      <div className={`flex max-w-[80%] ${isBot ? 'flex-row' : 'flex-row-reverse'}`}>
        {/* Avatar */}
        <div className={`flex-shrink-0 ${isBot ? 'mr-3' : 'ml-3'}`}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
            isBot 
              ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white' 
              : 'bg-gradient-to-br from-orange-500 to-red-500 text-white'
          }`}>
            {isBot ? <Bot size={16} /> : <User size={16} />}
          </div>
        </div>
        
        {/* Message */}
        <div className={`px-4 py-2 rounded-2xl shadow-lg ${
          isBot 
            ? 'bg-white text-gray-800 border border-gray-200' 
            : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
        }`}>
          <div className="text-sm whitespace-pre-wrap break-words">
            {message.text}
          </div>
          <div className={`text-xs mt-1 ${
            isBot ? 'text-gray-500' : 'text-blue-100'
          }`}>
            {message.timestamp.toLocaleTimeString([], { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </div>
        </div>
      </div>
    </div>
  );
};