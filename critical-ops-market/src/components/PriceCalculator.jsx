import React, { useState } from 'react';

const formatCurrency = (num) =>
  Number.isNaN(num) ? '-' : num.toFixed(2);

function CreditsAmount({ value }) {
  return (
    <span className="inline-flex items-center gap-1">
      <img src="/credits-symbol.png" alt="" className="h-5 w-5 object-contain" />
      {formatCurrency(value)}
    </span>
  );
}

export default function PriceCalculator() {
  const [buyingValue, setBuyingValue] = useState('');
  const [sellingValue, setSellingValue] = useState('');

  const parsedBuyingValue = parseFloat(buyingValue);
  const parsedSellingValue = parseFloat(sellingValue);
  const validBuyingValue = !Number.isNaN(parsedBuyingValue) && parsedBuyingValue >= 0;
  const validSellingValue = !Number.isNaN(parsedSellingValue) && parsedSellingValue >= 0;

  const buyingTax = validBuyingValue ? parsedBuyingValue * 0.25 : 0;
  const totalBuyingCost = validBuyingValue ? parsedBuyingValue + buyingTax : 0;
  const sellingTax = validSellingValue ? parsedSellingValue * 0.20 : 0;
  const netSellingValue = validSellingValue ? parsedSellingValue - sellingTax : 0;
  const profit = validBuyingValue && validSellingValue ? netSellingValue - totalBuyingCost : 0;

  const inputClassName = 'w-full p-3 rounded-md bg-slate-900 border border-slate-700 focus:outline-none';

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Price & Tax Calculator</h2>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm text-slate-300">
          Buying value
          <input
            type="number"
            min="0"
            step="0.01"
            value={buyingValue}
            onChange={(event) => setBuyingValue(event.target.value)}
            className={`${inputClassName} mt-2`}
            placeholder="0.00"
          />
        </label>
        <label className="block text-sm text-slate-300">
          Selling value
          <input
            type="number"
            min="0"
            step="0.01"
            value={sellingValue}
            onChange={(event) => setSellingValue(event.target.value)}
            className={`${inputClassName} mt-2`}
            placeholder="0.00"
          />
        </label>
      </div>

      <div className="mt-6 space-y-3 text-slate-200">
        <div className="flex justify-between">
          <span>Buying Value</span>
          <strong>{validBuyingValue ? <CreditsAmount value={parsedBuyingValue} /> : '-'}</strong>
        </div>
        <div className="flex justify-between">
          <span>Buying Tax (25%)</span>
          <strong className="text-yellow-300">{validBuyingValue ? <CreditsAmount value={buyingTax} /> : '-'}</strong>
        </div>
        <div className="flex justify-between pt-3 border-t border-slate-700">
          <span>Total Buying Cost</span>
          <strong>{validBuyingValue ? <CreditsAmount value={totalBuyingCost} /> : '-'}</strong>
        </div>
        <div className="flex justify-between pt-3 border-t border-slate-700">
          <span>Selling Value</span>
          <strong>{validSellingValue ? <CreditsAmount value={parsedSellingValue} /> : '-'}</strong>
        </div>
        <div className="flex justify-between">
          <span>Selling Tax (20%)</span>
          <strong className="text-yellow-300">{validSellingValue ? <CreditsAmount value={sellingTax} /> : '-'}</strong>
        </div>
        <div className="flex justify-between">
          <span>Net Selling Value</span>
          <strong>{validSellingValue ? <CreditsAmount value={netSellingValue} /> : '-'}</strong>
        </div>
        <div className="flex justify-between pt-3 border-t border-slate-700">
          <span className="text-lg font-semibold">PROFIT</span>
          <strong className={`text-lg ${profit >= 0 ? 'text-emerald-300' : 'text-red-300'}`}>
            {validBuyingValue && validSellingValue ? <CreditsAmount value={profit} /> : '-'}
          </strong>
        </div>
      </div>

      <div className="mt-6 text-sm text-slate-400">
        Enter both values to calculate the after-tax profit.
      </div>
    </div>
  );
}
