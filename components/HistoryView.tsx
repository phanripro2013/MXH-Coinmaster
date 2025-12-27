
import React from 'react';
import { EventSession } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface HistoryViewProps {
  sessions: EventSession[];
  onBack: () => void;
}

const HistoryView: React.FC<HistoryViewProps> = ({ sessions, onBack }) => {
  const chartData = sessions.slice(0, 7).reverse().map(s => ({
    name: s.date.split('/')[0] + '/' + s.date.split('/')[1],
    total: s.total,
  }));

  const colors = ['#3b82f6', '#ec4899', '#8b5cf6', '#10b981', '#f59e0b', '#06b6d4', '#6366f1'];

  return (
    <div className="p-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between mb-8">
        <button onClick={onBack} className="flex items-center text-blue-600 dark:text-blue-400 font-semibold px-4 py-2 bg-blue-50 dark:bg-blue-900/20 rounded-2xl transition">
          <span className="mr-2">←</span> Quay lại
        </button>
        <h2 className="text-xl font-black dark:text-white uppercase tracking-tight">📊 Lịch sử quay</h2>
      </div>

      {sessions.length > 0 ? (
        <div className="space-y-8">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-[2.5rem] shadow-sm border border-gray-100 dark:border-gray-700 h-72">
            <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-6 px-2">Biểu đồ 7 ngày</h3>
            <ResponsiveContainer width="100%" height="80%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: '#9ca3af', fontSize: 10, fontWeight: 700}} 
                />
                <Tooltip 
                  cursor={{fill: 'transparent'}}
                  contentStyle={{
                    borderRadius: '20px', 
                    border: 'none', 
                    boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)',
                    backgroundColor: '#1f2937',
                    color: '#fff'
                  }}
                  itemStyle={{color: '#fff', fontWeight: 'bold'}}
                  labelStyle={{color: '#9ca3af', marginBottom: '4px'}}
                />
                <Bar dataKey="total" radius={[12, 12, 12, 12]} barSize={24}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-4">
            <h3 className="font-black text-lg dark:text-white px-2 uppercase tracking-tight">Phiên quay gần nhất</h3>
            {sessions.map((session) => (
              <div key={session.id} className="bg-white dark:bg-gray-800 p-6 rounded-[2rem] shadow-sm border border-gray-100 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-900 transition-all group">
                <div className="flex justify-between items-center mb-5">
                  <div>
                    <span className="text-[10px] font-black text-blue-600 dark:text-blue-400 uppercase tracking-widest">{session.date}</span>
                    <h4 className="font-black text-xl text-gray-800 dark:text-white tracking-tighter">Phiên #{session.id.slice(-4)}</h4>
                  </div>
                  <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white px-5 py-2 rounded-2xl font-black text-lg shadow-lg shadow-blue-200 dark:shadow-none">
                    {session.total}
                  </div>
                </div>
                <div className="grid grid-cols-4 gap-3">
                  {Object.entries(session.counts).map(([type, count]) => (
                    <div key={type} className="text-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-2xl border border-transparent group-hover:border-gray-100 dark:group-hover:border-gray-600 transition-all">
                      <p className="text-[9px] text-gray-400 font-black uppercase tracking-widest mb-1">{type.slice(0, 3)}</p>
                      <p className="text-lg font-black dark:text-white">{count}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-24 text-gray-400 bg-white dark:bg-gray-800 rounded-[3rem] border border-dashed border-gray-200 dark:border-gray-700">
          <div className="w-20 h-20 bg-gray-50 dark:bg-gray-700/30 rounded-full flex items-center justify-center mb-6 text-gray-300">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </div>
          <p className="font-bold text-lg">Chưa có dữ liệu thống kê</p>
          <p className="text-sm">Hãy thực hiện phiên quay đầu tiên để bắt đầu!</p>
        </div>
      )}
    </div>
  );
};

export default HistoryView;
