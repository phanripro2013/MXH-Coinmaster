
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
    try {
      const mockLinks: SpinLink[] = Array.from({ length: 20 }, (_, i) => {
        const amount = type === 'spin' ? (i % 3 === 0 ? '50' : '25') : (i + 1) * 2;
        return {
          id: i + 1,
          title: type === 'spin' ? `${amount} Free Spins Rewards` : `${amount} Million Coins`,
          url: `https://static.moonactive.net/static/coinmaster/reward.html?g=v_reward_${type}_${i}_${Date.now()}`,
          date: i < 3 ? 'Vừa cập nhật' : i < 10 ? `${i} giờ trước` : `Hôm qua`
        };
      });
      
      setTimeout(() => {
        setLinks(mockLinks);
        setLoading(false);
      }, 600);
    } catch (err) {
      setLoading(false);
    }
  };

  useEffect(() => { fetchLinks(); }, [type]);

  const handleClaim = (id: number, url: string) => {
    const newClaimed = [...claimedLinks, id];
    setClaimedLinks(newClaimed);
    localStorage.setItem('claimed_links_v2', JSON.stringify(newClaimed));
    
    // Sử dụng cơ chế nạp link an toàn
    const isAndroid = /Android/i.test(navigator.userAgent);
    
    if (isAndroid) {
      // Trên Android, assign thường kích hoạt App Links tốt hơn open
      window.location.assign(url);
    } else {
      window.open(url, '_blank');
    }
  };

  return (
    <div className="p-6 animate-in slide-in-from-right-4 duration-300">
      <div className="flex items-center justify-between mb-6">
        <button onClick={onBack} className="w-12 h-12 flex items-center justify-center bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700 rounded-2xl">
          <span className="text-xl">←</span>
        </button>
        <div className="text-right">
          <h2 className="text-lg font-black dark:text-white uppercase tracking-tight">
            {type === 'spin' ? '🌀 Spin Rewards' : '🪙 Coin Rewards'}
          </h2>
          <p className="text-[9px] font-black text-blue-600 dark:text-blue-400 uppercase tracking-widest">Cập nhật mỗi 30 phút</p>
        </div>
      </div>

      <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-2xl mb-6 border border-amber-100 dark:border-amber-800">
        <h4 className="text-[11px] font-black text-amber-800 dark:text-amber-400 uppercase mb-1">Cách khắc phục nếu không vào được game:</h4>
        <ol className="text-[10px] text-amber-700 dark:text-amber-300 font-bold list-decimal ml-4 space-y-1">
          <li>Dùng trình duyệt <b>Google Chrome</b> (ổn định nhất).</li>
          <li>Nếu hiện thông báo "Mở trong ứng dụng", chọn <b>Luôn luôn</b>.</li>
          <li>Đảm bảo đã cài đặt Game Coin Master trên máy.</li>
        </ol>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map(i => <div key={i} className="h-24 bg-white dark:bg-gray-800 animate-pulse rounded-[2rem]"></div>)}
        </div>
      ) : (
        <div className="space-y-4">
          {links.map((link) => {
            const isClaimed = claimedLinks.includes(link.id);
            return (
              <div key={link.id} className={`bg-white dark:bg-gray-800 p-5 rounded-[2rem] border border-gray-100 dark:border-gray-700 transition-all ${isClaimed ? 'opacity-60 scale-95 grayscale' : 'active:scale-95'}`}>
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 flex items-center justify-center rounded-2xl ${type === 'spin' ? 'bg-blue-50 text-blue-600' : 'bg-yellow-50 text-yellow-600'}`}>
                    {type === 'spin' ? <ICONS.Spin className="w-6 h-6" /> : <ICONS.Coin className="w-6 h-6" />}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-black text-sm text-gray-800 dark:text-white leading-tight">{link.title}</h3>
                    <span className="text-[9px] font-bold text-gray-400 uppercase">{link.date}</span>
                  </div>
                  <button 
                    disabled={isClaimed}
                    onClick={() => handleClaim(link.id, link.url)}
                    className={`px-4 py-2 rounded-xl font-black text-[10px] text-white uppercase shadow-md ${isClaimed ? 'bg-gray-300' : type === 'spin' ? 'bg-blue-600' : 'bg-yellow-500'}`}
                  >
                    {isClaimed ? 'X' : 'NHẬN'}
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
