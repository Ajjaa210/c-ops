const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

const BUY_TAX = 0.25;
const SELL_TAX = 0.20;

function calculate(value, mode) {
  const v = Number(value);
  if (Number.isNaN(v) || v < 0) return null;
  const tax = mode === 'buy' ? v * BUY_TAX : v * SELL_TAX;
  const total = mode === 'buy' ? v + tax : Math.max(0, v - tax);
  // Return numbers rounded to 2 decimals for display. Store cents on real backend.
  return { value: Number(v.toFixed(2)), tax: Number(tax.toFixed(2)), total: Number(total.toFixed(2)) };
}

app.post('/api/tax', (req, res) => {
  const { value, mode } = req.body;
  if (!['buy', 'sell'].includes(mode)) return res.status(400).json({ error: 'mode must be "buy" or "sell"' });
  const out = calculate(value, mode);
  if (!out) return res.status(400).json({ error: 'invalid value' });
  res.json(out);
});

// Sample listings endpoint
app.get('/api/listings', (req, res) => {
  const listings = [
    { id: 1, name: 'Viper AWP', rarity: 'Covert', float: 0.06, price: 75 },
    { id: 2, name: 'Raven MP5', rarity: 'Classified', float: 0.12, price: 22 },
  ];
  const enriched = listings.map((l) => ({
    ...l,
    buy: calculate(l.price, 'buy'),
    sell: calculate(l.price, 'sell'),
  }));
  res.json(enriched);
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
