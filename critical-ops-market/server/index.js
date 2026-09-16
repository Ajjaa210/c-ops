const express = require('express');
const cors = require('cors');
const { calculateTax, getListings } = require('./market');
const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.post('/api/tax', (req, res) => {
  const { value, mode } = req.body;
  if (!['buy', 'sell'].includes(mode)) return res.status(400).json({ error: 'mode must be "buy" or "sell"' });
  const out = calculateTax(value, mode);
  if (!out) return res.status(400).json({ error: 'invalid value' });
  res.json(out);
});

app.get('/api/listings', (req, res) => {
  res.json(getListings());
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
