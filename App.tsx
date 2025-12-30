
import React, { useState, useEffect } from 'react';
import { AppView } from './types.ts';
import { CONTACT_INFO, ICONS } from './constants.tsx';
import Dashboard from './components/Dashboard.tsx';
import LinkView from './components/LinkView.tsx';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.DASHBOARD);
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const init = () => {
      try {
        if (localStorage.getItem('thv_theme_v1') === 'dark') {
          setDarkMode(true);
        }
      } catch (e) {
        console.warn("Storage reset");
      } finally {
        setIsLoaded(true);
      }
    };
    init();
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('thv_theme_v1', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('thv_theme_v1', 'light');
    }
  }, [darkMode]);

  if (!isLoaded) return null;

  const renderView = () => {
    switch (currentView) {
      case AppView.DASHBOARD:
        return <Dashboard onViewChange={setCurrentView} />;
      case AppView.SPIN_LINKS:
        return <LinkView type="spin" onBack={() => setCurrentView(AppView.DASHBOARD)} />;
      case AppView.COIN_LINKS:
        return <LinkView type="coin" onBack={() => setCurrentView(AppView.DASHBOARD)} />;
      case AppView.CONTACT:
        return (
          <div className="p-6 animate-in slide-in-from-bottom-4 duration-500">
            <button onClick={() => setCurrentView(AppView.DASHBOARD)} className="mb-8 w-12 h-12 flex items-center justify-center bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 active:scale-90 transition-transform">
              <span className="text-xl">←</span>
            </button>
            <div className="bg-white dark:bg-gray-800 p-10 rounded-[3.5rem] shadow-xl text-center border border-gray-100 dark:border-gray-700 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-5">
                <ICONS.LogoTHV className="w-40 h-40" />
              </div>
              <div className="w-24 h-24 mx-auto mb-6 relative">
                 <ICONS.LogoTHV className="w-full h-full drop-shadow-2xl" />
                 <div className="absolute -bottom-2 -right-2 bg-blue-600 text-white p-1 rounded-full border-2 border-white">
                   <ICONS.Badge className="w-4 h-4" />
                 </div>
              </div>
              <h2 className="text-2xl font-black dark:text-white uppercase tracking-tighter italic">『THV』Vũ•rCoinmaster</h2>
              <p className="text-gray-400 text-[10px] mb-8 uppercase tracking-widest font-black flex items-center justify-center gap-2">
                 <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                 Official Licensed System
              </p>
              
              <div className="space-y-4">
                <a href={`tel:${CONTACT_INFO.phone}`} className="flex items-center justify-center gap-3 p-5 bg-blue-50 dark:bg-blue-900/30 rounded-3xl border border-blue-100 dark:border-blue-800 transition active:scale-95 group">
                  <span className="font-black text-blue-600 dark:text-blue-400 text-lg group-hover:tracking-widest transition-all italic">{CONTACT_INFO.phone}</span>
                </a>
                <a href={`https://zalo.me/${CONTACT_INFO.zalo}`} target="_blank" className="flex items-center justify-center gap-3 p-5 bg-emerald-50 dark:bg-emerald-900/30 rounded-3xl border border-emerald-100 dark:border-emerald-800 transition active:scale-95 group">
                  <span className="font-black text-emerald-600 dark:text-emerald-400 text-sm uppercase tracking-widest group-hover:tracking-[0.2em] transition-all">NHẮN ZALO ADMIN</span>
                </a>
              </div>
              <p className="mt-8 text-[9px] text-gray-400 font-bold uppercase tracking-tight">Copyright © 2025 THV Group. All Rights Reserved.</p>
            </div>
          </div>
        );
      default:
        return <Dashboard onViewChange={setCurrentView} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-gray-900 transition-colors duration-300 flex flex-col font-sans selection:bg-blue-100">
      <header className="px-6 py-5 flex justify-between items-center bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-700 sticky top-0 z-50">
        <div onClick={() => setCurrentView(AppView.DASHBOARD)} className="flex items-center gap-3 cursor-pointer group">
          <div className="w-10 h-10 transition-transform group-hover:scale-110 duration-500"><ICONS.LogoTHV className="w-full h-full" /></div>
          <div>
            <h1 className="font-black text-sm dark:text-white leading-none tracking-tighter uppercase italic">『THV』Vũ•<span className="text-blue-600">rCM</span></h1>
            <p className="text-[8px] font-black text-blue-500 uppercase tracking-widest mt-0.5">Official Version</p>
          </div>
        </div>
        <button onClick={() => setDarkMode(!darkMode)} className="w-10 h-10 flex items-center justify-center bg-gray-50 dark:bg-gray-700 rounded-xl border border-gray-100 dark:border-gray-600 transition-all active:scale-90 shadow-sm">
          {darkMode ? '☀️' : '🌙'}
        </button>
      </header>

      <main className="flex-1 max-w-lg mx-auto w-full overflow-x-hidden">
        {renderView()}
      </main>

      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[70%] max-w-xs bg-white/90 dark:bg-gray-800/95 backdrop-blur-xl border border-gray-200 dark:border-gray-700 p-2.5 flex justify-around items-center rounded-full z-50 shadow-[0_20px_50px_rgba(37,99,235,0.15)]">
        <button 
          onClick={() => setCurrentView(AppView.DASHBOARD)} 
          className={`p-4 rounded-full transition-all duration-300 ${currentView === AppView.DASHBOARD ? 'bg-blue-600 text-white shadow-lg shadow-blue-400 scale-110' : 'text-gray-400 hover:text-blue-500'}`}
        >
          <ICONS.Spin className="w-6 h-6" />
        </button>
        <button 
          onClick={() => setCurrentView(AppView.CONTACT)} 
          className={`p-4 rounded-full transition-all duration-300 ${currentView === AppView.CONTACT ? 'bg-blue-600 text-white shadow-lg shadow-blue-400 scale-110' : 'text-gray-400 hover:text-blue-500'}`}
        >
          <ICONS.LogoTHV className="w-6 h-6" />
        </button>
      </nav>
    </div>
  );
};

export default App;
