import React from 'react';
import { CryptoChat } from './components/CryptoChat';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="container mx-auto max-w-4xl h-screen flex flex-col">
        <CryptoChat />
      </div>
    </div>
  );
}

export default App;