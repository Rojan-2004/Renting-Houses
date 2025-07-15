import React, { useState } from 'react';
import { Receipt } from 'lucide-react';

const mockTransactions = [
  { id: 1, property: 'Luxury Villa', type: 'Rent', amount: 'NPR 50,000', date: '2024-06-01', status: 'Completed' },
  { id: 2, property: 'City Apartment', type: 'Buy', amount: 'NPR 2,000,000', date: '2024-06-02', status: 'Pending' },
  { id: 3, property: 'Family House', type: 'Rent', amount: 'NPR 30,000', date: '2024-06-03', status: 'Failed' },
];

export default function SellerTransactions() {
  const [search, setSearch] = useState('');
  const filtered = mockTransactions.filter(t =>
    t.property.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4 mb-4">
        <Receipt className="w-7 h-7 text-sky-500" />
        <h2 className="text-2xl font-bold text-sky-700">My Transactions</h2>
      </div>
      <div className="overflow-x-auto bg-white rounded-2xl shadow">
        <table className="min-w-full">
          <thead>
            <tr className="bg-sky-100 text-sky-700">
              <th className="py-3 px-4 text-left">ID</th>
              <th className="py-3 px-4 text-left">Property</th>
              <th className="py-3 px-4 text-left">Type</th>
              <th className="py-3 px-4 text-left">Amount</th>
              <th className="py-3 px-4 text-left">Date</th>
              <th className="py-3 px-4 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((t) => (
              <tr key={t.id} className="even:bg-sky-50 hover:bg-sky-100 transition">
                <td className="py-2 px-4">{t.id}</td>
                <td className="py-2 px-4">{t.property}</td>
                <td className="py-2 px-4">{t.type}</td>
                <td className="py-2 px-4">{t.amount}</td>
                <td className="py-2 px-4">{t.date}</td>
                <td className="py-2 px-4">
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${t.status === 'Completed' ? 'bg-green-100 text-green-700' : t.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>{t.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 