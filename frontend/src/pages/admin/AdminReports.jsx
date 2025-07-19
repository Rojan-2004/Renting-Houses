import React, { useEffect, useState } from 'react';
import { BarChart2, Building2, Users, DollarSign, Activity, TrendingUp, Calendar } from 'lucide-react';

export default function AdminReports() {
  const [analyticsData, setAnalyticsData] = useState({
    bookingStats: [],
    propertyStats: [],
    userGrowth: []
  });
  const [dashboardStats, setDashboardStats] = useState({
    totalUsers: 0,
    totalProperties: 0,
    totalRevenue: 0,
    totalBookings: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        
        const [analyticsResponse, dashboardResponse] = await Promise.all([
          fetch(`http://localhost:5000/api/admin/analytics?period=${selectedPeriod}`, {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            },
          }),
          fetch('http://localhost:5000/api/admin/dashboard', {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            },
          })
        ]);

        if (!analyticsResponse.ok || !dashboardResponse.ok) {
          throw new Error('Failed to fetch analytics data');
        }

        const analyticsData = await analyticsResponse.json();
        const dashboardData = await dashboardResponse.json();
        
        setAnalyticsData(analyticsData);
        setDashboardStats(dashboardData.stats);
      } catch (err) {
        setError(err.message);
        console.error('Analytics data fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedPeriod]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-NP', {
      style: 'currency',
      currency: 'NPR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const getTotalRevenue = () => {
    return analyticsData.bookingStats.reduce((total, stat) => {
      return stat._id === 'completed' ? total + stat.revenue : total;
    }, 0);
  };

  const stats = [
    { label: 'Properties', value: dashboardStats.totalProperties, icon: <Building2 className="w-6 h-6 text-sky-500" /> },
    { label: 'Users', value: dashboardStats.totalUsers, icon: <Users className="w-6 h-6 text-sky-500" /> },
    { label: 'Revenue', value: formatCurrency(getTotalRevenue()), icon: <DollarSign className="w-6 h-6 text-sky-500" /> },
  ];

  if (loading) {
    return (
      <div className="space-y-8">
        <div className="flex items-center gap-4 mb-4">
          <BarChart2 className="w-7 h-7 text-sky-500" />
          <h2 className="text-2xl font-bold text-sky-700">Reports & Analytics</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-2xl shadow p-6 animate-pulse">
              <div className="flex items-center gap-4">
                <div className="bg-gray-200 p-3 rounded-xl w-12 h-12"></div>
                <div className="flex-1">
                  <div className="h-6 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-16"></div>
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
        <p className="text-red-600">Error loading analytics data: {error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <BarChart2 className="w-7 h-7 text-sky-500" />
          <h2 className="text-2xl font-bold text-sky-700">Reports & Analytics</h2>
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-sky-500" />
          <select 
            value={selectedPeriod} 
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="bg-white border border-sky-200 rounded-lg px-3 py-2 text-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500"
          >
            <option value="week">Last Week</option>
            <option value="month">Last Month</option>
            <option value="year">Last Year</option>
          </select>
        </div>
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

      {/* Booking Statistics */}
      <div className="bg-white rounded-2xl shadow p-6">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-6 h-6 text-sky-500" />
          <span className="text-lg font-semibold text-sky-700">Booking Statistics</span>
        </div>
        {analyticsData.bookingStats.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {analyticsData.bookingStats.map((stat, i) => (
              <div key={i} className="bg-sky-50 rounded-lg p-4">
                <div className="text-sm text-gray-600 capitalize">{stat._id} Bookings</div>
                <div className="text-2xl font-bold text-sky-700">{stat.count}</div>
                <div className="text-sm text-green-600">{formatCurrency(stat.revenue)}</div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-4">No booking data available</p>
        )}
      </div>

      {/* Property Statistics */}
      <div className="bg-white rounded-2xl shadow p-6">
        <div className="flex items-center gap-2 mb-4">
          <Building2 className="w-6 h-6 text-sky-500" />
          <span className="text-lg font-semibold text-sky-700">Property Types</span>
        </div>
        {analyticsData.propertyStats.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {analyticsData.propertyStats.map((stat, i) => (
              <div key={i} className="bg-sky-50 rounded-lg p-4">
                <div className="text-sm text-gray-600 capitalize">{stat._id || 'Unknown'}</div>
                <div className="text-2xl font-bold text-sky-700">{stat.count}</div>
                <div className="text-sm text-green-600">Avg: {formatCurrency(stat.avgPrice || 0)}</div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-4">No property data available</p>
        )}
      </div>

      {/* User Growth */}
      <div className="bg-white rounded-2xl shadow p-6">
        <div className="flex items-center gap-2 mb-4">
          <Users className="w-6 h-6 text-sky-500" />
          <span className="text-lg font-semibold text-sky-700">User Growth</span>
        </div>
        {analyticsData.userGrowth.length > 0 ? (
          <div className="space-y-2">
            {analyticsData.userGrowth.slice(-10).map((growth, i) => (
              <div key={i} className="flex justify-between items-center py-2 border-b border-sky-100">
                <span className="text-gray-600">
                  {growth._id.year}-{String(growth._id.month).padStart(2, '0')}-{String(growth._id.day).padStart(2, '0')}
                </span>
                <div className="flex gap-4">
                  <span className="text-blue-600">Users: {growth.users}</span>
                  <span className="text-green-600">Sellers: {growth.sellers}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-4">No user growth data available</p>
        )}
      </div>
    </div>
  );
}