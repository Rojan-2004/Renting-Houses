import React, { useState } from 'react';
import { Search, Ban, ShieldCheck, Users } from 'lucide-react';

const mockUsers = [
  { id: 1, name: 'Allena', email: 'allena@email.com', role: 'Landlord', status: 'Active' },
  { id: 2, name: 'Prakriti', email: 'prakriti@email.com', role: 'Renter', status: 'Banned' },
  { id: 3, name: 'Ramesh', email: 'ramesh@email.com', role: 'Renter', status: 'Active' },
];

export default function AdminUsers() {
  const [search, setSearch] = useState('');
  const filtered = mockUsers.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4 mb-4">
        <Users className="w-7 h-7 text-sky-500" />
        <h2 className="text-2xl font-bold text-sky-700">Manage Users</h2>
        <div className="ml-auto flex items-center gap-2">
          <Search className="w-5 h-5 text-sky-400" />
          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="border border-sky-200 rounded-lg px-3 py-1 focus:ring-2 focus:ring-sky-400 outline-none bg-sky-50"
          />
        </div>
      </div>
      <div className="overflow-x-auto bg-white rounded-2xl shadow">
        <table className="min-w-full">
          <thead>
            <tr className="bg-sky-100 text-sky-700">
              <th className="py-3 px-4 text-left">ID</th>
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Email</th>
              <th className="py-3 px-4 text-left">Role</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((u) => (
              <tr key={u.id} className="even:bg-sky-50 hover:bg-sky-100 transition">
                <td className="py-2 px-4">{u.id}</td>
                <td className="py-2 px-4">{u.name}</td>
                <td className="py-2 px-4">{u.email}</td>
                <td className="py-2 px-4">{u.role}</td>
                <td className="py-2 px-4">
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${u.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{u.status}</span>
                </td>
                <td className="py-2 px-4 flex gap-2">
                  {u.status === 'Active' ? (
                    <button className="bg-red-400 hover:bg-red-600 text-white px-2 py-1 rounded transition" title="Ban"><Ban className="w-4 h-4" /></button>
                  ) : (
                    <button className="bg-green-400 hover:bg-green-600 text-white px-2 py-1 rounded transition" title="Unban"><ShieldCheck className="w-4 h-4" /></button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 