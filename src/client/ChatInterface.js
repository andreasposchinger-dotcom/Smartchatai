import React, { useState } from 'react';

function ChatInterface() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const createMessage = (text, sender) => ({
    id:
      typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function'
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`,
    text,
    sender,
  });

  const handleSend = () => {
    if (input.trim() === '') return;
    const newUserMessage = createMessage(input, 'user');
    setMessages((prevMessages) => [...prevMessages, newUserMessage]);

    // Falls Bot-Nachrichten ergänzt werden, ebenfalls über createMessage erstellen.
    // const newBotMessage = createMessage('...', 'bot');
    // setMessages((prevMessages) => [...prevMessages, newBotMessage]);

    setInput('');
  };

  return (
    <div className="chat-interface">
      <div className="messages">
        {messages.map((msg) => (
          <div key={msg.id} className={`message ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
      </div>
      <div className="input-area">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
}

export default ChatInterface;
