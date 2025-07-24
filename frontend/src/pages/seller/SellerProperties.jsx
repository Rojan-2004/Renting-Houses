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
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchProperties = async () => {
      if (!user?.id || !token) {
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`/api/properties?userId=${user.id}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        const data = await res.json();
        if (res.ok && data.data) {
          setProperties(data.data);
        }
      } catch (error) {
        console.error('Error fetching properties:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, [user?.id, token]);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this property?')) return;
    
    try {
      const res = await fetch(`/api/properties/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (res.ok) {
        setProperties(props => props.filter(p => p._id !== id));
        alert('Property deleted successfully!');
      } else {
        alert('Failed to delete property.');
      }
    } catch (error) {
      console.error('Error deleting property:', error);
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
    
    try {
      const res = await fetch(`/api/properties/${editForm._id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(editForm),
      });
      
      if (res.ok) {
        setProperties(props => props.map(p => p._id === editForm._id ? { ...p, ...editForm } : p));
        closeEditModal();
        alert('Property updated successfully!');
      } else {
        alert('Failed to update property.');
      }
    } catch (error) {
      console.error('Error updating property:', error);
      alert('Failed to update property.');
    }
  };

  const filtered = properties.filter(p =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );
  // Property status summary
  const total = properties.length;
  const active = properties.filter(p => p.status === 'active').length;
  const inactive = properties.filter(p => p.status !== 'active').length;

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
  if (loading) {
    return (
      <div className="space-y-8">
        <div className="flex items-center gap-4 mb-4">
          <Building2 className="w-7 h-7 text-sky-500" />
          <h2 className="text-2xl font-bold text-sky-700">My Properties</h2>
        </div>
        <div className="bg-white rounded-2xl shadow p-6">
          <div className="animate-pulse space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex space-x-4">
                <div className="bg-gray-200 h-4 w-12 rounded"></div>
                <div className="bg-gray-200 h-4 w-32 rounded"></div>
                <div className="bg-gray-200 h-4 w-24 rounded"></div>
                <div className="bg-gray-200 h-4 w-16 rounded"></div>
                <div className="bg-gray-200 h-4 w-20 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4 mb-4">
        <Building2 className="w-7 h-7 text-sky-500" />
        <h2 className="text-2xl font-bold text-sky-700">My Properties</h2>
        <div className="ml-auto flex items-center gap-2">
          <input
            type="text"
            placeholder="Search properties..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="border rounded px-3 py-2"
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
        {filtered.length > 0 ? (
          <table className="min-w-full">
            <thead>
              <tr className="bg-sky-100 text-sky-700">
                <th className="py-3 px-4 text-left">ID</th>
                <th className="py-3 px-4 text-left">Name</th>
                <th className="py-3 px-4 text-left">Type</th>
                <th className="py-3 px-4 text-left">Price</th>
                <th className="py-3 px-4 text-left">Status</th>
                <th className="py-3 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr key={p._id} className="even:bg-sky-50 hover:bg-sky-100 transition">
                  <td className="py-2 px-4">{p._id.slice(-6)}</td>
                  <td className="py-2 px-4">{p.title}</td>
                  <td className="py-2 px-4">{p.propertyType}</td>
                  <td className="py-2 px-4">NPR {p.price?.toLocaleString()}</td>
                  <td className="py-2 px-4">
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${p.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{p.status}</span>
                  </td>
                  <td className="py-2 px-4 flex gap-2">
                    <button className="bg-sky-400 hover:bg-sky-600 text-white px-2 py-1 rounded transition" title="Edit" onClick={() => openEditModal(p)}><Edit2 className="w-4 h-4" /></button>
                    <button className="bg-red-400 hover:bg-red-600 text-white px-2 py-1 rounded transition" title="Delete" onClick={() => handleDelete(p._id)}><Trash2 className="w-4 h-4" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="text-center py-12 text-gray-500">
            <Building2 className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <p className="text-lg font-medium">No properties found</p>
            <p className="text-sm">Add your first property to get started</p>
          </div>
        )}
      </div>
      {/* Edit Modal */}
      {editModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto relative">
            <button className="absolute top-4 right-4 text-gray-400 hover:text-rose-500 text-2xl" onClick={closeEditModal}>&times;</button>
            <h2 className="text-xl font-bold mb-4">Edit Property</h2>
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-1">Title</label>
                  <input type="text" name="title" value={editForm.title || ''} onChange={handleEditChange} className="w-full border rounded px-3 py-2" required />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">Property Type</label>
                  <select name="propertyType" value={editForm.propertyType || ''} onChange={handleEditChange} className="w-full border rounded px-3 py-2" required>
                    <option value="">Select Type</option>
                    <option value="apartment">Apartment</option>
                    <option value="house">House</option>
                    <option value="villa">Villa</option>
                    <option value="studio">Studio</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">Price (NPR)</label>
                  <input type="number" name="price" value={editForm.price || ''} onChange={handleEditChange} className="w-full border rounded px-3 py-2" required />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">Status</label>
                  <select name="status" value={editForm.status || ''} onChange={handleEditChange} className="w-full border rounded px-3 py-2" required>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">Bedrooms</label>
                  <input type="number" name="bedrooms" value={editForm.bedrooms || ''} onChange={handleEditChange} className="w-full border rounded px-3 py-2" required min="1" />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">Bathrooms</label>
                  <input type="number" name="bathrooms" value={editForm.bathrooms || ''} onChange={handleEditChange} className="w-full border rounded px-3 py-2" required min="1" />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">Square Feet</label>
                  <input type="number" name="sqft" value={editForm.sqft || ''} onChange={handleEditChange} className="w-full border rounded px-3 py-2" required />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">Available</label>
                  <select name="isAvailable" value={editForm.isAvailable || true} onChange={handleEditChange} className="w-full border rounded px-3 py-2">
                    <option value={true}>Yes</option>
                    <option value={false}>No</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Description</label>
                <textarea name="description" value={editForm.description || ''} onChange={handleEditChange} className="w-full border rounded px-3 py-2" rows={3} required />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-1">Address</label>
                  <input type="text" name="location.address" value={editForm.location?.address || ''} onChange={(e) => setEditForm({...editForm, location: {...editForm.location, address: e.target.value}})} className="w-full border rounded px-3 py-2" required />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">City</label>
                  <input type="text" name="location.city" value={editForm.location?.city || ''} onChange={(e) => setEditForm({...editForm, location: {...editForm.location, city: e.target.value}})} className="w-full border rounded px-3 py-2" required />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">State</label>
                  <input type="text" name="location.state" value={editForm.location?.state || ''} onChange={(e) => setEditForm({...editForm, location: {...editForm.location, state: e.target.value}})} className="w-full border rounded px-3 py-2" required />
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <button type="button" className="px-4 py-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 font-semibold" onClick={closeEditModal}>Cancel</button>
                <button type="submit" className="px-6 py-2 rounded-lg bg-sky-500 text-white font-semibold shadow hover:bg-sky-600 transition">Update Property</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}