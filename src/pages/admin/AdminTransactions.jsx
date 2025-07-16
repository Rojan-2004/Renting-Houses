import React, { useState, useEffect } from 'react';
import { Search, Receipt } from 'lucide-react';

export default function AdminTransactions() {
  const [transactions, setTransactions] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch('http://localhost:4000/api/bookings/all', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => {
        setTransactions(data.data || []);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to fetch transactions');
        setLoading(false);
      });
  }, []);

  const filtered = transactions.filter(t =>
    (t.User?.name?.toLowerCase() || '').includes(search.toLowerCase()) ||
    (t.Property?.name?.toLowerCase() || '').includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4 mb-4">
        <Receipt className="w-7 h-7 text-sky-500" />
        <h2 className="text-2xl font-bold text-sky-700">Transactions</h2>
        <div className="ml-auto flex items-center gap-2">
          <Search className="w-5 h-5 text-sky-400" />
          <input
            type="text"
            placeholder="Search transactions..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="border border-sky-200 rounded-lg px-3 py-1 focus:ring-2 focus:ring-sky-400 outline-none bg-sky-50"
          />
        </div>
      </div>
      {loading ? (
        <div className="text-center py-8 text-sky-500 font-semibold">Loading transactions...</div>
      ) : error ? (
        <div className="text-center py-8 text-red-500 font-semibold">{error}</div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-2xl shadow">
          <table className="min-w-full">
            <thead>
              <tr className="bg-sky-100 text-sky-700">
                <th className="py-3 px-4 text-left">ID</th>
                <th className="py-3 px-4 text-left">User</th>
                <th className="py-3 px-4 text-left">Property</th>
                <th className="py-3 px-4 text-left">Amount</th>
                <th className="py-3 px-4 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((t) => (
                <tr key={t.id} className="even:bg-sky-50 hover:bg-sky-100 transition">
                  <td className="py-2 px-4">{t.id}</td>
                  <td className="py-2 px-4">{t.User?.name || '-'}</td>
                  <td className="py-2 px-4">{t.Property?.name || '-'}</td>
                  <td className="py-2 px-4">NPR {t.amount?.toLocaleString() || '-'}</td>
                  <td className="py-2 px-4">
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${t.status === 'Completed' ? 'bg-green-100 text-green-700' : t.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' : t.status === 'Failed' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'}`}>{t.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
} 