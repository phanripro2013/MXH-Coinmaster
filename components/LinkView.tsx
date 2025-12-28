
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
    // Lấy danh sách link đã nhận từ localStorage
    const saved = localStorage.getItem('claimed_links');
    if (saved) setClaimedLinks(JSON.parse(saved));
  }, []);

  const fetchLinks = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}get_links.php?type=${type}`);
      if (!response.ok) throw new Error('API Error');
      const result = await response.json();
      if (result.status === 'success') {
        setLinks(result.data);
      } else {
        throw new Error();
      }
    } catch (err) {
      // Dữ liệu mẫu phong phú (20 link) khi chưa có backend
      const mockLinks: SpinLink[] = Array.from({ length: 20 }, (_, i) => ({
        id: i + 1,
        title: type === 'spin' ? `${i % 2 === 0 ? '25' : '50'} Free Spins` : `${i + 1} Million Coins`,
        url: `https://static.moonactive.net/static/coinmaster/reward.html?g=target_id_${i}`,
        date: i === 0 ? 'Vừa xong' : i < 5 ? `${i * 15} phút trước` : `${Math.floor(i/2)} giờ trước`
      }));
      setLinks(mockLinks);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLinks();
  }, [type]);

  const handleClaim = (id: number, url: string) => {
    // Lưu trạng thái đã nhận
    const newClaimed = [...claimedLinks, id];
    setClaimedLinks(newClaimed);
    localStorage.setItem('claimed_links', JSON.stringify(newClaimed));
    
    // Mở link game
    window.open(url, '_blank');
  };

  return (
    <div className="p-6 animate-in slide-in-from-right-4 duration-300">
      <div className="flex items-center justify-between mb-8">
        <button onClick={onBack} className="w-12 h-12 flex items-center justify-center bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700 rounded-2xl text-gray-600 dark:text-gray-300 active:scale-90 transition-transform">
          <span className="text-xl">←</span>
        </button>
        <div className="text-right">
          <h2 className="text-xl font-black dark:text-white uppercase tracking-tight">
            {type === 'spin' ? '🔗 Spin Rewards' : '💰 Coin Rewards'}
          </h2>
          <p className="text-[10px] font-black text-blue-600 dark:text-blue-400 uppercase tracking-widest">Danh sách mới nhất</p>
        </div>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="h-40 bg-white dark:bg-gray-800 animate-pulse rounded-[2.5rem]"></div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {links.map((link) => {
            const isClaimed = claimedLinks.includes(link.id);
            return (
              <div 
                key={link.id} 
                className={`bg-white dark:bg-gray-800 p-6 rounded-[2.5rem] shadow-sm border border-gray-100 dark:border-gray-700 relative overflow-hidden transition-all ${isClaimed ? 'received-link' : 'hover:shadow-lg'}`}
              >
                <div className="flex items-start gap-4 mb-6">
                  <div className={`w-14 h-14 flex items-center justify-center rounded-2xl ${isClaimed ? 'bg-gray-100 text-gray-400' : type === 'spin' ? 'bg-blue-50 text-blue-600' : 'bg-yellow-50 text-yellow-600'}`}>
                    {type === 'spin' ? <ICONS.Spin className="w-8 h-8" /> : <ICONS.Coin className="w-8 h-8" />}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-black text-lg text-gray-800 dark:text-white leading-tight">
                        {link.title}
                      </h3>
                      {isClaimed && (
                        <span className="bg-green-100 text-green-600 text-[10px] px-2 py-0.5 rounded-full font-black uppercase">Đã nhận</span>
                      )}
                    </div>
                    <p className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wide">{link.date}</p>
                  </div>
                </div>
                
                <button 
                  onClick={() => !isClaimed && handleClaim(link.id, link.url)}
                  disabled={isClaimed}
                  className={`w-full py-4 flex items-center justify-center rounded-2xl font-black text-white shadow-lg transition transform active:scale-95 ${
                    isClaimed 
                    ? 'bg-gray-300 shadow-none cursor-default' 
                    : type === 'spin' ? 'bg-blue-600 shadow-blue-200' : 'bg-yellow-500 shadow-yellow-200'
                  }`}
                >
                  {isClaimed ? 'ĐÃ NHẬN THƯỞNG' : 'NHẬN QUÀ NGAY'}
                </button>
                
                {!isClaimed && (
                  <div className={`absolute -right-6 -top-6 w-24 h-24 rounded-full opacity-[0.03] ${type === 'spin' ? 'bg-blue-600' : 'bg-yellow-500'}`}></div>
                )}
              </div>
            );
          })}
          
          <div className="text-center py-12">
            <p className="text-xs text-gray-400 font-medium mb-4 italic">Đã hiển thị tất cả các link khả dụng hôm nay</p>
            <button onClick={() => { localStorage.removeItem('claimed_links'); setClaimedLinks([]); fetchLinks(); }} className="text-[10px] font-black text-red-500 uppercase tracking-widest hover:underline">
              Làm mới trạng thái nhận quà
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LinkView;
