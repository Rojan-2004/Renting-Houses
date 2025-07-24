import React, { useState, useEffect } from 'react';
import { Search, Receipt, Filter, Calendar, DollarSign } from 'lucide-react';

export default function AdminTransactions() {
  const [transactions, setTransactions] = useState([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;

  const fetchTransactions = async (page = 1, status = 'all') => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams({
        page: page.toString(),
        limit: itemsPerPage.toString(),
        ...(status !== 'all' && { status })
      });
      
      const response = await fetch(`http://localhost:4000/api/bookings/all?${queryParams}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch transactions');
      }
      
      const data = await response.json();
      setTransactions(data.data || []);
      setTotalPages(data.totalPages || 1);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions(currentPage, statusFilter);
  }, [currentPage, statusFilter]);

  const handleStatusFilterChange = (status) => {
    setStatusFilter(status);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const filtered = transactions.filter(t =>
    (t.user?.name?.toLowerCase() || '').includes(search.toLowerCase()) ||
    (t.property?.title?.toLowerCase() || '').includes(search.toLowerCase()) ||
    (t.seller?.name?.toLowerCase() || '').includes(search.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-700';
      case 'confirmed':
        return 'bg-blue-100 text-blue-700';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'cancelled':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4 mb-4">
        <Receipt className="w-7 h-7 text-sky-500" />
        <h2 className="text-2xl font-bold text-sky-700">Transactions & Bookings</h2>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex items-center gap-2">
          <Search className="w-5 h-5 text-sky-400" />
          <input
            type="text"
            placeholder="Search by user, property, or seller..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="border border-sky-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-sky-400 outline-none bg-sky-50 w-64"
          />
        </div>
        
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-sky-400" />
          <select
            value={statusFilter}
            onChange={e => handleStatusFilterChange(e.target.value)}
            className="border border-sky-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-sky-400 outline-none bg-sky-50"
          >
            <option value="all">All Status</option>
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
          <div className="overflow-x-auto bg-white rounded-2xl shadow">
            <table className="min-w-full">
              <thead>
                <tr className="bg-sky-100 text-sky-700">
                  <th className="py-3 px-4 text-left">Booking ID</th>
                  <th className="py-3 px-4 text-left">User</th>
                  <th className="py-3 px-4 text-left">Property</th>
                  <th className="py-3 px-4 text-left">Seller</th>
                  <th className="py-3 px-4 text-left">Check-in</th>
                  <th className="py-3 px-4 text-left">Check-out</th>
                  <th className="py-3 px-4 text-left">Amount</th>
                  <th className="py-3 px-4 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="py-8 text-center text-gray-500">
                      No transactions found
                    </td>
                  </tr>
                ) : (
                  filtered.map((t) => (
                    <tr key={t._id} className="even:bg-sky-50 hover:bg-sky-100 transition">
                      <td className="py-3 px-4 font-mono text-sm">{t._id.slice(-8)}</td>
                      <td className="py-3 px-4">
                        <div>
                          <div className="font-medium">{t.user?.name || '-'}</div>
                          <div className="text-sm text-gray-500">{t.user?.email || '-'}</div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div>
                          <div className="font-medium">{t.property?.title || '-'}</div>
                          <div className="text-sm text-gray-500">{t.property?.location?.city || '-'}</div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div>
                          <div className="font-medium">{t.seller?.name || '-'}</div>
                          <div className="text-sm text-gray-500">{t.seller?.email || '-'}</div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4 text-sky-500" />
                          <span className="text-sm">{formatDate(t.checkIn)}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4 text-sky-500" />
                          <span className="text-sm">{formatDate(t.checkOut)}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-1">
                          <DollarSign className="w-4 h-4 text-green-500" />
                          <span className="font-semibold">NPR {t.totalAmount?.toLocaleString() || '-'}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${getStatusColor(t.status)}`}>
                          {t.status}
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
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-2 rounded-lg bg-sky-100 text-sky-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-sky-200 transition"
              >
                Previous
              </button>
              
              <div className="flex gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-3 py-2 rounded-lg transition ${
                      currentPage === page
                        ? 'bg-sky-500 text-white'
                        : 'bg-sky-100 text-sky-700 hover:bg-sky-200'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>
              
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-2 rounded-lg bg-sky-100 text-sky-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-sky-200 transition"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}