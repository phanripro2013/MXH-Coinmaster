
import React, { useState, useEffect } from 'react';
import { ICONS, API_BASE_URL } from '../constants.tsx';
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
    try {
      // Giả lập lấy 20 link quà tặng chuyên nghiệp
      const mockLinks: SpinLink[] = Array.from({ length: 20 }, (_, i) => {
        const amount = type === 'spin' ? (i % 3 === 0 ? '50' : '25') : (i + 1) * 2;
        return {
          id: i + 1,
          title: type === 'spin' ? `${amount} Free Spins Rewards` : `${amount} Million Coins`,
          url: `https://static.moonactive.net/static/coinmaster/reward.html?g=v_reward_${type}_${i}_${Date.now()}`,
          date: i < 3 ? 'Vừa cập nhật' : i < 10 ? `${i} giờ trước` : `Hôm qua`
        };
      });
      
      // Giả lập độ trễ mạng
      setTimeout(() => {
        setLinks(mockLinks);
        setLoading(false);
      }, 600);
    } catch (err) {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLinks();
  }, [type]);

  const handleClaim = (id: number, url: string) => {
    // 1. Cập nhật trạng thái ngay lập tức để tránh nhấn nhiều lần
    const newClaimed = [...claimedLinks, id];
    setClaimedLinks(newClaimed);
    localStorage.setItem('claimed_links_v2', JSON.stringify(newClaimed));
    
    // 2. Mở link quà tặng. 
    // Quan trọng: Trên Cốc Cốc Android, dùng window.location.href sẽ kích hoạt App Intent tốt hơn window.open
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    
    if (isMobile) {
      // Direct navigation works best for deep links in mobile browsers
      window.location.href = url;
    } else {
      window.open(url, '_blank');
    }
  };

  return (
    <div className="p-6 animate-in slide-in-from-right-4 duration-300">
      <div className="flex items-center justify-between mb-8">
        <button onClick={onBack} className="w-12 h-12 flex items-center justify-center bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700 rounded-2xl text-gray-600 dark:text-gray-300 active:scale-90 transition-transform">
          <span className="text-xl">←</span>
        </button>
        <div className="text-right">
          <h2 className="text-xl font-black dark:text-white uppercase tracking-tight">
            {type === 'spin' ? '🌀 Spin Quà Tặng' : '🪙 Coin Quà Tặng'}
          </h2>
          <p className="text-[10px] font-black text-blue-600 dark:text-blue-400 uppercase tracking-widest">Danh sách 20 Link mới nhất</p>
        </div>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} className="h-32 bg-white dark:bg-gray-800 animate-pulse rounded-[2rem]"></div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-2xl mb-4 border border-blue-100 dark:border-blue-800">
            <p className="text-xs text-blue-700 dark:text-blue-300 font-bold flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
              Mẹo: Nếu không mở được Game, hãy dùng Chrome hoặc Safari!
            </p>
          </div>

          {links.map((link) => {
            const isClaimed = claimedLinks.includes(link.id);
            return (
              <div 
                key={link.id} 
                className={`bg-white dark:bg-gray-800 p-5 rounded-[2rem] shadow-sm border border-gray-100 dark:border-gray-700 relative overflow-hidden transition-all ${isClaimed ? 'received-link scale-95' : 'hover:shadow-md active:scale-[0.98]'}`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 flex items-center justify-center rounded-2xl ${isClaimed ? 'bg-gray-100' : type === 'spin' ? 'bg-blue-50 text-blue-600' : 'bg-yellow-50 text-yellow-600'}`}>
                    {type === 'spin' ? <ICONS.Spin className="w-8 h-8" /> : <ICONS.Coin className="w-8 h-8" />}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-black text-base text-gray-800 dark:text-white leading-tight">
                      {link.title}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">{link.date}</span>
                      {isClaimed && (
                        <span className="bg-green-100 dark:bg-green-900/40 text-green-600 dark:text-green-400 text-[9px] px-2 py-0.5 rounded-full font-black uppercase">Đã nhận quà</span>
                      )}
                    </div>
                  </div>
                  {!isClaimed && (
                    <button 
                      onClick={() => handleClaim(link.id, link.url)}
                      className={`px-4 py-3 rounded-xl font-black text-[11px] text-white shadow-lg uppercase tracking-tight ${
                        type === 'spin' ? 'bg-blue-600 shadow-blue-200' : 'bg-yellow-500 shadow-yellow-200'
                      }`}
                    >
                      NHẬN
                    </button>
                  )}
                </div>
              </div>
            );
          })}
          
          <div className="text-center py-10">
            <button 
              onClick={() => { localStorage.removeItem('claimed_links_v2'); setClaimedLinks([]); fetchLinks(); }} 
              className="px-6 py-2 bg-gray-100 dark:bg-gray-800 text-[10px] font-black text-gray-500 rounded-full uppercase tracking-widest hover:bg-red-50 hover:text-red-500 transition-colors"
            >
              Đặt lại tất cả Link
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LinkView;
