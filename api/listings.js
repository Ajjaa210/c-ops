const { getListings } = require('../critical-ops-market/server/market');

module.exports = function listingsHandler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'method not allowed' });
  }

  return res.status(200).json(getListings());
};
