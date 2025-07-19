import React, { useEffect, useState } from 'react';
import { Building2, Users, Receipt, DollarSign, Activity, Clock, User, Home } from 'lucide-react';

export default function AdminDashboardHome() {
  const [dashboardData, setDashboardData] = useState({
    stats: {
      totalUsers: 0,
      totalProperties: 0,
      totalBookings: 0,
      totalRevenue: 0
    },
    recentBookings: [],
    recentUsers: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:5000/api/admin/dashboard', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch dashboard data');
        }

        const data = await response.json();
        setDashboardData(data);
      } catch (err) {
        setError(err.message);
        console.error('Dashboard data fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-NP', {
      style: 'currency',
      currency: 'NPR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const formatTimeAgo = (date) => {
    const now = new Date();
    const diffInMs = now - new Date(date);
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInMinutes < 60) {
      return `${diffInMinutes} min ago`;
    } else if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    } else {
      return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
    }
  };

  const stats = [
    { 
      label: 'Total Properties', 
      value: dashboardData.stats.totalProperties, 
      icon: <Building2 className="w-7 h-7 text-sky-500" /> 
    },
    { 
      label: 'Total Users', 
      value: dashboardData.stats.totalUsers, 
      icon: <Users className="w-7 h-7 text-sky-500" /> 
    },
    { 
      label: 'Total Bookings', 
      value: dashboardData.stats.totalBookings, 
      icon: <Receipt className="w-7 h-7 text-sky-500" /> 
    },
    { 
      label: 'Total Revenue', 
      value: formatCurrency(dashboardData.stats.totalRevenue), 
      icon: <DollarSign className="w-7 h-7 text-sky-500" /> 
    },
  ];

  if (loading) {
    return (
      <div className="space-y-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white rounded-2xl shadow p-6 animate-pulse">
              <div className="flex items-center gap-4">
                <div className="bg-gray-200 p-3 rounded-xl w-16 h-16"></div>
                <div className="flex-1">
                  <div className="h-6 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-20"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-600">Error loading dashboard data: {error}</p>
      </div>
    );
  }

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
      {/* Recent Bookings */}
      <div className="bg-white rounded-2xl shadow p-6">
        <div className="text-lg font-semibold text-sky-700 mb-4">Recent Bookings</div>
        {dashboardData.recentBookings.length > 0 ? (
          <ul className="divide-y divide-sky-100">
            {dashboardData.recentBookings.map((booking, i) => (
              <li key={i} className="py-3 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="bg-sky-100 p-2 rounded-lg">
                    <Home className="w-4 h-4 text-sky-600" />
                  </div>
                  <div>
                    <span className="font-medium text-gray-900">
                      {booking.user?.name || 'Unknown User'}
                    </span>
                    <span className="text-gray-600"> booked </span>
                    <span className="font-medium text-sky-600">
                      {booking.property?.title || 'Property'}
                    </span>
                    <div className="text-sm text-gray-500">
                      {formatCurrency(booking.totalAmount)} • {booking.status}
                    </div>
                  </div>
                </div>
                <span className="text-xs text-gray-400">
                  {formatTimeAgo(booking.createdAt)}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 text-center py-4">No recent bookings</p>
        )}
      </div>

      {/* Recent Users */}
      <div className="bg-white rounded-2xl shadow p-6">
        <div className="text-lg font-semibold text-sky-700 mb-4">Recent Users</div>
        {dashboardData.recentUsers.length > 0 ? (
          <ul className="divide-y divide-sky-100">
            {dashboardData.recentUsers.map((user, i) => (
              <li key={i} className="py-3 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="bg-sky-100 p-2 rounded-lg">
                    <User className="w-4 h-4 text-sky-600" />
                  </div>
                  <div>
                    <span className="font-medium text-gray-900">
                      {user.name}
                    </span>
                    <div className="text-sm text-gray-500">
                      {user.email} • {user.role}
                      {!user.isActive && (
                        <span className="ml-2 px-2 py-1 bg-red-100 text-red-600 text-xs rounded-full">
                          Inactive
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <span className="text-xs text-gray-400">
                  {formatTimeAgo(user.createdAt)}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 text-center py-4">No recent users</p>
        )}
      </div>
    </div>
  );
}