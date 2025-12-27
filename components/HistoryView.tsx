
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

  const colors = ['#3b82f6', '#ec4899', '#8b5cf6', '#10b981'];

  return (
    <div className="p-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between mb-8">
        <button onClick={onBack} className="flex items-center text-blue-600 font-semibold px-4 py-2 bg-blue-50 dark:bg-blue-900/20 rounded-2xl transition">
          <span className="mr-2">←</span> Quay lại
        </button>
        <h2 className="text-xl font-bold dark:text-white">📊 Lịch sử 7 ngày</h2>
      </div>

      {sessions.length > 0 ? (
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-[2.5rem] shadow-sm border border-gray-100 dark:border-gray-700 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} />
                <Tooltip 
                  cursor={{fill: 'transparent'}}
                  contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'}}
                />
                <Bar dataKey="total" radius={[8, 8, 0, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-4">
            <h3 className="font-bold text-lg dark:text-white px-2">Các phiên gần nhất</h3>
            {sessions.map((session) => (
              <div key={session.id} className="bg-white dark:bg-gray-800 p-5 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{session.date}</span>
                    <h4 className="font-bold text-lg text-gray-800 dark:text-white">Phiên #{session.id.slice(-4)}</h4>
                  </div>
                  <div className="bg-blue-600 text-white px-4 py-1 rounded-full font-bold">
                    {session.total} lượt
                  </div>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {Object.entries(session.counts).map(([type, count]) => (
                    <div key={type} className="text-center p-2 bg-gray-50 dark:bg-gray-700 rounded-xl">
                      <p className="text-[10px] text-gray-400 font-bold uppercase">{type.slice(0, 3)}</p>
                      <p className="font-black dark:text-white">{count}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-gray-400">
          <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </div>
          <p>Chưa có lịch sử, hãy bắt đầu ngay!</p>
        </div>
      )}
    </div>
  );
};

export default HistoryView;
