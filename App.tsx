
import React, { useState, useEffect } from 'react';
import { AppView, EventType, EventSession } from './types';
import { CONTACT_INFO, ICONS } from './constants';
import Dashboard from './components/Dashboard';
import LinkView from './components/LinkView';
import EventCounter from './components/EventCounter';
import HistoryView from './components/HistoryView';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.DASHBOARD);
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [sessions, setSessions] = useState<EventSession[]>([]);

  useEffect(() => {
    const savedSessions = localStorage.getItem('spin_sessions');
    if (savedSessions) {
      setSessions(JSON.parse(savedSessions));
    }
    const isDark = localStorage.getItem('theme') === 'dark' || 
                 (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
    setDarkMode(isDark);
  }, []);

  useEffect(() => {
    localStorage.setItem('spin_sessions', JSON.stringify(sessions));
  }, [sessions]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const handleSaveSession = (session: EventSession) => {
    setSessions(prev => [session, ...prev.slice(0, 10)]);
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
        return (
          <EventCounter 
            onBack={() => setCurrentView(AppView.DASHBOARD)} 
            onSave={handleSaveSession}
            isOverlay={false}
          />
        );
      case AppView.HISTORY:
        return <HistoryView sessions={sessions} onBack={() => setCurrentView(AppView.DASHBOARD)} />;
      case AppView.CONTACT:
        return (
          <div className="p-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <button onClick={() => setCurrentView(AppView.DASHBOARD)} className="mb-6 flex items-center text-blue-600 dark:text-blue-400 font-semibold bg-blue-50 dark:bg-blue-900/20 px-4 py-2 rounded-2xl transition">
              <span className="mr-2">←</span> Quay lại
            </button>
            <div className="bg-white dark:bg-gray-800 p-8 rounded-[3rem] shadow-xl border border-gray-100 dark:border-gray-700 text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full -mr-10 -mt-10 blur-2xl"></div>
              <div className="w-24 h-24 bg-gradient-to-tr from-blue-600 to-indigo-500 rounded-full mx-auto mb-6 flex items-center justify-center text-white text-3xl font-bold shadow-lg shadow-blue-200 dark:shadow-none">
                Vũ
              </div>
              <h1 className="text-2xl font-black mb-1 dark:text-white uppercase tracking-tight">『Spin』Vũ•rCoinmaster</h1>
              <p className="text-gray-500 dark:text-gray-400 mb-8 font-medium">Hệ thống hỗ trợ game chuyên nghiệp</p>
              
              <div className="space-y-4">
                <a href={`tel:${CONTACT_INFO.phone}`} className="flex items-center p-5 bg-gray-50 dark:bg-gray-700/50 rounded-[2rem] border border-transparent hover:border-blue-200 dark:hover:border-blue-900 transition-all group">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-2xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                  </div>
                  <div className="text-left">
                    <p className="text-[10px] text-gray-400 uppercase font-black tracking-widest">Hotline Zalo</p>
                    <p className="font-bold text-lg dark:text-white">{CONTACT_INFO.phone}</p>
                  </div>
                </a>
              </div>
              <p className="mt-8 text-xs text-gray-400">© 2024 Mr Vũ. All Rights Reserved.</p>
            </div>
          </div>
        );
      default:
        return <Dashboard onViewChange={setCurrentView} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <header className="px-6 py-5 flex justify-between items-center bg-white/80 dark:bg-gray-800/80 backdrop-blur-md shadow-sm sticky top-0 z-40 border-b border-gray-100 dark:border-gray-700">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center text-white shadow-md shadow-blue-200 dark:shadow-none">
            <ICONS.Spin className="w-6 h-6" />
          </div>
          <h1 className="font-black text-xl dark:text-white tracking-tight">VŨ•<span className="text-blue-600">SPIN</span></h1>
        </div>
        <button onClick={toggleDarkMode} className="w-10 h-10 flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded-full text-gray-600 dark:text-yellow-400 transition-all hover:scale-110 active:scale-95">
          {darkMode ? '☀️' : '🌙'}
        </button>
      </header>

      <main className="max-w-2xl mx-auto pb-28">
        {renderView()}
      </main>

      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-md bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 px-2 py-2 flex justify-between items-center rounded-[2.5rem] z-40 shadow-2xl shadow-blue-200/50 dark:shadow-none">
        <button onClick={() => setCurrentView(AppView.DASHBOARD)} className={`flex-1 py-3 flex justify-center rounded-[2rem] transition-all ${currentView === AppView.DASHBOARD ? 'text-blue-600 bg-blue-50 dark:bg-blue-900/30' : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'}`}>
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>
        </button>
        <button onClick={() => setCurrentView(AppView.EVENT_COUNTER)} className={`flex-1 py-3 flex justify-center rounded-[2rem] transition-all ${currentView === AppView.EVENT_COUNTER ? 'text-blue-600 bg-blue-50 dark:bg-blue-900/30' : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'}`}>
          <ICONS.Event className="w-6 h-6" />
        </button>
        <button onClick={() => setCurrentView(AppView.HISTORY)} className={`flex-1 py-3 flex justify-center rounded-[2rem] transition-all ${currentView === AppView.HISTORY ? 'text-blue-600 bg-blue-50 dark:bg-blue-900/30' : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'}`}>
          <ICONS.History className="w-6 h-6" />
        </button>
        <button onClick={() => setCurrentView(AppView.CONTACT)} className={`flex-1 py-3 flex justify-center rounded-[2rem] transition-all ${currentView === AppView.CONTACT ? 'text-blue-600 bg-blue-50 dark:bg-blue-900/30' : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'}`}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
        </button>
      </nav>
    </div>
  );
};

export default App;
