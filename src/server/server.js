const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const buildPath = path.resolve(__dirname, '../../build');

app.use(express.json());

app.get('/api', (req, res) => {
  res.json({ message: 'Welcome to Smartchatai API' });
});

app.post('/api/chat', (req, res) => {
  const { message } = req.body || {};

  if (!message || typeof message !== 'string' || message.trim() === '') {
    return res.status(400).json({ error: 'A valid message is required.' });
  }

  const reply = `Bot-Antwort: ${message}`;
  return res.json({ reply });
});

app.use(express.static(buildPath));

app.get('/', (req, res) => {
  res.sendFile(path.join(buildPath, 'index.html'));
});

app.get('/*path', (req, res) => {
  res.sendFile(path.join(buildPath, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});
