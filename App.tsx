
import React, { useState, useEffect } from 'react';
import { AppView, EventSession } from './types.ts';
import { CONTACT_INFO, ICONS } from './constants.tsx';
import Dashboard from './components/Dashboard.tsx';
import LinkView from './components/LinkView.tsx';
import EventCounter from './components/EventCounter.tsx';
import HistoryView from './components/HistoryView.tsx';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.DASHBOARD);
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [sessions, setSessions] = useState<EventSession[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Khởi tạo app an toàn
    const init = () => {
      try {
        const saved = localStorage.getItem('v_sym_data_v4');
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed)) setSessions(parsed);
        }
        
        if (localStorage.getItem('v_theme') === 'dark') {
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
    if (isLoaded) {
      localStorage.setItem('v_sym_data_v4', JSON.stringify(sessions));
    }
  }, [sessions, isLoaded]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('v_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('v_theme', 'light');
    }
  }, [darkMode]);

  if (!isLoaded) return null;

  const handleSaveSession = (session: EventSession) => {
    setSessions(prev => [session, ...prev.slice(0, 20)]);
  };

  const renderView = () => {
    switch (currentView) {
      case AppView.DASHBOARD:
        return <Dashboard onViewChange={setCurrentView} />;
      case AppView.SPIN_LINKS:
        return <LinkView type="spin" onBack={() => setCurrentView(AppView.DASHBOARD)} />;
      case AppView.COIN_LINKS:
        return <LinkView type="coin" onBack={() => setCurrentView(AppView.DASHBOARD)} />;
      case AppView.EVENT_COUNTER:
        return <EventCounter onBack={() => setCurrentView(AppView.DASHBOARD)} onSave={handleSaveSession} isOverlay={false} />;
      case AppView.HISTORY:
        return <HistoryView sessions={sessions} onBack={() => setCurrentView(AppView.DASHBOARD)} />;
      case AppView.CONTACT:
        return (
          <div className="p-6 animate-in slide-in-from-bottom-4 duration-500">
            <button onClick={() => setCurrentView(AppView.DASHBOARD)} className="mb-6 flex items-center text-blue-600 font-bold bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-100">
              ← Quay lại
            </button>
            <div className="bg-white dark:bg-gray-800 p-8 rounded-[3rem] shadow-xl text-center border border-gray-100 dark:border-gray-700">
              <div className="w-20 h-20 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-3xl mx-auto mb-4 flex items-center justify-center text-white text-3xl font-black shadow-xl shadow-blue-200 dark:shadow-none">V</div>
              <h2 className="text-xl font-black dark:text-white uppercase tracking-tight">『Spin』Vũ•Sym</h2>
              <p className="text-gray-400 text-[10px] mb-6 uppercase tracking-widest font-black">Support Technical 24/7</p>
              
              <div className="space-y-3">
                <a href={`tel:${CONTACT_INFO.phone}`} className="flex items-center justify-center gap-3 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-2xl border border-blue-100 dark:border-blue-800">
                  <span className="font-black text-blue-600 dark:text-blue-400 text-lg">{CONTACT_INFO.phone}</span>
                </a>
                <a href={`https://zalo.me/${CONTACT_INFO.phone}`} target="_blank" className="flex items-center justify-center gap-3 p-4 bg-emerald-50 dark:bg-emerald-900/30 rounded-2xl border border-emerald-100 dark:border-emerald-800">
                  <span className="font-black text-emerald-600 dark:text-emerald-400 text-lg uppercase tracking-tight">Nhắn Zalo Admin</span>
                </a>
              </div>
            </div>
          </div>
        );
      default:
        return <Dashboard onViewChange={setCurrentView} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-gray-900 transition-colors duration-300 flex flex-col font-sans">
      <header className="px-6 py-4 flex justify-between items-center bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-700 sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white shadow-lg"><ICONS.Spin className="w-5 h-5" /></div>
          <span className="font-black text-lg dark:text-white uppercase tracking-tighter">VŨ•<span className="text-blue-600">SYM</span></span>
        </div>
        <button onClick={() => setDarkMode(!darkMode)} className="w-10 h-10 flex items-center justify-center bg-gray-50 dark:bg-gray-700 rounded-full border border-gray-100 dark:border-gray-600">
          {darkMode ? '☀️' : '🌙'}
        </button>
      </header>

      <main className="flex-1 max-w-2xl mx-auto w-full pb-32">
        {renderView()}
      </main>

      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-md bg-white/90 dark:bg-gray-800/95 backdrop-blur-xl border border-gray-200 dark:border-gray-700 p-2 flex justify-around items-center rounded-full z-50 shadow-2xl">
        <button onClick={() => setCurrentView(AppView.DASHBOARD)} className={`p-4 rounded-full transition-all ${currentView === AppView.DASHBOARD ? 'bg-blue-600 text-white shadow-lg shadow-blue-400' : 'text-gray-400'}`}><ICONS.Spin className="w-6 h-6" /></button>
        <button onClick={() => setCurrentView(AppView.EVENT_COUNTER)} className={`p-4 rounded-full transition-all ${currentView === AppView.EVENT_COUNTER ? 'bg-blue-600 text-white shadow-lg shadow-blue-400' : 'text-gray-400'}`}><ICONS.Event className="w-6 h-6" /></button>
        <button onClick={() => setCurrentView(AppView.HISTORY)} className={`p-4 rounded-full transition-all ${currentView === AppView.HISTORY ? 'bg-blue-600 text-white shadow-lg shadow-blue-400' : 'text-gray-400'}`}><ICONS.History className="w-6 h-6" /></button>
        <button onClick={() => setCurrentView(AppView.CONTACT)} className={`p-4 rounded-full transition-all ${currentView === AppView.CONTACT ? 'bg-blue-600 text-white shadow-lg shadow-blue-400' : 'text-gray-400'}`}><ICONS.Pig className="w-6 h-6" /></button>
      </nav>
    </div>
  );
};

export default App;
