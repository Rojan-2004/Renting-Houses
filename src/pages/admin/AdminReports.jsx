import React from 'react';
import { BarChart2, Building2, Users, DollarSign, Activity } from 'lucide-react';

const stats = [
  { label: 'Properties', value: 128, icon: <Building2 className="w-6 h-6 text-sky-500" /> },
  { label: 'Users', value: 542, icon: <Users className="w-6 h-6 text-sky-500" /> },
  { label: 'Revenue', value: 'NPR 2,500,000', icon: <DollarSign className="w-6 h-6 text-sky-500" /> },
];

const recent = [
  { action: 'New property added', date: '2024-06-01' },
  { action: 'User registered', date: '2024-06-02' },
  { action: 'Transaction completed', date: '2024-06-03' },
];

export default function AdminReports() {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4 mb-4">
        <BarChart2 className="w-7 h-7 text-sky-500" />
        <h2 className="text-2xl font-bold text-sky-700">Reports & Analytics</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white rounded-2xl shadow p-6 flex items-center gap-4">
            <div className="bg-sky-100 p-3 rounded-xl flex items-center justify-center">
              {stat.icon}
            </div>
            <div>
              <div className="text-xl font-bold text-sky-700">{stat.value}</div>
              <div className="text-gray-500 text-sm font-medium">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-2xl shadow p-6 flex flex-col items-center">
        <div className="flex items-center gap-2 mb-4">
          <Activity className="w-6 h-6 text-sky-500" />
          <span className="text-lg font-semibold text-sky-700">Analytics Chart</span>
        </div>
        <div className="w-full h-40 bg-sky-50 rounded-xl flex items-center justify-center text-sky-300 text-2xl font-bold">
          [Chart Placeholder]
        </div>
      </div>
      <div className="bg-white rounded-2xl shadow p-6">
        <div className="text-lg font-semibold text-sky-700 mb-4">Recent Activity</div>
        <ul className="divide-y divide-sky-100">
          {recent.map((item, i) => (
            <li key={i} className="py-3 flex justify-between items-center">
              <span>{item.action}</span>
              <span className="text-xs text-gray-400">{item.date}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
} 