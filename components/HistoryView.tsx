
import React from 'react';
import { EventSession } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface HistoryViewProps {
  sessions: EventSession[];
  onBack: () => void;
}

const HistoryView: React.FC<HistoryViewProps> = ({ sessions, onBack }) => {
  // Xử lý dữ liệu biểu đồ an toàn
  const chartData = (sessions || []).slice(0, 7).reverse().map(s => {
    const dateParts = (s.date || "").split('/');
    return {
      name: dateParts.length >= 2 ? `${dateParts[0]}/${dateParts[1]}` : "N/A",
      total: s.total || 0,
    };
  });

  const colors = ['#3b82f6', '#ec4899', '#8b5cf6', '#10b981', '#f59e0b', '#06b6d4', '#6366f1'];

  return (
    <div className="p-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between mb-8">
        <button onClick={onBack} className="text-blue-600 font-bold bg-white px-4 py-2 rounded-xl border border-gray-100 shadow-sm">
          ← Quay lại
        </button>
        <h2 className="text-xl font-black dark:text-white uppercase tracking-tight">📊 Thống kê</h2>
      </div>

      {sessions && sessions.length > 0 ? (
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-[2.5rem] shadow-sm border border-gray-100 dark:border-gray-700 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 700}} />
                <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'}} />
                <Bar dataKey="total" radius={[8, 8, 8, 8]} barSize={20}>
                  {chartData.map((entry, index) => <Cell key={index} fill={colors[index % colors.length]} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-4">
            {sessions.map((session) => (
              <div key={session.id} className="bg-white dark:bg-gray-800 p-5 rounded-[2rem] border border-gray-100 dark:border-gray-700">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <span className="text-[10px] font-black text-blue-500 uppercase">{session.date}</span>
                    <h4 className="font-black dark:text-white">Phiên quay #{session.id.slice(-4)}</h4>
                  </div>
                  <div className="bg-blue-600 text-white px-4 py-1 rounded-full font-black">{session.total}</div>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {Object.entries(session.counts).map(([type, count]) => (
                    <div key={type} className="bg-gray-50 dark:bg-gray-700/50 p-2 rounded-xl text-center">
                      <p className="text-[8px] text-gray-400 font-bold uppercase">{type}</p>
                      <p className="font-black dark:text-white">{count}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="py-20 text-center bg-white dark:bg-gray-800 rounded-[3rem] border-2 border-dashed border-gray-100">
          <p className="text-gray-400 font-bold">Chưa có lịch sử quay</p>
        </div>
      )}
    </div>
  );
};

export default HistoryView;
