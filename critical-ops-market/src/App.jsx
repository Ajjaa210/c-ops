import React from 'react';
import PriceCalculator from './components/PriceCalculator';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col items-center p-6">
      <header className="max-w-4xl w-full text-center mb-8">
        <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
          Critical Ops — Skin Market
        </h1>
        <p className="mt-2 text-slate-300">
          Attractive listings and transparent fees. Buy or sell skins with automated tax breakdowns.
        </p>
      </header>

      <main className="max-w-xl w-full">
        <div className="p-6 bg-slate-800/60 rounded-xl shadow-lg">
          <PriceCalculator />
        </div>
      </main>

      <footer className="mt-12 text-slate-400 text-sm">
        Note: Client-side calculations are for display only. For real transactions, taxes must be enforced server-side.
      </footer>
    </div>
  );
}
