import React, { useState } from 'react';
import { Search, CheckCircle, XCircle, Edit2, Home } from 'lucide-react';

const mockProperties = [
  { id: 1, name: 'Luxury Villa', owner: 'Allena', type: 'Villa', status: 'Pending' },
  { id: 2, name: 'City Apartment', owner: 'Prakriti', type: 'Apartment', status: 'Approved' },
  { id: 3, name: 'Family House', owner: 'Ramesh', type: 'House', status: 'Rejected' },
];

export default function AdminProperties() {
  const [search, setSearch] = useState('');
  const filtered = mockProperties.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.owner.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4 mb-4">
        <Home className="w-7 h-7 text-sky-500" />
        <h2 className="text-2xl font-bold text-sky-700">Manage Properties</h2>
        <div className="ml-auto flex items-center gap-2">
          <Search className="w-5 h-5 text-sky-400" />
          <input
            type="text"
            placeholder="Search properties..."
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
              <th className="py-3 px-4 text-left">Owner</th>
              <th className="py-3 px-4 text-left">Type</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p) => (
              <tr key={p.id} className="even:bg-sky-50 hover:bg-sky-100 transition">
                <td className="py-2 px-4">{p.id}</td>
                <td className="py-2 px-4">{p.name}</td>
                <td className="py-2 px-4">{p.owner}</td>
                <td className="py-2 px-4">{p.type}</td>
                <td className="py-2 px-4">
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${p.status === 'Approved' ? 'bg-green-100 text-green-700' : p.status === 'Rejected' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>{p.status}</span>
                </td>
                <td className="py-2 px-4 flex gap-2">
                  <button className="bg-green-400 hover:bg-green-600 text-white px-2 py-1 rounded transition" title="Approve"><CheckCircle className="w-4 h-4" /></button>
                  <button className="bg-red-400 hover:bg-red-600 text-white px-2 py-1 rounded transition" title="Reject"><XCircle className="w-4 h-4" /></button>
                  <button className="bg-sky-400 hover:bg-sky-600 text-white px-2 py-1 rounded transition" title="Edit"><Edit2 className="w-4 h-4" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 