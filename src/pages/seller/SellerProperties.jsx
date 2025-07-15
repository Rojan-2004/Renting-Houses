import React, { useState } from 'react';
import { Plus, Edit2, Building2 } from 'lucide-react';

const mockProperties = [
  { id: 1, name: 'Luxury Villa', type: 'Villa', status: 'Active' },
  { id: 2, name: 'City Apartment', type: 'Apartment', status: 'Inactive' },
  { id: 3, name: 'Family House', type: 'House', status: 'Active' },
];

export default function SellerProperties() {
  const [search, setSearch] = useState('');
  const filtered = mockProperties.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4 mb-4">
        <Building2 className="w-7 h-7 text-sky-500" />
        <h2 className="text-2xl font-bold text-sky-700">My Properties</h2>
        <div className="ml-auto flex items-center gap-2">
          <button className="bg-sky-400 hover:bg-sky-600 text-white px-3 py-2 rounded flex items-center gap-1 font-semibold transition">
            <Plus className="w-4 h-4" /> Add Property
          </button>
        </div>
      </div>
      <div className="overflow-x-auto bg-white rounded-2xl shadow">
        <table className="min-w-full">
          <thead>
            <tr className="bg-sky-100 text-sky-700">
              <th className="py-3 px-4 text-left">ID</th>
              <th className="py-3 px-4 text-left">Name</th>
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
                <td className="py-2 px-4">{p.type}</td>
                <td className="py-2 px-4">
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${p.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{p.status}</span>
                </td>
                <td className="py-2 px-4 flex gap-2">
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