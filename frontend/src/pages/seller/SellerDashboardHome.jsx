import React, { useState, useEffect } from 'react';
import { Building2, DollarSign, Activity } from 'lucide-react';

const defaultStats = [
  { label: 'My Properties', value: 0, icon: <Building2 className="w-7 h-7 text-sky-500" /> },
  { label: 'Active Listings', value: 0, icon: <Building2 className="w-7 h-7 text-green-500" /> },
  { label: 'Earnings', value: 'NPR 0', icon: <DollarSign className="w-7 h-7 text-yellow-500" /> },
];

export default function SellerDashboardHome() {
  const [stats, setStats] = useState(defaultStats);
  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!user?.id || !token) {
        setLoading(false);
        return;
      }

      try {
        // Fetch seller statistics
        const statsResponse = await fetch(`/api/seller/stats/${user.id}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (statsResponse.ok) {
          const statsData = await statsResponse.json();
          if (statsData.success) {
            setStats([
              { label: 'My Properties', value: statsData.data.totalProperties || 0, icon: <Building2 className="w-7 h-7 text-sky-500" /> },
              { label: 'Active Listings', value: statsData.data.activeListings || 0, icon: <Building2 className="w-7 h-7 text-green-500" /> },
              { label: 'Earnings', value: `NPR ${statsData.data.totalEarnings?.toLocaleString() || 0}`, icon: <DollarSign className="w-7 h-7 text-yellow-500" /> },
            ]);
          }
        }

        // Fetch recent activity
        const activityResponse = await fetch(`/api/seller/activity/${user.id}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (activityResponse.ok) {
          const activityData = await activityResponse.json();
          if (activityData.success) {
            setRecentActivity(activityData.data || []);
          }
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [user?.id, token]);

  if (loading) {
    return (
      <div className="space-y-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-2xl shadow p-6 animate-pulse">
              <div className="flex items-center gap-4">
                <div className="bg-gray-200 p-3 rounded-xl w-16 h-16"></div>
                <div className="space-y-2">
                  <div className="bg-gray-200 h-6 w-16 rounded"></div>
                  <div className="bg-gray-200 h-4 w-24 rounded"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

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
        {recentActivity.length > 0 ? (
          <ul className="divide-y divide-sky-100">
            {recentActivity.map((item, i) => (
              <li key={i} className="py-3 flex justify-between items-center">
                <span>{item.action}</span>
                <span className="text-xs text-gray-400">{item.time}</span>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <Activity className="w-12 h-12 mx-auto mb-2 text-gray-300" />
            <p>No recent activity found</p>
          </div>
        )}
      </div>
    </div>
  );
}