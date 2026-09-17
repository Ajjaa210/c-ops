import React, { useEffect, useState } from 'react';
import PriceCalculator from './components/PriceCalculator';

const defaultFriends = [{ id: 'you', name: 'My list', items: [] }];

function readFriends() {
  try {
    const savedFriends = window.localStorage.getItem('critical-ops-favourites');
    return savedFriends ? JSON.parse(savedFriends) : defaultFriends;
  } catch {
    return defaultFriends;
  }
}

function FavouritesView({ onBack }) {
  const [friends, setFriends] = useState(readFriends);
  const [activeFriendId, setActiveFriendId] = useState('you');
  const [itemName, setItemName] = useState('');
  const [itemType, setItemType] = useState('Skin');
  const [friendName, setFriendName] = useState('');
  const activeFriend = friends.find((friend) => friend.id === activeFriendId) || friends[0];

  useEffect(() => {
    window.localStorage.setItem('critical-ops-favourites', JSON.stringify(friends));
  }, [friends]);

  function addItem(event) {
    event.preventDefault();
    const name = itemName.trim();
    if (!name) return;
    setFriends((currentFriends) => currentFriends.map((friend) => (
      friend.id === activeFriend.id
        ? { ...friend, items: [...friend.items, { id: crypto.randomUUID(), name, type: itemType }] }
        : friend
    )));
    setItemName('');
  }

  function addFriend(event) {
    event.preventDefault();
    const name = friendName.trim();
    if (!name) return;
    const friend = { id: crypto.randomUUID(), name, items: [] };
    setFriends((currentFriends) => [...currentFriends, friend]);
    setActiveFriendId(friend.id);
    setFriendName('');
  }

  function removeItem(itemId) {
    setFriends((currentFriends) => currentFriends.map((friend) => (
      friend.id === activeFriend.id
        ? { ...friend, items: friend.items.filter((item) => item.id !== itemId) }
        : friend
    )));
  }

  return (
    <div className="min-h-screen px-4 py-6 text-slate-100 sm:px-8 sm:py-10">
      <div className="mx-auto max-w-6xl">
        <header className="flex flex-col gap-5 border-b border-white/15 pb-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <button type="button" onClick={onBack} className="mb-5 text-sm font-semibold text-cyan-300 transition hover:text-cyan-200">← Back to market</button>
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.25em] text-cyan-300">Squad loadout planner</p>
            <h1 className="text-4xl font-black tracking-tight sm:text-5xl">Favourites</h1>
            <p className="mt-3 max-w-xl text-slate-300">Keep every wanted skin, knife, and animation in one place for the whole squad.</p>
          </div>
          <div className="rounded-lg border border-cyan-300/30 bg-cyan-300/10 px-4 py-3 text-sm text-cyan-100">{friends.reduce((total, friend) => total + friend.items.length, 0)} items saved</div>
        </header>

        <main className="mt-8 grid gap-6 lg:grid-cols-[240px_1fr]">
          <aside className="rounded-xl border border-white/10 bg-slate-950/65 p-4 shadow-2xl">
            <div className="mb-3 flex items-center justify-between"><h2 className="text-sm font-bold uppercase tracking-wider text-slate-300">Friends</h2><span className="text-xs text-slate-500">{friends.length}</span></div>
            <div className="space-y-2">
              {friends.map((friend) => (
                <button type="button" key={friend.id} onClick={() => setActiveFriendId(friend.id)} className={`flex w-full items-center justify-between rounded-lg px-3 py-3 text-left text-sm font-semibold transition ${activeFriend.id === friend.id ? 'bg-cyan-300 text-slate-950' : 'bg-white/5 text-slate-300 hover:bg-white/10'}`}>
                  <span className="truncate">{friend.name}</span><span>{friend.items.length}</span>
                </button>
              ))}
            </div>
            <form onSubmit={addFriend} className="mt-6 border-t border-white/10 pt-5">
              <label htmlFor="friend-name" className="text-xs font-semibold uppercase tracking-wider text-slate-400">Add friend</label>
              <div className="mt-2 flex gap-2"><input id="friend-name" value={friendName} onChange={(event) => setFriendName(event.target.value)} placeholder="Name" className="min-w-0 flex-1 rounded-md border border-white/10 bg-slate-900 px-3 py-2 text-sm outline-none focus:border-cyan-300" /><button type="submit" aria-label="Add friend" className="rounded-md bg-white/10 px-3 text-lg text-cyan-300 transition hover:bg-white/20">+</button></div>
            </form>
          </aside>

          <section className="rounded-xl border border-white/10 bg-slate-950/65 p-5 shadow-2xl sm:p-7">
            <div className="flex items-start justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-wider text-slate-500">Wishlist tab</p><h2 className="mt-1 text-2xl font-bold text-white">{activeFriend.name}</h2></div><span className="rounded-full bg-white/10 px-3 py-1 text-xs text-slate-300">{activeFriend.items.length} wanted</span></div>
            <form onSubmit={addItem} className="mt-7 grid gap-3 rounded-lg border border-cyan-300/20 bg-cyan-300/5 p-4 sm:grid-cols-[1fr_150px_auto] sm:items-end">
              <label className="text-sm font-semibold text-slate-300">Item name<input value={itemName} onChange={(event) => setItemName(event.target.value)} placeholder="e.g. Karambit | Neon" className="mt-2 w-full rounded-md border border-white/10 bg-slate-900 px-3 py-3 font-normal text-white outline-none focus:border-cyan-300" /></label>
              <label className="text-sm font-semibold text-slate-300">Type<select value={itemType} onChange={(event) => setItemType(event.target.value)} className="mt-2 w-full rounded-md border border-white/10 bg-slate-900 px-3 py-3 font-normal text-white outline-none focus:border-cyan-300"><option>Skin</option><option>Knife</option><option>Animation</option></select></label>
              <button type="submit" className="rounded-md bg-cyan-300 px-5 py-3 font-bold text-slate-950 transition hover:bg-cyan-200">Save item</button>
            </form>
            <div className="mt-7 space-y-3">
              {activeFriend.items.length === 0 ? <div className="rounded-lg border border-dashed border-white/15 px-5 py-12 text-center text-slate-400">This tab is empty. Add the first item your friend wants to buy.</div> : activeFriend.items.map((item) => (
                <div key={item.id} className="flex items-center justify-between gap-4 rounded-lg border border-white/10 bg-white/5 px-4 py-4"><div className="min-w-0"><p className="truncate font-semibold text-white">{item.name}</p><p className="mt-1 text-xs uppercase tracking-wider text-cyan-300">{item.type}</p></div><button type="button" onClick={() => removeItem(item.id)} className="shrink-0 text-sm font-semibold text-slate-500 transition hover:text-red-300">Remove</button></div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default function App() {
  const [view, setView] = useState('calculator');

  if (view === 'favourites') return <FavouritesView onBack={() => setView('calculator')} />;

  return (
    <div className="min-h-screen flex flex-col items-center p-6">
      <header className="max-w-4xl w-full text-center mb-8">
        <button type="button" onClick={() => setView('favourites')} className="absolute right-6 top-6 rounded-md border border-cyan-300/40 bg-slate-950/60 px-4 py-2 text-sm font-bold text-cyan-200 shadow-lg transition hover:bg-cyan-300 hover:text-slate-950">Favourites</button>
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
