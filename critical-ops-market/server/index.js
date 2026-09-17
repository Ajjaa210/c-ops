const express = require('express');
const cors = require('cors');
const { calculateTax, getListings } = require('./market');
const { getFavourites, addFriend, addItem, removeItem } = require('./favourites');
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

app.get('/api/favourites', (req, res) => res.json(getFavourites()));

app.post('/api/favourites', (req, res) => {
  const { action, friendId, name, type } = req.body || {};
  if (action === 'friend' && typeof name === 'string' && name.trim()) {
    return res.status(201).json(addFriend(name.trim()));
  }
  if (action === 'item' && typeof friendId === 'string' && typeof name === 'string' && name.trim() && ['Skin', 'Knife', 'Animation'].includes(type)) {
    const item = addItem(friendId, name.trim(), type);
    return item ? res.status(201).json(item) : res.status(404).json({ error: 'friend not found' });
  }
  return res.status(400).json({ error: 'invalid favourite' });
});

app.delete('/api/favourites', (req, res) => {
  const { friendId, itemId } = req.body || {};
  return removeItem(friendId, itemId) ? res.status(204).end() : res.status(404).json({ error: 'item not found' });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
