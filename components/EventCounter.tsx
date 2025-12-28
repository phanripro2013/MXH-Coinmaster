
import React, { useState, useEffect } from 'react';
import { EventType, EventSession } from '../types';
import { ICONS } from '../constants';

interface EventCounterProps {
  onBack: () => void;
  onSave: (session: EventSession) => void;
  isOverlay: boolean;
}

const MULTIPLIERS = [1, 2, 3, 5, 10, 15, 20, 40, 80, 100];

const EventCounter: React.FC<EventCounterProps> = ({ onBack, onSave, isOverlay }) => {
  const [counts, setCounts] = useState<Record<EventType, number>>({
    [EventType.HAMMER]: 0,
    [EventType.PIG]: 0,
    [EventType.SYM]: 0,
    [EventType.SHIELD]: 0,
  });
  const [selectedX, setSelectedX] = useState<number>(1);
  const [history, setHistory] = useState<{type: EventType, x: number}[]>([]);
  const [spinsSinceSym, setSpinsSinceSym] = useState(0);

  const increment = (type: EventType) => {
    setCounts(prev => ({ ...prev, [type]: prev[type] + 1 }));
    setHistory(prev => [...prev, { type, x: selectedX }]);
    
    if (type === EventType.SYM || type === EventType.PIG) {
      setSpinsSinceSym(0);
    } else {
      setSpinsSinceSym(prev => prev + 1);
    }

    // Haptic feedback simulation
    const btn = document.getElementById(`btn-${type}`);
    btn?.classList.add('scale-90', 'brightness-125');
    setTimeout(() => btn?.classList.remove('scale-90', 'brightness-125'), 100);
  };

  const undo = () => {
    if (history.length === 0) return;
    const last = history[history.length - 1];
    setCounts(prev => ({ ...prev, [last.type]: Math.max(0, prev[last.type] - 1) }));
    setHistory(prev => prev.slice(0, -1));
  };

  const openGame = () => {
    // Attempt multiple methods to trigger Coin Master
    const coinMasterDeepLink = "fb1614741348821033://";
    const androidIntent = "intent://#Intent;scheme=fb1614741348821033;package=com.moonactive.coinmaster;end";
    
    const isAndroid = /Android/i.test(navigator.userAgent);
    
    if (isAndroid) {
      window.location.href = androidIntent;
    } else {
      window.location.href = coinMasterDeepLink;
    }
    
    // Fallback info
    setTimeout(() => {
       console.log("Deep link triggered. If nothing happens, app might not be installed.");
    }, 500);
  };

  const total = history.length;

  const getAdvice = () => {
    if (spinsSinceSym > 12) return { text: "CƠ HỘI CAO! NÂNG X100 NGAY", color: "text-red-500 animate-pulse" };
    if (spinsSinceSym > 7) return { text: "SẮP CÓ SYM - TĂNG LÊN X20", color: "text-orange-400" };
    return { text: "GIỮ MỨC THẤP X1", color: "text-gray-400" };
  };

  const advice = getAdvice();

  return (
    <div className="p-4 space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header & Game Link */}
      <div className="flex items-center justify-between">
        <button onClick={onBack} className="text-gray-500 font-bold px-3 py-2 bg-gray-100 dark:bg-gray-800 rounded-xl">
          ← Thoát
        </button>
        <button 
          onClick={openGame}
          className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-xl font-black text-sm flex items-center gap-2 shadow-lg shadow-green-900/20 active:scale-95 transition-transform"
        >
          <div className="w-2 h-2 bg-white rounded-full animate-ping"></div>
          MỞ COIN MASTER
        </button>
      </div>

      {/* Main Stats Display */}
      <div className="bg-gray-900 rounded-[2rem] p-6 text-white border border-gray-800 shadow-2xl relative overflow-hidden">
        <div className="flex justify-between items-end relative z-10">
          <div>
            <p className="text-[10px] font-black text-blue-500 uppercase tracking-widest mb-1">Total Spins</p>
            <h1 className="text-5xl font-black tabular-nums">{total}</h1>
          </div>
          <div className="text-right">
            <p className={`text-xs font-black uppercase tracking-tighter ${advice.color}`}>
              {advice.text}
            </p>
            <p className="text-[10px] text-gray-500 font-bold mt-1">Lượt lỡ: {spinsSinceSym}</p>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 rounded-full blur-3xl"></div>
      </div>

      {/* Multipliers */}
      <div className="space-y-2">
        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Mức cược hiện tại</p>
        <div className="grid grid-cols-5 gap-2">
          {MULTIPLIERS.map(x => (
            <button
              key={x}
              onClick={() => setSelectedX(x)}
              className={`py-3 rounded-xl font-black text-sm transition-all border-2 ${
                selectedX === x 
                ? 'bg-blue-600 border-blue-400 text-white scale-105 shadow-lg shadow-blue-500/20' 
                : 'bg-white dark:bg-gray-800 border-transparent text-gray-400 dark:text-gray-500'
              }`}
            >
              x{x}
            </button>
          ))}
        </div>
      </div>

      {/* Symbol Buttons */}
      <div className="grid grid-cols-2 gap-3">
        {[
          { type: EventType.PIG, label: 'HEO (RAID)', icon: <ICONS.Pig className="w-8 h-8" />, color: 'bg-pink-500 shadow-pink-500/20' },
          { type: EventType.SYM, label: 'SYM (ATTACK)', icon: <ICONS.Event className="w-8 h-8" />, color: 'bg-blue-600 shadow-blue-600/20' },
          { type: EventType.HAMMER, label: 'BÚA', icon: <ICONS.Hammer className="w-8 h-8" />, color: 'bg-orange-500 shadow-orange-500/20' },
          { type: EventType.SHIELD, label: 'KHIÊN', icon: <ICONS.Shield className="w-8 h-8" />, color: 'bg-teal-500 shadow-teal-500/20' },
        ].map((item) => (
          <button
            key={item.type}
            id={`btn-${item.type}`}
            onClick={() => increment(item.type)}
            className={`${item.color} text-white p-5 rounded-[2rem] shadow-xl flex flex-col items-center justify-center transition active:scale-90 group relative overflow-hidden`}
          >
            <div className="relative z-10 flex flex-col items-center">
              {item.icon}
              <span className="text-[10px] font-black mt-2 opacity-80 uppercase">{item.label}</span>
              <span className="text-2xl font-black mt-1">{counts[item.type]}</span>
            </div>
            <div className="absolute inset-0 bg-white/10 opacity-0 group-active:opacity-100 transition-opacity"></div>
          </button>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-3 pt-2">
        <button 
          onClick={undo}
          className="py-4 bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-2xl font-black text-sm uppercase flex items-center justify-center gap-2"
        >
          Hoàn tác
        </button>
        <button 
          onClick={() => {
            const totalCount = (Object.values(counts) as number[]).reduce((a, b) => a + b, 0);
            if (totalCount === 0) return;
            onSave({
              id: Date.now().toString(),
              date: new Date().toLocaleDateString('vi-VN'),
              total: totalCount,
              counts: { ...counts }
            });
            onBack();
          }}
          className="py-4 bg-gray-900 dark:bg-blue-600 text-white rounded-2xl font-black text-sm uppercase shadow-xl active:scale-95 transition-transform"
        >
          Lưu kết quả
        </button>
      </div>
    </div>
  );
};

export default EventCounter;
