
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
    // Giả lập dữ liệu quà tặng - Trong thực tế sẽ gọi API PHP
    const mockLinks: SpinLink[] = Array.from({ length: 15 }, (_, i) => {
      const amount = type === 'spin' ? (i % 3 === 0 ? '50' : '25') : (i + 1) * 2;
      return {
        id: i + 1,
        title: type === 'spin' ? `${amount} Free Spins` : `${amount} Million Coins`,
        url: `https://static.moonactive.net/static/coinmaster/reward.html?g=v_reward_${type}_${i}`,
        date: i === 0 ? 'Mới nhất' : `${i + 1} giờ trước`
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
    
    // Tạo link Intent chuyên dụng cho Kodular
    // Nếu Kodular thấy link này, nó sẽ mở thẳng Game hoặc CH Play
    const intentUrl = `intent://claim-reward?url=${encodeURIComponent(url)}&package=com.moonactive.coinmaster`;
    window.location.href = intentUrl;

    // Fallback cho trình duyệt
    setTimeout(() => {
        window.open(url, '_blank');
    }, 100);
  };

  return (
    <div className="p-6 animate-in slide-in-from-right-4 duration-300">
      <div className="flex items-center justify-between mb-8">
        <button onClick={onBack} className="w-12 h-12 flex items-center justify-center bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700 rounded-2xl active:scale-90 transition-transform">
          <span className="text-xl">←</span>
        </button>
        <div className="text-right">
          <h2 className="text-xl font-black dark:text-white uppercase tracking-tight">
            {type === 'spin' ? '🌀 Nhận Spin' : '🪙 Nhận Vàng'}
          </h2>
          <p className="text-[10px] font-black text-blue-600 dark:text-blue-400 uppercase tracking-widest">Đã cập nhật link</p>
        </div>
      </div>

      <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-2xl border border-blue-100 dark:border-blue-800">
        <p className="text-[11px] font-bold text-blue-700 dark:text-blue-300 flex items-center gap-2">
          <span>ℹ️</span> Đảm bảo bạn đã đăng nhập Facebook trong App này trước khi nhận quà.
        </p>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map(i => <div key={i} className="h-24 bg-white dark:bg-gray-800 animate-pulse rounded-[2.5rem]"></div>)}
        </div>
      ) : (
        <div className="space-y-4">
          {links.map((link) => {
            const isClaimed = claimedLinks.includes(link.id);
            return (
              <div key={link.id} className={`bg-white dark:bg-gray-800 p-5 rounded-[2.5rem] border border-gray-100 dark:border-gray-700 transition-all ${isClaimed ? 'opacity-40 grayscale' : ''}`}>
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 flex items-center justify-center rounded-2xl ${type === 'spin' ? 'bg-blue-50 text-blue-600' : 'bg-yellow-50 text-yellow-600'}`}>
                    {type === 'spin' ? <ICONS.Spin className="w-7 h-7" /> : <ICONS.Coin className="w-7 h-7" />}
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className="font-black text-sm text-gray-800 dark:text-white leading-tight">{link.title}</h3>
                    <span className="text-[9px] font-black text-gray-400 uppercase tracking-wider">{link.date}</span>
                  </div>
                  <button 
                    disabled={isClaimed}
                    onClick={() => handleClaim(link.id, link.url)}
                    className={`px-5 py-2.5 rounded-2xl font-black text-[11px] text-white uppercase shadow-md active:scale-90 transition-all ${isClaimed ? 'bg-gray-400' : type === 'spin' ? 'bg-blue-600' : 'bg-yellow-500'}`}
                  >
                    {isClaimed ? 'Xong' : 'Lấy Quà'}
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
