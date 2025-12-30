
import React from 'react';
import { AppView } from '../types.ts';
import { ICONS } from '../constants.tsx';

interface DashboardProps {
  onViewChange: (view: AppView) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onViewChange }) => {
  const menuItems = [
    { id: AppView.SPIN_LINKS, label: 'Spin Links', icon: <ICONS.Spin className="w-8 h-8" />, color: 'bg-blue-600', desc: 'Auto Update' },
    { id: AppView.COIN_LINKS, label: 'Coin Links', icon: <ICONS.Coin className="w-8 h-8" />, color: 'bg-yellow-500', desc: 'Auto Update' },
    { id: AppView.EVENT_COUNTER, label: 'Bộ đếm Sym', icon: <ICONS.Event className="w-8 h-8" />, color: 'bg-purple-600', desc: 'Tool Chuyên Nghiệp' },
    { id: AppView.HISTORY, label: 'Thống kê quay', icon: <ICONS.History className="w-8 h-8" />, color: 'bg-orange-500', desc: 'Saved Sessions' },
  ];

  const handleFBLogin = () => {
    window.location.href = "https://m.facebook.com/login";
  };

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
          <h2 className="text-3xl font-black mb-1 leading-tight tracking-tighter">VŨ•SYMCOINMASTER</h2>
          <p className="text-blue-100/80 font-medium text-sm">Tự động cập nhật link quà tặng.</p>
        </div>
        
        <div className="absolute top-0 right-0 p-6 opacity-20">
          <ICONS.Event className="w-24 h-24 rotate-12" />
        </div>
      </div>

      {/* Facebook Auto Login Bridge */}
      <button 
        onClick={handleFBLogin}
        className="w-full bg-[#1877F2] p-4 rounded-2xl flex items-center justify-center gap-3 shadow-lg active:scale-95 transition-transform"
      >
        <svg className="w-6 h-6 fill-white" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
        <span className="text-white font-black text-sm uppercase tracking-tight">Đăng nhập Facebook trước</span>
      </button>

      <div className="grid grid-cols-2 gap-4">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onViewChange(item.id as AppView)}
            className="group relative bg-white dark:bg-gray-800 p-6 rounded-[2.5rem] border border-gray-100 dark:border-gray-700 shadow-sm transition-all duration-300 text-left overflow-hidden active:scale-95"
          >
            <div className="flex flex-col gap-3 z-10 relative">
              <div className={`w-12 h-12 ${item.color} rounded-2xl flex items-center justify-center text-white shadow-lg`}>
                {item.icon}
              </div>
              <div>
                <h3 className="font-black text-sm text-gray-800 dark:text-white uppercase tracking-tight leading-none mb-1">{item.label}</h3>
                <p className="text-[9px] text-gray-400 font-bold uppercase">{item.desc}</p>
              </div>
            </div>
          </button>
        ))}
      </div>
      
      <button 
        onClick={() => onViewChange(AppView.CONTACT)}
        className="w-full bg-emerald-500 p-5 rounded-[2rem] text-white font-black flex items-center justify-center gap-2 shadow-xl shadow-emerald-200 dark:shadow-none active:scale-95 transition-transform uppercase text-sm tracking-widest"
      >
        <span>📞</span> Liên hệ Zalo Admin
      </button>
    </div>
  );
};

export default Dashboard;
