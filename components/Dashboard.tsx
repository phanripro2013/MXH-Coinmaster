
import React from 'react';
import { AppView } from '../types.ts';
import { ICONS, COLORS } from '../constants.tsx';

interface DashboardProps {
  onViewChange: (view: AppView) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onViewChange }) => {
  return (
    <div className="p-5 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Welcome Section */}
      <div className="flex justify-between items-end bg-white dark:bg-gray-800 p-6 rounded-[2.5rem] border border-gray-100 dark:border-gray-700 shadow-sm">
        <div>
          <h1 className="text-xl font-black text-gray-900 dark:text-white tracking-tighter italic leading-none uppercase">『THV』Vũ•rCM</h1>
          <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest mt-2 flex items-center gap-1">
             <ICONS.Badge className="w-3 h-3" /> System Official
          </p>
        </div>
        <div className="w-12 h-12 relative">
          <ICONS.LogoTHV className="w-full h-full drop-shadow-xl" />
        </div>
      </div>

      {/* Main Categories */}
      <div className="grid grid-cols-1 gap-5">
        <button 
          onClick={() => onViewChange(AppView.SPIN_LINKS)}
          className="relative overflow-hidden group bg-gradient-to-br from-blue-600 via-indigo-700 to-blue-800 p-7 rounded-[3rem] text-white shadow-[0_20px_40px_rgba(37,99,235,0.2)] dark:shadow-none active:scale-95 transition-all text-left"
        >
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-125 transition-transform duration-700">
            <ICONS.LogoTHV className="w-32 h-32 rotate-12" />
          </div>
          <div className="relative z-10 flex items-center justify-between">
            <div>
              <p className="text-[10px] font-black uppercase opacity-70 mb-1 tracking-[0.2em]">Cập nhật liên tục</p>
              <h3 className="text-4xl font-black tracking-tighter italic">R-SPINS</h3>
              <p className="mt-3 inline-flex items-center gap-2 bg-white/20 px-4 py-1.5 rounded-full text-[9px] font-black uppercase backdrop-blur-sm border border-white/10">
                 Nhận ngay bây giờ <span className="animate-pulse">→</span>
              </p>
            </div>
            <ICONS.Spin className="w-16 h-16 opacity-40 group-hover:rotate-[360deg] transition-transform duration-1000" />
          </div>
        </button>

        <button 
          onClick={() => onViewChange(AppView.COIN_LINKS)}
          className="relative overflow-hidden group bg-gradient-to-br from-amber-400 via-orange-500 to-amber-600 p-7 rounded-[3rem] text-white shadow-[0_20px_40px_rgba(245,158,11,0.2)] dark:shadow-none active:scale-95 transition-all text-left"
        >
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-125 transition-transform duration-700">
            <ICONS.LogoTHV className="w-32 h-32 rotate-12" />
          </div>
          <div className="relative z-10 flex items-center justify-between">
            <div>
              <p className="text-[10px] font-black uppercase opacity-70 mb-1 tracking-[0.2em]">Triệu vàng mỗi ngày</p>
              <h3 className="text-4xl font-black tracking-tighter italic">R-COINS</h3>
              <p className="mt-3 inline-flex items-center gap-2 bg-white/20 px-4 py-1.5 rounded-full text-[9px] font-black uppercase backdrop-blur-sm border border-white/10">
                 Mở túi vàng <span className="animate-pulse">→</span>
              </p>
            </div>
            <ICONS.Coin className="w-16 h-16 opacity-40 group-hover:scale-110 transition-transform duration-700" />
          </div>
        </button>
      </div>

      {/* Trust Badge Section */}
      <div className="grid grid-cols-2 gap-4">
         <div className="bg-white dark:bg-gray-800 p-4 rounded-[2rem] border border-gray-100 dark:border-gray-700 flex flex-col items-center text-center">
            <div className="w-10 h-10 bg-green-50 text-green-600 rounded-full flex items-center justify-center mb-2">
               <ICONS.Badge className="w-6 h-6" />
            </div>
            <span className="text-[9px] font-black text-gray-400 uppercase">Bảo mật 100%</span>
         </div>
         <div className="bg-white dark:bg-gray-800 p-4 rounded-[2rem] border border-gray-100 dark:border-gray-700 flex flex-col items-center text-center">
            <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-2">
               <ICONS.Gift className="w-6 h-6" />
            </div>
            <span className="text-[9px] font-black text-gray-400 uppercase">Quà tặng thật</span>
         </div>
      </div>

      <button 
        onClick={() => onViewChange(AppView.CONTACT)}
        className="w-full bg-slate-900 dark:bg-white dark:text-gray-900 p-5 rounded-[2rem] text-white font-black flex items-center justify-center gap-3 shadow-xl active:scale-95 transition-transform uppercase text-xs tracking-[0.2em] italic"
      >
        <ICONS.LogoTHV className="w-5 h-5" /> HỖ TRỢ BẢN QUYỀN
      </button>

      <p className="text-center text-[8px] font-bold text-gray-400 uppercase tracking-widest pb-10">
         Copyright © 2025 THV rCoinmaster Version 1.0.0
      </p>
    </div>
  );
};

export default Dashboard;
