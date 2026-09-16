const { calculateTax } = require('../critical-ops-market/server/market');

module.exports = function taxHandler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'method not allowed' });
  }

  const { value, mode } = req.body || {};
  if (!['buy', 'sell'].includes(mode)) {
    return res.status(400).json({ error: 'mode must be "buy" or "sell"' });
  }

  const result = calculateTax(value, mode);
  if (!result) {
    return res.status(400).json({ error: 'invalid value' });
  }

  return res.status(200).json(result);
};
