
import React, { useState, useEffect } from 'react';
import { MOCK_SPIN_LINKS, MOCK_COIN_LINKS, ICONS } from '../constants';
import { SpinLink } from '../types';

interface LinkViewProps {
  type: 'spin' | 'coin';
  onBack: () => void;
}

const LinkView: React.FC<LinkViewProps> = ({ type, onBack }) => {
  const [links, setLinks] = useState<SpinLink[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API fetch from PHP backend
    const timer = setTimeout(() => {
      setLinks(type === 'spin' ? MOCK_SPIN_LINKS : MOCK_COIN_LINKS);
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, [type]);

  const handleShare = (link: SpinLink) => {
    if (navigator.share) {
      navigator.share({
        title: link.title,
        text: `Nhận quà Coin Master tại đây: ${link.url}`,
        url: link.url,
      }).catch(console.error);
    } else {
      alert(`Đã copy link: ${link.url}`);
    }
  };

  return (
    <div className="p-6 animate-in slide-in-from-right-4 duration-300">
      <div className="flex items-center justify-between mb-8">
        <button onClick={onBack} className="flex items-center text-blue-600 font-semibold bg-blue-50 dark:bg-blue-900/20 px-4 py-2 rounded-2xl transition hover:bg-blue-100">
          <span className="mr-2">←</span> Quay lại
        </button>
        <h2 className="text-xl font-bold dark:text-white">
          {type === 'spin' ? '🔗 Spin Links' : '💰 Coin Links'}
        </h2>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-24 bg-gray-100 dark:bg-gray-800 animate-pulse rounded-3xl w-full"></div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {links.length > 0 ? links.map((link) => (
            <div key={link.id} className="bg-white dark:bg-gray-800 p-5 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition">
              <div className="flex items-center gap-4 mb-4">
                <div className={`w-12 h-12 flex items-center justify-center rounded-2xl ${type === 'spin' ? 'bg-blue-100 text-blue-600' : 'bg-yellow-100 text-yellow-600'}`}>
                  {type === 'spin' ? <ICONS.Spin className="w-7 h-7" /> : <ICONS.Coin className="w-7 h-7" />}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-800 dark:text-white line-clamp-1">{link.title}</h3>
                  <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">{link.date}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <a 
                  href={link.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={`flex items-center justify-center py-3 rounded-2xl font-bold text-white shadow-sm transition hover:scale-[1.02] active:scale-95 ${type === 'spin' ? 'bg-blue-500 shadow-blue-200 dark:shadow-none' : 'bg-yellow-500 shadow-yellow-200 dark:shadow-none'}`}
                >
                  Nhận ngay
                </a>
                <button 
                  onClick={() => handleShare(link)} 
                  className="flex items-center justify-center py-3 rounded-2xl font-bold bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 transition"
                >
                  Chia sẻ
                </button>
              </div>
            </div>
          )) : (
            <div className="text-center py-20">
              <p className="text-gray-400">Hiện chưa có link mới, vui lòng quay lại sau!</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default LinkView;
