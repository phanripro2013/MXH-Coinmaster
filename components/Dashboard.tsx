
import React from 'react';
import { AppView } from '../types';
import { ICONS } from '../constants';

interface DashboardProps {
  onViewChange: (view: AppView) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onViewChange }) => {
  const menuItems = [
    { id: AppView.SPIN_LINKS, label: 'Spin Links', icon: <ICONS.Spin className="w-8 h-8" />, color: 'bg-blue-600', desc: 'Auto Update' },
    { id: AppView.COIN_LINKS, label: 'Coin Links', icon: <ICONS.Coin className="w-8 h-8" />, color: 'bg-yellow-500', desc: 'Auto Update' },
    { id: AppView.EVENT_COUNTER, label: 'Đếm sự kiện', icon: <ICONS.Event className="w-8 h-8" />, color: 'bg-purple-600', desc: 'Manual Tracker' },
    { id: AppView.HISTORY, label: 'Thống kê quay', icon: <ICONS.History className="w-8 h-8" />, color: 'bg-orange-500', desc: 'Saved Sessions' },
    { id: AppView.CONTACT, label: 'Zalo Admin', icon: <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>, color: 'bg-emerald-500', desc: 'Support 24/7' },
  ];

  return (
    <div className="p-6 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* System Status Card */}
      <div className="bg-gradient-to-br from-indigo-600 via-blue-700 to-blue-800 p-8 rounded-[3rem] text-white shadow-2xl relative overflow-hidden group">
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-4">
            <span className="flex h-3 w-3 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
            <span className="text-xs font-black uppercase tracking-widest text-blue-100">Hệ thống đang hoạt động</span>
          </div>
          <h2 className="text-3xl font-black mb-1 leading-tight tracking-tighter">VŨ•rCOINMASTER</h2>
          <p className="text-blue-100/80 font-medium text-sm">Tự động cập nhật link từ Game mỗi 30 phút.</p>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
        <div className="absolute top-0 right-0 p-6 opacity-20">
          <ICONS.Spin className="w-24 h-24 rotate-12" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onViewChange(item.id as AppView)}
            className="group relative bg-white dark:bg-gray-800 p-6 rounded-[2.5rem] border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 text-left overflow-hidden active:scale-95"
          >
            <div className="flex items-center gap-5 z-10 relative">
              <div className={`w-14 h-14 ${item.color} rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:rotate-12 transition-transform duration-300`}>
                {item.icon}
              </div>
              <div className="flex-1">
                <h3 className="font-black text-lg text-gray-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors uppercase tracking-tight">{item.label}</h3>
                <div className="flex items-center gap-1.5">
                   <p className="text-xs text-gray-400 dark:text-gray-500 font-bold">{item.desc}</p>
                   {item.desc === 'Auto Update' && (
                     <span className="text-[10px] bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-1.5 py-0.5 rounded-md uppercase font-black">Live</span>
                   )}
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
