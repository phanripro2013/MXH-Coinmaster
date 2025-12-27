
import React, { useState, useCallback } from 'react';
import { EventType, EventSession } from '../types';
import { ICONS } from '../constants';

interface EventCounterProps {
  onBack: () => void;
  onSave: (session: EventSession) => void;
  isOverlay: boolean;
}

const EventCounter: React.FC<EventCounterProps> = ({ onBack, onSave, isOverlay }) => {
  const [counts, setCounts] = useState<Record<EventType, number>>({
    [EventType.HAMMER]: 0,
    [EventType.PIG]: 0,
    [EventType.SYM]: 0,
    [EventType.SHIELD]: 0,
  });
  const [history, setHistory] = useState<EventType[]>([]);

  const increment = (type: EventType) => {
    setCounts(prev => ({ ...prev, [type]: prev[type] + 1 }));
    setHistory(prev => [...prev, type]);
    // Feedback animation
    const element = document.getElementById(`btn-${type}`);
    element?.classList.add('scale-95', 'bg-blue-100', 'dark:bg-blue-900/40');
    setTimeout(() => {
      element?.classList.remove('scale-95', 'bg-blue-100', 'dark:bg-blue-900/40');
    }, 100);
  };

  const undo = () => {
    if (history.length === 0) return;
    const last = history[history.length - 1];
    setCounts(prev => ({ ...prev, [last]: Math.max(0, prev[last] - 1) }));
    setHistory(prev => prev.slice(0, -1));
  };

  const reset = () => {
    if (confirm('Bạn có muốn đặt lại bộ đếm không?')) {
      setCounts({ [EventType.HAMMER]: 0, [EventType.PIG]: 0, [EventType.SYM]: 0, [EventType.SHIELD]: 0 });
      setHistory([]);
    }
  };

  const save = () => {
    // Fix: Cast Object.values to number[] to ensure type safety during reduce and subsequent assignments
    const total = (Object.values(counts) as number[]).reduce((a, b) => a + b, 0);
    if (total === 0) {
      alert('Vui lòng ghi lại ít nhất 1 biểu tượng!');
      return;
    }
    const session: EventSession = {
      id: Date.now().toString(),
      date: new Date().toLocaleDateString('vi-VN'),
      total,
      counts: { ...counts }
    };
    onSave(session);
    alert('Đã lưu phiên làm việc!');
    reset();
  };

  // Fix: Cast Object.values to number[] to ensure type safety during reduce
  const total = (Object.values(counts) as number[]).reduce((a, b) => a + b, 0);

  return (
    <div className={`p-6 ${isOverlay ? 'fixed inset-0 z-50 bg-white/95 dark:bg-gray-900/95 flex flex-col items-center justify-center' : 'animate-in slide-in-from-bottom-8 duration-500'}`}>
      <div className="flex items-center justify-between mb-8 w-full">
        {!isOverlay && (
          <button onClick={onBack} className="flex items-center text-blue-600 font-semibold px-4 py-2 bg-blue-50 dark:bg-blue-900/20 rounded-2xl transition">
            <span className="mr-2">←</span> Menu
          </button>
        )}
        <h2 className="text-xl font-bold dark:text-white">🎯 Bộ đếm sự kiện</h2>
        <div className="flex gap-2">
            <button onClick={undo} className="p-3 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-2xl hover:bg-gray-200 transition">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" /></svg>
            </button>
            <button onClick={reset} className="p-3 bg-red-50 text-red-600 rounded-2xl hover:bg-red-100 transition">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
            </button>
        </div>
      </div>

      <div className="bg-gradient-to-br from-gray-800 to-black p-8 rounded-[2.5rem] mb-8 text-center shadow-2xl relative overflow-hidden">
        <div className="relative z-10">
          <p className="text-gray-400 text-sm font-medium uppercase tracking-widest mb-1">Tổng lượt quay</p>
          <h1 className="text-6xl font-black text-white mb-2">{total}</h1>
          <div className="flex justify-center gap-1">
            <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
            <div className="w-2 h-2 rounded-full bg-blue-500/50"></div>
          </div>
        </div>
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-8">
        {[
          { type: EventType.HAMMER, label: 'Búa', icon: <ICONS.Hammer className="w-10 h-10" />, color: 'text-orange-500 bg-orange-50 dark:bg-orange-900/20' },
          { type: EventType.PIG, label: 'Heo', icon: <ICONS.Pig className="w-10 h-10" />, color: 'text-pink-500 bg-pink-50 dark:bg-pink-900/20' },
          { type: EventType.SYM, label: 'SYM', icon: <ICONS.Event className="w-10 h-10" />, color: 'text-blue-500 bg-blue-50 dark:bg-blue-900/20' },
          { type: EventType.SHIELD, label: 'Khiên', icon: <ICONS.Shield className="w-10 h-10" />, color: 'text-teal-500 bg-teal-50 dark:bg-teal-900/20' },
        ].map((item) => (
          <button
            key={item.type}
            id={`btn-${item.type}`}
            onClick={() => increment(item.type)}
            className={`flex flex-col items-center p-6 rounded-[2rem] border border-transparent shadow-sm hover:shadow-md transition-all active:scale-95 ${item.color}`}
          >
            <div className="mb-3 transform group-active:scale-110 transition-transform">
              {item.icon}
            </div>
            <span className="font-bold text-lg mb-1">{item.label}</span>
            <span className="bg-white/50 dark:bg-black/20 px-4 py-1 rounded-full text-xl font-black">{counts[item.type]}</span>
          </button>
        ))}
      </div>

      <button
        onClick={save}
        className="w-full py-5 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-[2rem] font-bold text-xl shadow-xl shadow-blue-200 dark:shadow-none transition transform hover:-translate-y-1 active:translate-y-0"
      >
        Lưu phiên này
      </button>
    </div>
  );
};

export default EventCounter;
