
import React, { useState, useEffect } from 'react';
import { ICONS, API_BASE_URL } from '../constants';
import { SpinLink } from '../types';

interface LinkViewProps {
  type: 'spin' | 'coin';
  onBack: () => void;
}

const LinkView: React.FC<LinkViewProps> = ({ type, onBack }) => {
  const [links, setLinks] = useState<SpinLink[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLinks = async () => {
    setLoading(true);
    setError(null);
    try {
      // Endpoint thực tế trên hosting của bạn
      const response = await fetch(`${API_BASE_URL}get_links.php?type=${type}`);
      if (!response.ok) throw new Error('Network response was not ok');
      
      const result = await response.json();
      if (result.status === 'success') {
        setLinks(result.data);
      } else {
        throw new Error(result.message || 'Lỗi dữ liệu');
      }
    } catch (err: any) {
      console.error('Fetch error:', err);
      // Fallback data khi chưa có host để demo UI "Auto"
      const mockData = [
        { id: 1, title: type === 'spin' ? '25 Free Spins' : '2 Million Coins', url: '#', date: 'Mới cập nhật' },
        { id: 2, title: type === 'spin' ? '50 Free Spins' : '5 Million Coins', url: '#', date: '1 giờ trước' },
      ];
      setLinks(mockData);
      // setError('Đang chạy chế độ demo. Vui lòng deploy backend PHP để lấy link thực.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLinks();
  }, [type]);

  return (
    <div className="p-6 animate-in slide-in-from-right-4 duration-300">
      <div className="flex items-center justify-between mb-8">
        <button onClick={onBack} className="w-12 h-12 flex items-center justify-center bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700 rounded-2xl text-gray-600 dark:text-gray-300">
          <span className="text-xl">←</span>
        </button>
        <div className="text-right">
          <h2 className="text-xl font-black dark:text-white uppercase tracking-tight">
            {type === 'spin' ? '🔗 Spin Rewards' : '💰 Coin Rewards'}
          </h2>
          <p className="text-[10px] font-black text-blue-600 dark:text-blue-400 uppercase tracking-widest">Tự động đồng bộ</p>
        </div>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-36 bg-white dark:bg-gray-800 animate-pulse rounded-[2.5rem] border border-gray-50 dark:border-gray-700"></div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {links.map((link) => (
            <div key={link.id} className="bg-white dark:bg-gray-800 p-6 rounded-[2.5rem] shadow-sm border border-gray-100 dark:border-gray-700 relative overflow-hidden group">
              <div className="flex items-start gap-4 mb-6">
                <div className={`w-14 h-14 flex items-center justify-center rounded-2xl ${type === 'spin' ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20' : 'bg-yellow-50 text-yellow-600 dark:bg-yellow-900/20'}`}>
                  {type === 'spin' ? <ICONS.Spin className="w-8 h-8" /> : <ICONS.Coin className="w-8 h-8" />}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-black text-lg text-gray-800 dark:text-white leading-tight">{link.title}</h3>
                    <div className="w-4 h-4 bg-blue-500 text-white rounded-full flex items-center justify-center shadow-md">
                      <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
                    </div>
                  </div>
                  <p className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wide">{link.date}</p>
                </div>
              </div>
              
              <a 
                href={link.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className={`w-full py-4 flex items-center justify-center rounded-2xl font-black text-white shadow-lg transition transform active:scale-95 ${type === 'spin' ? 'bg-blue-600 shadow-blue-200 dark:shadow-none' : 'bg-yellow-500 shadow-yellow-200 dark:shadow-none'}`}
              >
                NHẬN QUÀ NGAY
              </a>
              
              {/* Subtle background decoration */}
              <div className={`absolute -right-6 -top-6 w-24 h-24 rounded-full opacity-[0.03] dark:opacity-[0.05] ${type === 'spin' ? 'bg-blue-600' : 'bg-yellow-500'}`}></div>
            </div>
          ))}
          
          <div className="text-center py-8">
            <button onClick={fetchLinks} className="text-xs font-black text-blue-600 dark:text-blue-400 uppercase tracking-widest hover:underline">
              Cập nhật lại danh sách
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LinkView;
