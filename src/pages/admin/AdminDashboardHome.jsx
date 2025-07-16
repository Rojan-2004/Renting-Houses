import React, { useEffect, useState } from 'react';
import { Building2, Users, Receipt, DollarSign, Activity } from 'lucide-react';

const recentActivity = [
  { user: 'Allena', action: 'Added new property', time: '2 min ago' },
  { user: 'Prakriti', action: 'Approved rental', time: '10 min ago' },
  { user: 'Admin', action: 'Banned user', time: '1 hour ago' },
  { user: 'Ramesh', action: 'Completed purchase', time: '2 hours ago' },
];

export default function AdminDashboardHome() {
  const [userCount, setUserCount] = useState(0);
  const [propertyCount, setPropertyCount] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch('http://localhost:4000/api/users/count', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
      .then(async res => {
        const data = await res.json().catch(() => ({}));
        console.log('User count response:', res.status, data);
        return data;
      })
      .then(data => setUserCount(data.count || 0));
    fetch('http://localhost:4000/api/properties/count', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
      .then(async res => {
        const data = await res.json().catch(() => ({}));
        console.log('Property count response:', res.status, data);
        return data;
      })
      .then(data => setPropertyCount(data.count || 0));
  }, []);

  const stats = [
    { label: 'Total Properties', value: propertyCount, icon: <Building2 className="w-7 h-7 text-sky-500" /> },
    { label: 'Total Users', value: userCount, icon: <Users className="w-7 h-7 text-sky-500" /> },
    { label: 'Transactions', value: 312, icon: <Receipt className="w-7 h-7 text-sky-500" /> },
    { label: 'Revenue', value: 'NPR 2,500,000', icon: <DollarSign className="w-7 h-7 text-sky-500" /> },
  ];

  return (
    <div className="space-y-8">
      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
          <span className="text-lg font-semibold text-sky-700">Site Activity (Chart)</span>
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
              <span><span className="font-bold text-sky-600">{item.user}</span> {item.action}</span>
              <span className="text-xs text-gray-400">{item.time}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
} 