import React, { useEffect, useRef, useState } from 'react';

const STORAGE_KEY = 'smartchatai.messages';
const API_ENDPOINT = '/api/chat';
const REQUEST_TIMEOUT_MS = 15000;

const createMessage = (text, sender) => ({
  id: typeof crypto?.randomUUID === 'function'
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(16).slice(2)}`,
  text,
  sender,
});

const loadMessages = () => {
  try {
    const rawMessages = localStorage.getItem(STORAGE_KEY);
    if (!rawMessages) return [];

    const parsed = JSON.parse(rawMessages);
    if (!Array.isArray(parsed)) return [];

    return parsed.filter(
      (entry) => entry
        && typeof entry.id === 'string'
        && typeof entry.text === 'string'
        && (entry.sender === 'user' || entry.sender === 'bot')
    );
  } catch {
    return [];
  }
};

function ChatInterface() {
  const [messages, setMessages] = useState(loadMessages);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSend = async () => {
    const trimmedInput = input.trim();
    if (!trimmedInput || isLoading) return;

    setErrorMessage('');
    setMessages((previousMessages) => [...previousMessages, createMessage(trimmedInput, 'user')]);
    setInput('');
    setIsLoading(true);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

    try {
      const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: trimmedInput }),
        signal: controller.signal,
      });

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();
      setMessages((previousMessages) => [
        ...previousMessages,
        createMessage(data.reply || 'Keine Antwort erhalten.', 'bot'),
      ]);
    } catch (error) {
      setErrorMessage(
        error.name === 'AbortError'
          ? 'Die Anfrage hat zu lange gedauert. Bitte versuche es erneut.'
          : 'Es gab ein Problem beim Senden deiner Nachricht. Bitte versuche es erneut.'
      );
      setMessages((previousMessages) => [
        ...previousMessages,
        createMessage('Ich konnte gerade nicht antworten. Versuche es bitte gleich noch einmal.', 'bot'),
      ]);
    } finally {
      clearTimeout(timeoutId);
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([]);
    setErrorMessage('');
    localStorage.removeItem(STORAGE_KEY);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    handleSend();
  };

  return (
    <div className="chat-interface">
      <div className="chat-toolbar">
        <button type="button" className="secondary-button" onClick={clearChat} disabled={isLoading || messages.length === 0}>
          Chat leeren
        </button>
      </div>

      <div className="messages" aria-live="polite">
        {messages.length === 0 && (
          <div className="empty-state">Starte den Chat mit deiner ersten Nachricht.</div>
        )}

        {messages.map((message) => (
          <div key={message.id} className={`message ${message.sender}`}>
            {message.text}
          </div>
        ))}

        {isLoading && <div className="message bot">Smartchatai schreibt ...</div>}
        <div ref={messagesEndRef} />
      </div>

      {errorMessage && <p className="error-message" role="alert">{errorMessage}</p>}

      <form className="input-area" onSubmit={onSubmit}>
        <input
          type="text"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="Schreibe deine Nachricht..."
          disabled={isLoading}
          aria-label="Nachricht eingeben"
          maxLength={500}
        />
        <button type="submit" disabled={isLoading || input.trim() === ''} aria-label="Nachricht senden">
          {isLoading ? 'Senden...' : 'Senden'}
        </button>
      </form>
    </div>
  );
}

export default ChatInterface;
