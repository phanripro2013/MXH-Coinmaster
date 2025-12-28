
import React, { useState, useEffect } from 'react';
import { ICONS } from '../constants.tsx';
import { SpinLink } from '../types.ts';

interface LinkViewProps {
  type: 'spin' | 'coin';
  onBack: () => void;
}

const LinkView: React.FC<LinkViewProps> = ({ type, onBack }) => {
  const [links, setLinks] = useState<SpinLink[]>([]);
  const [loading, setLoading] = useState(true);
  const [claimedLinks, setClaimedLinks] = useState<number[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('claimed_links_v2');
    if (saved) setClaimedLinks(JSON.parse(saved));
  }, []);

  const fetchLinks = async () => {
    setLoading(true);
    // Giả lập lấy dữ liệu từ API quà tặng
    const mockLinks: SpinLink[] = Array.from({ length: 15 }, (_, i) => {
      const amount = type === 'spin' ? (i % 3 === 0 ? '50' : '25') : (i + 1) * 2;
      return {
        id: i + 1,
        title: type === 'spin' ? `${amount} Free Spins Rewards` : `${amount} Million Coins`,
        url: `https://static.moonactive.net/static/coinmaster/reward.html?g=v_reward_${type}_${i}_${Date.now()}`,
        date: i === 0 ? 'Vừa xong' : `${i + 1} giờ trước`
      };
    });
    
    setTimeout(() => {
      setLinks(mockLinks);
      setLoading(false);
    }, 500);
  };

  useEffect(() => { fetchLinks(); }, [type]);

  const handleClaim = (id: number, url: string) => {
    const newClaimed = [...claimedLinks, id];
    setClaimedLinks(newClaimed);
    localStorage.setItem('claimed_links_v2', JSON.stringify(newClaimed));
    
    // Sử dụng href để kích hoạt trình xử lý Deep Link của Android/iOS
    window.location.href = url;
  };

  return (
    <div className="p-6 animate-in slide-in-from-right-4 duration-300">
      <div className="flex items-center justify-between mb-8">
        <button onClick={onBack} className="w-12 h-12 flex items-center justify-center bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700 rounded-2xl">
          <span className="text-xl">←</span>
        </button>
        <div className="text-right">
          <h2 className="text-xl font-black dark:text-white uppercase tracking-tight">
            {type === 'spin' ? '🌀 Spin Rewards' : '🪙 Coin Rewards'}
          </h2>
          <p className="text-[10px] font-black text-blue-600 dark:text-blue-400 uppercase tracking-widest">Đã đồng bộ Link mới</p>
        </div>
      </div>

      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 p-5 rounded-[2rem] mb-8">
        <h4 className="text-[12px] font-black text-blue-800 dark:text-blue-400 uppercase mb-2 flex items-center gap-2">
          <span className="text-lg">🚀</span> HƯỚNG DẪN NHẬN
        </h4>
        <ul className="text-[10px] text-blue-700 dark:text-blue-300 font-bold space-y-2 list-disc ml-4 leading-relaxed">
          <li>Nên sử dụng <b>Google Chrome</b> để nạp link nhanh nhất.</li>
          <li>Đảm bảo ứng dụng <b>Coin Master</b> đã được cài đặt trên máy.</li>
          <li>Nếu không tự mở game, hãy nhấn chọn "Mở bằng ứng dụng" trong menu trình duyệt.</li>
        </ul>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3, 4].map(i => <div key={i} className="h-24 bg-white dark:bg-gray-800 animate-pulse rounded-[2.5rem]"></div>)}
        </div>
      ) : (
        <div className="space-y-4">
          {links.map((link) => {
            const isClaimed = claimedLinks.includes(link.id);
            return (
              <div key={link.id} className={`bg-white dark:bg-gray-800 p-5 rounded-[2.5rem] border border-gray-100 dark:border-gray-700 transition-all ${isClaimed ? 'opacity-40 grayscale scale-[0.98]' : ''}`}>
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 flex items-center justify-center rounded-2xl ${type === 'spin' ? 'bg-blue-50 text-blue-600' : 'bg-yellow-50 text-yellow-600'}`}>
                    {type === 'spin' ? <ICONS.Spin className="w-7 h-7" /> : <ICONS.Coin className="w-7 h-7" />}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-black text-sm text-gray-800 dark:text-white leading-tight">{link.title}</h3>
                    <span className="text-[9px] font-black text-gray-400 uppercase tracking-wider">{link.date}</span>
                  </div>
                  <button 
                    disabled={isClaimed}
                    onClick={() => handleClaim(link.id, link.url)}
                    className={`px-5 py-2.5 rounded-2xl font-black text-[11px] text-white uppercase shadow-md active:scale-90 transition-all ${isClaimed ? 'bg-gray-400' : type === 'spin' ? 'bg-blue-600' : 'bg-yellow-500'}`}
                  >
                    {isClaimed ? 'Đã lấy' : 'Nhận'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default LinkView;
