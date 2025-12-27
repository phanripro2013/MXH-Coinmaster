
import React from 'react';
import { AppView } from '../types';
import { ICONS } from '../constants';

interface DashboardProps {
  onViewChange: (view: AppView) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onViewChange }) => {
  const menuItems = [
    { id: AppView.SPIN_LINKS, label: 'Spin Links', icon: <ICONS.Spin className="w-8 h-8" />, color: 'bg-blue-500', desc: 'Nhận Spin miễn phí' },
    { id: AppView.COIN_LINKS, label: 'Coin Links', icon: <ICONS.Coin className="w-8 h-8" />, color: 'bg-yellow-500', desc: 'Nhận Coin miễn phí' },
    { id: AppView.EVENT_COUNTER, label: 'Vòng quay sự kiện', icon: <ICONS.Event className="w-8 h-8" />, color: 'bg-purple-600', desc: 'Bộ đếm thủ công' },
    { id: AppView.USAGE, label: 'Cách sử dụng App', icon: <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>, color: 'bg-emerald-500', desc: 'Xem HDSD chi tiết' },
    { id: AppView.CONTACT, label: 'Liên hệ', icon: <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>, color: 'bg-indigo-500', desc: 'Gặp gỡ Mr Vũ' },
    { id: 'SHARE', label: 'Chia sẻ MXH', icon: <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 100-3.315 3 3 0 000 3.315z" /></svg>, color: 'bg-pink-500', desc: 'Giới thiệu bạn bè' },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {menuItems.map((item) => (
        <button
          key={item.id}
          onClick={() => item.id !== 'SHARE' ? onViewChange(item.id as AppView) : alert('Sharing functionality triggered!')}
          className="group relative bg-white dark:bg-gray-800 p-5 rounded-[2rem] border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-left overflow-hidden"
        >
          <div className="flex items-start gap-4 z-10 relative">
            <div className={`w-14 h-14 ${item.color} rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform`}>
              {item.icon}
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-lg text-gray-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{item.label}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">{item.desc}</p>
            </div>
            <div className="mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </div>
          </div>
          <div className={`absolute -right-4 -bottom-4 w-24 h-24 ${item.color} opacity-[0.03] dark:opacity-[0.05] rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500`}></div>
        </button>
      ))}
      
      <div className="col-span-1 sm:col-span-2 mt-4 p-6 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-xl font-bold mb-1">Mẹo hay hôm nay</h2>
          <p className="text-blue-100 text-sm opacity-90">Hãy sử dụng bộ đếm Heo 🐷 cho các sự kiện Raid lớn để tối ưu hóa số Spin tiêu tốn!</p>
        </div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10 blur-2xl"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-black/10 rounded-full -ml-8 -mb-8 blur-xl"></div>
      </div>
    </div>
  );
};

export default Dashboard;
