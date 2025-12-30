
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';

// --- TYPES ---
enum AppView {
  DASHBOARD = 'DASHBOARD',
  SPIN_LINKS = 'SPIN_LINKS',
  COIN_LINKS = 'COIN_LINKS'
}

// --- CONSTANTS & ICONS ---
const ICONS = {
  Logo: () => (
    <svg viewBox="0 0 100 100" className="w-10 h-10" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="48" stroke="#2563eb" strokeWidth="4" />
      <path d="M30 35H45V65H30M70 35H55V65H70M40 50H60" stroke="#2563eb" strokeWidth="6" strokeLinecap="round" />
    </svg>
  ),
  Spin: () => (
    <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21.5 2v6h-6M2.5 22v-6h6M2 12c0-4.4 3.6-8 8-8 3.3 0 6.1 2 7.3 4.9L21.5 8" />
    </svg>
  )
};

// --- COMPONENTS ---
const Dashboard = ({ onNavigate }) => (
  <div className="p-6 space-y-6">
    <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 flex justify-between items-center">
      <div>
        <h1 className="text-xl font-black italic">THV•rCoinmaster</h1>
        <p className="text-[10px] text-blue-600 font-bold uppercase tracking-widest">Version 1.5.0 Pro</p>
      </div>
      <ICONS.Logo />
    </div>

    <div className="grid gap-4">
      <button 
        onClick={() => onNavigate(AppView.SPIN_LINKS)}
        className="bg-blue-600 p-8 rounded-[2.5rem] text-white text-left relative overflow-hidden shadow-lg active:scale-95 transition-all"
      >
        <h3 className="text-3xl font-black italic">R-SPINS</h3>
        <p className="text-xs opacity-80 mt-1 uppercase font-bold">Cập nhật link mỗi ngày</p>
      </button>

      <button 
        onClick={() => onNavigate(AppView.COIN_LINKS)}
        className="bg-amber-500 p-8 rounded-[2.5rem] text-white text-left relative overflow-hidden shadow-lg active:scale-95 transition-all"
      >
        <h3 className="text-3xl font-black italic">R-COINS</h3>
        <p className="text-xs opacity-80 mt-1 uppercase font-bold">Nhận triệu vàng miễn phí</p>
      </button>
    </div>
  </div>
);

const LinkView = ({ type, onBack }) => {
  const [links, setLinks] = useState([]);
  
  useEffect(() => {
    // Giả lập dữ liệu
    const mock = Array.from({length: 10}, (_, i) => ({
      id: i,
      amount: type === 'spin' ? '25' : '3M',
      time: '1 giờ trước'
    }));
    setLinks(mock);
  }, [type]);

  return (
    <div className="animate-in slide-in-from-right-4 duration-300">
      <div className="p-6 flex items-center gap-4 bg-white sticky top-0 z-10 border-b">
        <button onClick={onBack} className="text-2xl">←</button>
        <h2 className="font-black uppercase italic">{type === 'spin' ? '🌀 Spin Links' : '💰 Coin Links'}</h2>
      </div>
      <div className="p-4 space-y-3">
        {links.map(link => (
          <div key={link.id} className="bg-white p-5 rounded-[2rem] border flex justify-between items-center">
            <div>
              <p className="text-2xl font-black italic">{link.amount} <span className="text-xs font-normal uppercase">{type === 'spin' ? 'Spins' : 'Vàng'}</span></p>
              <p className="text-[10px] text-gray-400 font-bold uppercase">{link.time} • Verified</p>
            </div>
            <button className="bg-blue-600 text-white px-6 py-2 rounded-full font-black text-xs uppercase shadow-md">Nhận</button>
          </div>
        ))}
      </div>
    </div>
  );
}

// --- MAIN APP ---
const App = () => {
  const [view, setView] = useState(AppView.DASHBOARD);

  useEffect(() => {
    // Ẩn loading sau khi App đã sẵn sàng
    const loader = document.getElementById('loading-screen');
    if (loader) {
      setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => loader.style.display = 'none', 500);
      }, 500);
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#f8fafc] max-w-md mx-auto shadow-xl">
      {view === AppView.DASHBOARD && <Dashboard onNavigate={setView} />}
      {view === AppView.SPIN_LINKS && <LinkView type="spin" onBack={() => setView(AppView.DASHBOARD)} />}
      {view === AppView.COIN_LINKS && <LinkView type="coin" onBack={() => setView(AppView.DASHBOARD)} />}
      
      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[70%] bg-white/90 backdrop-blur-md border p-2 rounded-full flex justify-around shadow-2xl">
        <button onClick={() => setView(AppView.DASHBOARD)} className="p-3 text-blue-600"><ICONS.Spin /></button>
        <button onClick={() => window.open('https://zalo.me/0927099940')} className="p-3 text-gray-400"><ICONS.Logo /></button>
      </nav>
    </div>
  );
};

export default App;
