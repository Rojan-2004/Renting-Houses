import React from 'react';
import { Building2, DollarSign, Activity } from 'lucide-react';

const stats = [
  { label: 'My Properties', value: 12, icon: <Building2 className="w-7 h-7 text-sky-500" /> },
  { label: 'Active Listings', value: 8, icon: <Building2 className="w-7 h-7 text-green-500" /> },
  { label: 'Earnings', value: 'NPR 450,000', icon: <DollarSign className="w-7 h-7 text-yellow-500" /> },
];

const recentActivity = [
  { action: 'Added new property', time: '2 min ago' },
  { action: 'Edited listing', time: '10 min ago' },
  { action: 'Received payment', time: '1 hour ago' },
  { action: 'Message from admin', time: '2 hours ago' },
];

export default function SellerDashboardHome() {
  return (
    <div className="space-y-8">
      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white rounded-2xl shadow p-6 flex items-center gap-4">
            <div className="bg-sky-100 p-3 rounded-xl flex items-center justify-center">
              {stat.icon}
            </div>
            <div>
              <div className="text-2xl font-bold text-sky-700">{stat.value}</div>
              <div className="text-gray-500 text-sm font-medium">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>
      {/* Chart Placeholder */}
      <div className="bg-white rounded-2xl shadow p-6 flex flex-col items-center">
        <div className="flex items-center gap-2 mb-4">
          <Activity className="w-6 h-6 text-sky-500" />
          <span className="text-lg font-semibold text-sky-700">Earnings Activity (Chart)</span>
        </div>
        <div className="w-full h-40 bg-sky-50 rounded-xl flex items-center justify-center text-sky-300 text-2xl font-bold">
          [Chart Placeholder]
        </div>
      </div>
      {/* Recent Activity */}
      <div className="bg-white rounded-2xl shadow p-6">
        <div className="text-lg font-semibold text-sky-700 mb-4">Recent Activity</div>
        <ul className="divide-y divide-sky-100">
          {recentActivity.map((item, i) => (
            <li key={i} className="py-3 flex justify-between items-center">
              <span>{item.action}</span>
              <span className="text-xs text-gray-400">{item.time}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
} 