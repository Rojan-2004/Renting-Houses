import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Building2 } from 'lucide-react';
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
Chart.register(ArcElement, Tooltip, Legend);

export default function SellerProperties() {
  const [search, setSearch] = useState('');
  const [properties, setProperties] = useState([]);
  const [editModal, setEditModal] = useState(false);
  const [editForm, setEditForm] = useState({});
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const fetchProperties = async () => {
      if (!user?.id) return;
      const res = await fetch(`/api/properties?userId=${user.id}`);
      const data = await res.json();
      if (res.ok && data.data) {
        setProperties(data.data);
      }
    };
    fetchProperties();
  }, [user]);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this property?')) return;
    const res = await fetch(`/api/properties/${id}`, { method: 'DELETE' });
    if (res.ok) {
      setProperties(props => props.filter(p => p.id !== id));
    } else {
      alert('Failed to delete property.');
    }
  };

  const openEditModal = (property) => {
    setEditForm(property);
    setEditModal(true);
  };
  const closeEditModal = () => setEditModal(false);
  const handleEditChange = e => setEditForm({ ...editForm, [e.target.name]: e.target.value });
  const handleEditSubmit = async e => {
    e.preventDefault();
    const res = await fetch(`/api/properties/${editForm.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editForm),
    });
    if (res.ok) {
      setProperties(props => props.map(p => p.id === editForm.id ? { ...p, ...editForm } : p));
      closeEditModal();
    } else {
      alert('Failed to update property.');
    }
  };

  const filtered = properties.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );
  // Property status summary
  const total = properties.length;
  const active = properties.filter(p => p.status === 'Active').length;
  const inactive = properties.filter(p => p.status !== 'Active').length;

  // Pie chart data
  const pieData = {
    labels: ['Active', 'Inactive'],
    datasets: [
      {
        data: [active, inactive],
        backgroundColor: ['#22c55e', '#facc15'],
        borderColor: ['#16a34a', '#ca8a04'],
        borderWidth: 1,
      },
    ],
  };
  const pieOptions = {
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4 mb-4">
        <Building2 className="w-7 h-7 text-sky-500" />
        <h2 className="text-2xl font-bold text-sky-700">My Properties</h2>
        <div className="ml-auto flex items-center gap-2">
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="border rounded px-2 py-1"
          />
        </div>
      </div>
      {/* Pie Chart for property status */}
      <div className="w-full max-w-xs mx-auto" style={{ height: 220 }}>
        <Pie data={pieData} options={pieOptions} />
      </div>
      {/* Live stats summary */}
      <div className="flex gap-6 mb-2 text-sm">
        <span className="font-semibold">Total: <span className="text-blue-700">{total}</span></span>
        <span className="font-semibold">Active: <span className="text-green-700">{active}</span></span>
        <span className="font-semibold">Inactive: <span className="text-yellow-700">{inactive}</span></span>
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
                  <button className="bg-sky-400 hover:bg-sky-600 text-white px-2 py-1 rounded transition" title="Edit" onClick={() => openEditModal(p)}><Edit2 className="w-4 h-4" /></button>
                  <button className="bg-red-400 hover:bg-red-600 text-white px-2 py-1 rounded transition" title="Delete" onClick={() => handleDelete(p.id)}><Trash2 className="w-4 h-4" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Edit Modal */}
      {editModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md relative">
            <button className="absolute top-4 right-4 text-gray-400 hover:text-rose-500" onClick={closeEditModal}>&times;</button>
            <h2 className="text-xl font-bold mb-4">Edit Property</h2>
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-1">Name</label>
                <input type="text" name="name" value={editForm.name} onChange={handleEditChange} className="w-full border rounded px-3 py-2" required />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Type</label>
                <input type="text" name="type" value={editForm.type} onChange={handleEditChange} className="w-full border rounded px-3 py-2" required />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Status</label>
                <input type="text" name="status" value={editForm.status} onChange={handleEditChange} className="w-full border rounded px-3 py-2" required />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Price</label>
                <input type="number" name="price" value={editForm.price} onChange={handleEditChange} className="w-full border rounded px-3 py-2" required />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Description</label>
                <textarea name="description" value={editForm.description} onChange={handleEditChange} className="w-full border rounded px-3 py-2" rows={3} />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" className="px-4 py-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 font-semibold" onClick={closeEditModal}>Cancel</button>
                <button type="submit" className="px-6 py-2 rounded-lg bg-sky-500 text-white font-semibold shadow hover:bg-sky-600 transition">Update</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
} 