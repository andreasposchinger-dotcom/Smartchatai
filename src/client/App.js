import React from 'react';
import ChatInterface from './ChatInterface';
import './styles.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Smartchatai</h1>
        <p>Dein KI-Chat für schnelle Antworten im Browser</p>
      </header>
      <ChatInterface />
    </div>
  );
}

export default App;
