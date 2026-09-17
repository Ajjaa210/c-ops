const { getFavourites, addFriend, addItem, removeItem } = require('../critical-ops-market/server/favourites');

module.exports = function favouritesHandler(req, res) {
  if (req.method === 'GET') return res.status(200).json(getFavourites());

  if (req.method === 'POST') {
    const { action, friendId, name, type } = req.body || {};
    if (action === 'friend' && typeof name === 'string' && name.trim()) {
      return res.status(201).json(addFriend(name.trim()));
    }
    if (action === 'item' && typeof friendId === 'string' && typeof name === 'string' && name.trim() && ['Skin', 'Knife', 'Animation'].includes(type)) {
      const item = addItem(friendId, name.trim(), type);
      return item ? res.status(201).json(item) : res.status(404).json({ error: 'friend not found' });
    }
    return res.status(400).json({ error: 'invalid favourite' });
  }

  if (req.method === 'DELETE') {
    const { friendId, itemId } = req.body || {};
    return removeItem(friendId, itemId)
      ? res.status(204).end()
      : res.status(404).json({ error: 'item not found' });
  }

  res.setHeader('Allow', 'GET, POST, DELETE');
  return res.status(405).json({ error: 'method not allowed' });
};