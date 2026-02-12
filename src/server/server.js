const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

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

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
