import React, { useState, useEffect } from 'react';
import { Search, Ban, ShieldCheck, Users, Trash2 } from 'lucide-react';

export default function AdminUsers() {
  const [search, setSearch] = useState('');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('/api/users')
      .then(res => res.json())
      .then(data => setUsers(data.data || []));
  }, []);

  const handleBan = async (id) => {
    const res = await fetch(`/api/users/${id}/ban`, { method: 'PUT' });
    if (res.ok) {
      setUsers(users => users.map(u => u.id === id ? { ...u, status: 'Banned' } : u));
    } else {
      alert('Failed to ban user.');
    }
  };
  const handleUnban = async (id) => {
    const res = await fetch(`/api/users/${id}/unban`, { method: 'PUT' });
    if (res.ok) {
      setUsers(users => users.map(u => u.id === id ? { ...u, status: 'Active' } : u));
    } else {
      alert('Failed to unban user.');
    }
  };
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    const res = await fetch(`/api/users/${id}/delete`, { method: 'DELETE' });
    if (res.ok) {
      setUsers(users => users.filter(u => u.id !== id));
    } else {
      alert('Failed to delete user.');
    }
  };

  const searchTerm = search.trim().toLowerCase();
  const filtered = users.filter(u =>
    u.name.toLowerCase().includes(searchTerm) ||
    u.email.toLowerCase().includes(searchTerm) ||
    (u.role || 'user').toLowerCase().includes(searchTerm) ||
    (u.status || '').toLowerCase().includes(searchTerm)
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
                <td className="py-2 px-4">{u.role || 'User'}</td>
                <td className="py-2 px-4">
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${u.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{u.status}</span>
                </td>
                <td className="py-2 px-4 flex gap-2">
                  {u.status === 'Active' ? (
                    <button className="bg-red-400 hover:bg-red-600 text-white px-2 py-1 rounded transition" title="Ban" onClick={() => handleBan(u.id)}><Ban className="w-4 h-4" /></button>
                  ) : (
                    <button className="bg-green-400 hover:bg-green-600 text-white px-2 py-1 rounded transition" title="Unban" onClick={() => handleUnban(u.id)}><ShieldCheck className="w-4 h-4" /></button>
                  )}
                  <button className="bg-red-500 hover:bg-red-700 text-white px-2 py-1 rounded transition" title="Delete" onClick={() => handleDelete(u.id)}><Trash2 className="w-4 h-4" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 