const BUY_TAX = 0.25;
const SELL_TAX = 0.20;

function calculateTax(value, mode) {
  const numericValue = Number(value);
  if (!Number.isFinite(numericValue) || numericValue < 0) return null;

  const taxRate = mode === 'buy' ? BUY_TAX : SELL_TAX;
  const tax = numericValue * taxRate;
  const total = mode === 'buy' ? numericValue + tax : Math.max(0, numericValue - tax);

  return {
    value: Number(numericValue.toFixed(2)),
    tax: Number(tax.toFixed(2)),
    total: Number(total.toFixed(2)),
  };
}

function getListings() {
  const listings = [
    { id: 1, name: 'Viper AWP', rarity: 'Covert', float: 0.06, price: 75 },
    { id: 2, name: 'Raven MP5', rarity: 'Classified', float: 0.12, price: 22 },
  ];

  return listings.map((listing) => ({
    ...listing,
    buy: calculateTax(listing.price, 'buy'),
    sell: calculateTax(listing.price, 'sell'),
  }));
}

module.exports = { calculateTax, getListings };
