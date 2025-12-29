
import React, { useState } from 'react';
import { EventType, EventSession } from '../types';
import { ICONS } from '../constants';

interface EventCounterProps {
  onBack: () => void;
  onSave: (session: EventSession) => void;
  isOverlay: boolean;
}

const MULTIPLIERS = [1, 2, 3, 5, 10, 15, 20, 40, 80, 100];

const EventCounter: React.FC<EventCounterProps> = ({ onBack, onSave }) => {
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
    setSpinsSinceSym(type === EventType.SYM || type === EventType.PIG ? 0 : prev => prev + 1);
  };

  const undo = () => {
    if (history.length === 0) return;
    const last = history[history.length - 1];
    setCounts(prev => ({ ...prev, [last.type]: Math.max(0, prev[last.type] - 1) }));
    setHistory(prev => prev.slice(0, -1));
  };

  const openGame = () => {
    const PACKAGE_NAME = "com.moonactive.coinmaster";
    const PLAY_STORE_URL = `https://play.google.com/store/apps/details?id=${PACKAGE_NAME}`;
    // Coin Master Scheme chuẩn cho Deep Link
    const SCHEME = "fb1614741348821033"; 
    
    const isAndroid = /Android/i.test(navigator.userAgent);
    const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);

    if (isAndroid) {
      /**
       * ANDROID INTENT (Senior Method):
       * intent://#Intent;
       * scheme=[SCHEME_ID];
       * package=[PACKAGE_NAME];
       * S.browser_fallback_url=[FALLBACK_URL];
       * end
       */
      const androidIntent = `intent://#Intent;scheme=${SCHEME};package=${PACKAGE_NAME};S.browser_fallback_url=${encodeURIComponent(PLAY_STORE_URL)};end`;
      
      // Lệnh thực thi mở App
      window.location.href = androidIntent;

    } else if (isIOS) {
      window.location.href = `${SCHEME}://`;
    } else {
      window.open("https://getcoinmaster.com", "_blank");
    }

    /**
     * CHẾ ĐỘ DỰ PHÒNG HẾT THỜI GIAN (Fallback Timer)
     * Nếu sau 2.5 giây mà ứng dụng vẫn đang hiển thị (nghĩa là app không mở được)
     * thì ép chuyển hướng sang Google Play/App Store
     */
    const start = Date.now();
    const timeout = setTimeout(() => {
      const now = Date.now();
      // Nếu browser vẫn hiển thị và thời gian chờ chưa quá lâu
      if (!document.hidden && (now - start) < 4000) {
        window.location.href = isIOS 
          ? "https://apps.apple.com/app/id1061219075" 
          : PLAY_STORE_URL;
      }
    }, 2500);

    // Xóa timer nếu người dùng đã rời khỏi browser (App đã mở thành công)
    window.onblur = () => clearTimeout(timeout);
    document.onvisibilitychange = () => {
      if (document.hidden) clearTimeout(timeout);
    };
  };

  const total = history.length;
  const advice = spinsSinceSym > 12 
    ? { text: "CƠ HỘI CAO! X100 NGAY", color: "text-red-500 animate-pulse" } 
    : spinsSinceSym > 7 
    ? { text: "SẮP CÓ SYM - TĂNG X20", color: "text-orange-400" } 
    : { text: "GIỮ MỨC THẤP X1", color: "text-gray-400" };

  return (
    <div className="p-4 space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <button onClick={onBack} className="text-gray-500 font-bold px-4 py-2 bg-white border border-gray-100 dark:bg-gray-800 rounded-2xl shadow-sm">
          ← Quay lại
        </button>
        <button 
          onClick={openGame}
          className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-2xl font-black text-xs flex items-center gap-2 shadow-xl shadow-blue-900/20 active:scale-95 transition-all"
        >
          <ICONS.Spin className="w-4 h-4 animate-spin" />
          MỞ GAME NGAY
        </button>
      </div>

      <div className="bg-gray-900 rounded-[2.5rem] p-7 text-white border border-gray-800 shadow-2xl relative overflow-hidden">
        <div className="flex justify-between items-end relative z-10">
          <div>
            <p className="text-[10px] font-black text-blue-500 uppercase tracking-widest mb-1">Tổng lượt quay</p>
            <h1 className="text-5xl font-black tabular-nums">{total}</h1>
          </div>
          <div className="text-right">
            <p className={`text-[11px] font-black uppercase tracking-tighter ${advice.color}`}>
              {advice.text}
            </p>
            <p className="text-[10px] text-gray-500 font-bold mt-1">Lượt lỡ: {spinsSinceSym}</p>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-2">Mức cược</p>
        <div className="grid grid-cols-5 gap-2">
          {MULTIPLIERS.map(x => (
            <button
              key={x}
              onClick={() => setSelectedX(x)}
              className={`py-3.5 rounded-2xl font-black text-sm transition-all border-2 ${
                selectedX === x 
                ? 'bg-blue-600 border-blue-400 text-white scale-105 shadow-lg' 
                : 'bg-white dark:bg-gray-800 border-transparent text-gray-400'
              }`}
            >
              x{x}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {[
          { type: EventType.PIG, label: 'HEO (RAID)', icon: <ICONS.Pig className="w-9 h-9" />, color: 'bg-pink-500 shadow-pink-500/30' },
          { type: EventType.SYM, label: 'SYM (ATTACK)', icon: <ICONS.Event className="w-9 h-9" />, color: 'bg-blue-600 shadow-blue-600/30' },
          { type: EventType.HAMMER, label: 'BÚA', icon: <ICONS.Hammer className="w-9 h-9" />, color: 'bg-orange-500 shadow-orange-500/30' },
          { type: EventType.SHIELD, label: 'KHIÊN', icon: <ICONS.Shield className="w-9 h-9" />, color: 'bg-teal-500 shadow-teal-500/30' },
        ].map((item) => (
          <button
            key={item.type}
            onClick={() => increment(item.type)}
            className={`${item.color} text-white p-6 rounded-[3rem] shadow-xl flex flex-col items-center justify-center transition active:scale-90`}
          >
            {item.icon}
            <span className="text-[10px] font-black mt-3 opacity-90 uppercase tracking-tight">{item.label}</span>
            <span className="text-3xl font-black mt-1">{counts[item.type]}</span>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4 pt-4">
        <button onClick={undo} className="py-5 bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-[1.5rem] font-black text-[12px] uppercase">Hoàn tác</button>
        <button 
          onClick={() => {
            const totalCount = (Object.values(counts) as number[]).reduce((a, b) => a + b, 0);
            if (totalCount === 0) return;
            onSave({ id: Date.now().toString(), date: new Date().toLocaleDateString('vi-VN'), total: totalCount, counts: { ...counts } });
            onBack();
          }}
          className="py-5 bg-blue-600 text-white rounded-[1.5rem] font-black text-[12px] uppercase shadow-xl"
        >
          Lưu lịch sử
        </button>
      </div>
    </div>
  );
};

export default EventCounter;
