
import React, { useState, useEffect, useCallback } from 'react';
import { AppView, EventType, EventSession } from './types';
import { CONTACT_INFO, ICONS } from './constants';
import Dashboard from './components/Dashboard';
import LinkView from './components/LinkView';
import EventCounter from './components/EventCounter';
import HistoryView from './components/HistoryView';
import DeveloperResources from './components/DeveloperResources';
import { GoogleGenAI } from "@google/genai";

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.DASHBOARD);
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [sessions, setSessions] = useState<EventSession[]>([]);
  const [showOverlay, setShowOverlay] = useState<boolean>(false);

  // Load state
  useEffect(() => {
    const savedSessions = localStorage.getItem('spin_sessions');
    if (savedSessions) {
      setSessions(JSON.parse(savedSessions));
    }
    
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setDarkMode(true);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('spin_sessions', JSON.stringify(sessions));
  }, [sessions]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const handleSaveSession = (session: EventSession) => {
    setSessions(prev => [session, ...prev.slice(0, 6)]);
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
      case AppView.USAGE:
        return (
          <div className="p-6">
            <button onClick={() => setCurrentView(AppView.DASHBOARD)} className="mb-6 flex items-center text-blue-500 font-semibold">
              <span className="mr-2">←</span> Quay lại
            </button>
            <h1 className="text-2xl font-bold mb-4">Hướng dẫn sử dụng</h1>
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <section className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                <h2 className="font-bold text-lg mb-2 text-blue-600 dark:text-blue-400">1. Nhận Spin/Coin Miễn Phí</h2>
                <p>Truy cập chuyên mục "Spin Links" hoặc "Coin Links" để xem danh sách link mới nhất được cập nhật từ hệ thống. Nhấn "Nhận" để mở trò chơi và nhận quà.</p>
              </section>
              <section className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                <h2 className="font-bold text-lg mb-2 text-blue-600 dark:text-blue-400">2. Bộ đếm sự kiện</h2>
                <p>Sử dụng để ghi lại số lượt xuất hiện của các biểu tượng (Búa, Heo, SYM, Khiên) trong quá trình chơi để tính toán chiến thuật quay.</p>
              </section>
              <section className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                <h2 className="font-bold text-lg mb-2 text-blue-600 dark:text-blue-400">3. Chế độ nổi (Overlay)</h2>
                <p>Trong chuyên mục "Vòng quay sự kiện", bạn có thể kích hoạt chế độ thu nhỏ để vừa chơi vừa đếm lượt mà không cần chuyển app.</p>
              </section>
            </div>
          </div>
        );
      case AppView.CONTACT:
        return (
          <div className="p-6">
            <button onClick={() => setCurrentView(AppView.DASHBOARD)} className="mb-6 flex items-center text-blue-500 font-semibold">
              <span className="mr-2">←</span> Quay lại
            </button>
            <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-lg border border-gray-100 dark:border-gray-700 text-center">
              <div className="w-24 h-24 bg-gradient-to-tr from-blue-500 to-cyan-400 rounded-full mx-auto mb-6 flex items-center justify-center text-white text-3xl font-bold">
                Vũ
              </div>
              <h1 className="text-2xl font-bold mb-2">『Spin』Vũ•rCoinmaster</h1>
              <p className="text-gray-500 dark:text-gray-400 mb-8">Ứng dụng hỗ trợ trò chơi hàng đầu</p>
              
              <div className="space-y-4 text-left">
                <a href={`tel:${CONTACT_INFO.phone}`} className="flex items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-2xl">
                  <span className="mr-4 text-green-500">📞</span>
                  <div>
                    <p className="text-xs text-gray-400 uppercase font-bold">Số điện thoại</p>
                    <p className="font-semibold">{CONTACT_INFO.phone} - Mr Vũ</p>
                  </div>
                </a>
                <a href={`mailto:${CONTACT_INFO.email}`} className="flex items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-2xl">
                  <span className="mr-4 text-blue-500">📧</span>
                  <div>
                    <p className="text-xs text-gray-400 uppercase font-bold">Email</p>
                    <p className="font-semibold">{CONTACT_INFO.email}</p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        );
        case AppView.DEVELOPER_RESOURCES:
          return <DeveloperResources onBack={() => setCurrentView(AppView.DASHBOARD)} />;
      default:
        return <Dashboard onViewChange={setCurrentView} />;
    }
  };

  return (
    <div className={`${darkMode ? 'dark' : ''} min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors`}>
      <header className="px-6 py-4 flex justify-between items-center bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-40">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white">
            <ICONS.Spin className="w-6 h-6" />
          </div>
          <h1 className="font-bold text-lg dark:text-white truncate max-w-[150px] sm:max-w-none">『Spin』Vũ•rCoinmaster</h1>
        </div>
        <div className="flex gap-2">
          <button 
             onClick={() => setCurrentView(AppView.DEVELOPER_RESOURCES)}
             className="p-2 bg-gray-100 dark:bg-gray-700 rounded-full text-blue-500 hover:scale-105 transition"
             title="Mã nguồn (PHP/Android)"
          >
             <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
          </button>
          <button 
            onClick={toggleDarkMode}
            className="p-2 bg-gray-100 dark:bg-gray-700 rounded-full dark:text-yellow-400 text-gray-600 hover:rotate-12 transition"
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
        </div>
      </header>

      <main className="max-w-2xl mx-auto pb-20">
        {renderView()}
      </main>

      {/* Floating Simulation for Event Counter */}
      {showOverlay && (
        <div className="fixed bottom-10 right-10 z-50 animate-bounce pointer-events-none">
          <div className="bg-blue-600 text-white px-4 py-2 rounded-full shadow-2xl flex items-center gap-2 pointer-events-auto cursor-pointer" onClick={() => setCurrentView(AppView.EVENT_COUNTER)}>
             <ICONS.Event className="w-5 h-5" />
             <span className="text-xs font-bold">Mở bộ đếm</span>
          </div>
        </div>
      )}

      {/* Persistent Navigation (Desktop Mockup) */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700 px-6 py-3 flex justify-around items-center md:hidden z-40">
        <button onClick={() => setCurrentView(AppView.DASHBOARD)} className={`p-2 rounded-xl transition ${currentView === AppView.DASHBOARD ? 'text-blue-600 bg-blue-50 dark:bg-blue-900/20' : 'text-gray-400'}`}>
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>
        </button>
        <button onClick={() => setCurrentView(AppView.EVENT_COUNTER)} className={`p-2 rounded-xl transition ${currentView === AppView.EVENT_COUNTER ? 'text-blue-600 bg-blue-50 dark:bg-blue-900/20' : 'text-gray-400'}`}>
          <ICONS.Event className="w-6 h-6" />
        </button>
        <button onClick={() => setCurrentView(AppView.HISTORY)} className={`p-2 rounded-xl transition ${currentView === AppView.HISTORY ? 'text-blue-600 bg-blue-50 dark:bg-blue-900/20' : 'text-gray-400'}`}>
          <ICONS.History className="w-6 h-6" />
        </button>
        <button onClick={() => setCurrentView(AppView.CONTACT)} className={`p-2 rounded-xl transition ${currentView === AppView.CONTACT ? 'text-blue-600 bg-blue-50 dark:bg-blue-900/20' : 'text-gray-400'}`}>
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
        </button>
      </nav>
    </div>
  );
};

export default App;
