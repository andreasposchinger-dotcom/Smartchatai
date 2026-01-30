import React from 'react';
import ChatInterface from './ChatInterface';
import './styles.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to Smartchatai</h1>
        <p>Your AI chat companion</p>
      </header>
      <ChatInterface />
    </div>
  );
}

export default App;