
import React, { useState, useEffect } from 'react';
import { ICONS, COLORS } from '../constants.tsx';
import { SpinLink } from '../types.ts';

interface LinkViewProps {
  type: 'spin' | 'coin';
  onBack: () => void;
}

const LinkView: React.FC<LinkViewProps> = ({ type, onBack }) => {
  const [links, setLinks] = useState<SpinLink[]>([]);
  const [loading, setLoading] = useState(true);
  const [claimedLinks, setClaimedLinks] = useState<string[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('thv_claimed_v1');
    if (saved) setClaimedLinks(JSON.parse(saved));
    fetchData();
  }, [type]);

  const fetchData = async () => {
    setLoading(true);
    const now = new Date();
    const mockData: SpinLink[] = Array.from({ length: 15 }, (_, i) => {
      const date = new Date(now);
      date.setHours(now.getHours() - i * 2);
      const amount = type === 'spin' ? (i % 3 === 0 ? '50' : '25') : `${(i + 1) * 3}M`;
      
      return {
        id: `thv_${type}_${i}_${date.getDate()}`,
        title: type === 'spin' ? 'THV Premium Reward' : 'THV Gold Bonus',
        amount: amount,
        url: `https://static.moonactive.net/static/coinmaster/reward.html?g=thv_reward_${type}_${i}`,
        timestamp: date.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
        isNew: i < 3
      };
    });

    setTimeout(() => {
      setLinks(mockData);
      setLoading(false);
    }, 500);
  };

  const handleClaim = (id: string, url: string) => {
    if (claimedLinks.includes(id)) return;
    const newClaimed = [...claimedLinks, id];
    setClaimedLinks(newClaimed);
    localStorage.setItem('thv_claimed_v1', JSON.stringify(newClaimed));
    
    const playStoreUrl = "https://play.google.com/store/apps/details?id=com.moonactive.coinmaster";
    const intentUrl = `intent://claim-reward?url=${encodeURIComponent(url)}&package=com.moonactive.coinmaster&store=${encodeURIComponent(playStoreUrl)}&brand=THV`;
    window.location.href = intentUrl;

    setTimeout(() => {
        window.open(url, '_blank');
    }, 200);
  };

  return (
    <div className="animate-in slide-in-from-right-4 duration-300">
      <div className="p-6 flex items-center justify-between bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700 sticky top-0 z-20 backdrop-blur-md bg-opacity-90">
        <button onClick={onBack} className="w-10 h-10 flex items-center justify-center bg-gray-50 dark:bg-gray-700 rounded-xl active:scale-90 transition-transform border border-gray-100 dark:border-gray-600">
          <span className="text-xl font-bold italic">←</span>
        </button>
        <div className="text-center">
          <h2 className="text-sm font-black dark:text-white uppercase tracking-tighter italic">
            {type === 'spin' ? '🌀 THV R-SPINS' : '🪙 THV R-COINS'}
          </h2>
          <p className="text-[9px] font-black text-blue-600 uppercase tracking-widest flex items-center justify-center gap-1">
             <ICONS.Badge className="w-2.5 h-2.5" /> Verified Link
          </p>
        </div>
        <div className="w-10 h-10">
           <ICONS.LogoTHV className="w-full h-full opacity-30" />
        </div>
      </div>

      <div className="p-5 space-y-4 pb-28">
        {loading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-24 bg-white dark:bg-gray-800 animate-pulse rounded-[2.5rem] border border-gray-100 dark:border-gray-700"></div>
          ))
        ) : (
          links.map((link) => {
            const isClaimed = claimedLinks.includes(link.id);
            return (
              <div 
                key={link.id} 
                className={`relative bg-white dark:bg-gray-800 p-5 rounded-[2.5rem] border border-gray-100 dark:border-gray-700 shadow-sm transition-all overflow-hidden ${isClaimed ? 'opacity-40 grayscale' : 'hover:border-blue-200 dark:hover:border-blue-800 hover:shadow-lg hover:shadow-blue-500/5'}`}
              >
                {link.isNew && !isClaimed && (
                  <div className="absolute top-0 right-10 bg-gradient-to-r from-red-600 to-orange-500 text-white text-[7px] font-black px-4 py-1 rounded-b-xl uppercase tracking-widest animate-pulse z-10">
                    Active
                  </div>
                )}

                <div className="flex items-center gap-4 relative z-10">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-inner ${type === 'spin' ? 'bg-blue-50 text-blue-600' : 'bg-amber-50 text-amber-600'}`}>
                    {type === 'spin' ? <ICONS.Spin className="w-8 h-8" /> : <ICONS.Coin className="w-8 h-8" />}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-1.5">
                      <span className="text-2xl font-black dark:text-white italic tracking-tighter">{link.amount}</span>
                      <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">{type === 'spin' ? 'Spins' : 'Coins'}</span>
                    </div>
                    <p className="text-[9px] font-black text-gray-400 uppercase tracking-[0.15em] flex items-center gap-1">
                       <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                       {link.timestamp} • Official
                    </p>
                  </div>

                  <button 
                    disabled={isClaimed}
                    onClick={() => handleClaim(link.id, link.url)}
                    className={`px-7 py-3.5 rounded-2xl font-black text-[10px] uppercase transition-all active:scale-90 shadow-xl italic ${
                      isClaimed 
                        ? 'bg-gray-100 text-gray-400 shadow-none' 
                        : type === 'spin' 
                          ? 'bg-blue-600 text-white shadow-blue-500/30' 
                          : 'bg-amber-500 text-white shadow-amber-500/30'
                    }`}
                  >
                    {isClaimed ? 'DONE' : 'CLAIM'}
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default LinkView;
