import React, { useState, useEffect } from 'react';
import { Receipt, Search, TrendingUp, Calendar, Filter } from 'lucide-react';

export default function SellerTransactions() {
  const [transactions, setTransactions] = useState([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [revenue, setRevenue] = useState({ total: 0, monthly: 0 });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchTransactions();
  }, [currentPage, statusFilter]);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const params = new URLSearchParams({
        page: currentPage,
        limit: 10
      });
      
      if (statusFilter) params.append('status', statusFilter);
      
      console.log('Seller Purchase Requests - Fetching data from:', `/api/bookings/seller/transactions?${params}`);
      console.log('Seller Purchase Requests - Request params:', { page: currentPage, limit: 10, statusFilter });
      
      const response = await fetch(`http://localhost:5000/api/bookings/seller/transactions?${params}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      console.log('Seller Purchase Requests - Response status:', response.status);
      
      if (response.ok) {
        const data = await response.json();
        console.log('Seller Purchase Requests - Raw response data:', data);
        console.log('Seller Purchase Requests - Transactions data:', data.data);
        console.log('Seller Purchase Requests - Revenue data:', data.revenue);
        console.log('Seller Purchase Requests - Total pages:', data.totalPages);
        console.log('Seller Purchase Requests - Number of transactions:', data.data?.length || 0);
        
        setTransactions(data.data || []);
        setRevenue(data.revenue || { total: 0, monthly: 0 });
        setTotalPages(data.totalPages || 1);
      } else {
        console.log('Seller Purchase Requests - Failed to fetch, response:', response);
        setError('Failed to fetch transactions');
      }
    } catch (err) {
      console.log('Seller Purchase Requests - Error occurred:', err);
      setError('Error loading transactions');
    } finally {
      setLoading(false);
    }
  };

  const filtered = transactions.filter(t =>
    (t.property?.title || '').toLowerCase().includes(search.toLowerCase()) ||
    (t.user?.name || '').toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="space-y-8">
        <div className="flex items-center gap-4 mb-4">
          <Receipt className="w-7 h-7 text-sky-500" />
          <h2 className="text-2xl font-bold text-sky-700">My Transactions</h2>
        </div>
        <div className="bg-white rounded-2xl shadow p-6">
          <div className="animate-pulse space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex space-x-4">
                <div className="bg-gray-200 h-4 w-12 rounded"></div>
                <div className="bg-gray-200 h-4 w-32 rounded"></div>
                <div className="bg-gray-200 h-4 w-16 rounded"></div>
                <div className="bg-gray-200 h-4 w-24 rounded"></div>
                <div className="bg-gray-200 h-4 w-20 rounded"></div>
                <div className="bg-gray-200 h-4 w-16 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-700';
      case 'confirmed': return 'bg-blue-100 text-blue-700';
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'cancelled': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4 mb-4">
        <Receipt className="w-7 h-7 text-sky-500" />
        <h2 className="text-2xl font-bold text-sky-700">My Transactions</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-gradient-to-r from-green-400 to-green-600 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm font-medium">Total Revenue</p>
              <p className="text-2xl font-bold">NPR {revenue.total.toLocaleString()}</p>
            </div>
            <TrendingUp className="w-8 h-8 text-green-200" />
          </div>
        </div>
        <div className="bg-gradient-to-r from-blue-400 to-blue-600 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm font-medium">Monthly Revenue</p>
              <p className="text-2xl font-bold">NPR {revenue.monthly.toLocaleString()}</p>
            </div>
            <Calendar className="w-8 h-8 text-blue-200" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow p-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex items-center gap-2 flex-1">
            <Search className="w-5 h-5 text-sky-400" />
            <input
              type="text"
              placeholder="Search by property or customer..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 border border-sky-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-sky-400 outline-none bg-sky-50"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-sky-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-sky-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-sky-400 outline-none bg-sky-50"
            >
              <option value="">All Status</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-8 text-sky-500 font-semibold">Loading transactions...</div>
        ) : error ? (
          <div className="text-center py-8 text-red-500 font-semibold">{error}</div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-sky-100 text-sky-700">
                    <th className="py-3 px-4 text-left">Booking ID</th>
                    <th className="py-3 px-4 text-left">Customer</th>
                    <th className="py-3 px-4 text-left">Property</th>
                    <th className="py-3 px-4 text-left">Check-in</th>
                    <th className="py-3 px-4 text-left">Check-out</th>
                    <th className="py-3 px-4 text-left">Amount</th>
                    <th className="py-3 px-4 text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="text-center py-8 text-gray-500">
                        No transactions found
                      </td>
                    </tr>
                  ) : (
                    filtered.map((transaction) => (
                      <tr key={transaction._id} className="even:bg-sky-50 hover:bg-sky-100 transition">
                        <td className="py-3 px-4 font-mono text-sm">{transaction._id.slice(-8)}</td>
                        <td className="py-3 px-4">{transaction.user?.name || 'N/A'}</td>
                        <td className="py-3 px-4">{transaction.property?.title || 'N/A'}</td>
                        <td className="py-3 px-4">{formatDate(transaction.checkIn)}</td>
                        <td className="py-3 px-4">{formatDate(transaction.checkOut)}</td>
                        <td className="py-3 px-4 font-semibold">NPR {transaction.totalAmount?.toLocaleString()}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded text-xs font-semibold capitalize ${getStatusColor(transaction.status)}`}>
                            {transaction.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-6">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1 rounded bg-sky-100 text-sky-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-sky-200"
                >
                  Previous
                </button>
                <span className="px-3 py-1 text-sky-700 font-medium">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 rounded bg-sky-100 text-sky-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-sky-200"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}