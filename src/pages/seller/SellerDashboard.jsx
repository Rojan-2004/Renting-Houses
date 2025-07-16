import React, { useState } from 'react';
import { NavLink, Routes, Route, Navigate } from 'react-router-dom';
import { Home, Building2, Receipt, MessageCircle, Settings, LogOut, Plus, Bell, X } from 'lucide-react';
import SellerDashboardHome from './SellerDashboardHome';
import SellerProperties from './SellerProperties';
import SellerTransactions from './SellerTransactions';
import SellerMessages from './SellerMessages';
import SellerSettings from './SellerSettings';

const navLinks = [
  { to: '/seller/dashboard', label: 'Dashboard', icon: <Home className="w-6 h-6" /> },
  { to: '/seller/properties', label: 'My Properties', icon: <Building2 className="w-6 h-6" /> },
  { to: '/seller/transactions', label: 'Transactions', icon: <Receipt className="w-6 h-6" /> },
  { to: '/seller/messages', label: 'Messages', icon: <MessageCircle className="w-6 h-6" /> },
  { to: '/seller/settings', label: 'Settings', icon: <Settings className="w-6 h-6" /> },
  { to: '/seller/logout', label: 'Logout', icon: <LogOut className="w-6 h-6" /> },
];

const initialForm = { name: '', type: '', price: '', status: 'Active', description: '' };

const SellerDashboard = () => {
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [image, setImage] = useState(null);

  const handleOpenModal = () => {
    setForm(initialForm);
    setImage(null);
    setShowModal(true);
  };
  const handleCloseModal = () => setShowModal(false);
  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleImageChange = e => setImage(e.target.files[0]);
  const handleSubmit = async e => {
    e.preventDefault();
    let imageFilename = null;
    if (image) {
      const formData = new FormData();
      formData.append('file', image);
      try {
        const res = await fetch('/api/file/upload', {
          method: 'POST',
          body: formData,
        });
        const data = await res.json();
        imageFilename = data.filename || data.file || data.url || null;
      } catch (err) {
        alert('Image upload failed');
        return;
      }
    }
    // Add image filename and userId to property data
    const user = JSON.parse(localStorage.getItem('user'));
    const propertyData = { ...form, image: imageFilename, userId: user?.id };
    try {
      const res = await fetch('/api/properties', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(propertyData),
      });
      if (res.ok) {
        alert('Property added successfully!');
      } else {
        alert('Failed to add property.');
      }
    } catch (err) {
      alert('Failed to add property.');
    }
    setShowModal(false);
  };

  return (
    <div className="min-h-screen w-full flex bg-gradient-to-br from-emerald-50 via-white to-teal-50 relative overflow-hidden font-sans">
      {/* Animated background shapes */}
      <svg className="absolute top-0 left-0 w-96 h-96 opacity-30 -z-10 animate-pulse" style={{ filter: 'blur(60px)' }}>
        <circle cx="200" cy="200" r="200" fill="#34d399" />
      </svg>
      <svg className="absolute bottom-0 right-0 w-96 h-96 opacity-20 -z-10 animate-pulse delay-1000" style={{ filter: 'blur(60px)' }}>
        <circle cx="200" cy="200" r="200" fill="#06b6d4" />
      </svg>
      {/* Sidebar (sticky, scrolls with page) */}
      <aside className="sticky top-8 self-start flex flex-col items-center gap-6 bg-white/60 backdrop-blur-xl shadow-2xl rounded-3xl py-6 px-3 z-30 border border-emerald-100 min-h-[80vh]">
        <img src="/images/Logo.png" alt="Logo" className="w-12 mb-2 rounded-full border-2 border-emerald-200 shadow" />
        <nav className="flex flex-col gap-4 mt-2">
          {navLinks.slice(0, -1).map(link => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                'group flex items-center justify-center w-12 h-12 rounded-full transition-all duration-200 ' +
                (isActive
                  ? 'bg-gradient-to-br from-emerald-400 to-teal-400 shadow-lg scale-110'
                  : 'hover:bg-emerald-100/70 text-emerald-600')
              }
              title={link.label}
            >
              {link.icon}
              <span className="sr-only">{link.label}</span>
            </NavLink>
          ))}
        </nav>
        <div className="flex-1 flex flex-col justify-end mt-8">
          <img src="/images/User.png" alt="User" className="w-12 rounded-full border-2 border-emerald-200 mb-2" />
          <NavLink
            to="/seller/logout"
            className={({ isActive }) =>
              'flex items-center justify-center w-12 h-12 rounded-full transition-all duration-200 mt-2 ' +
              (isActive
                ? 'bg-gradient-to-br from-red-400 to-rose-400 text-white shadow-lg scale-110'
                : 'hover:bg-red-100/70 text-red-500')
            }
            title="Logout"
          >
            <LogOut className="w-6 h-6" />
            <span className="sr-only">Logout</span>
          </NavLink>
        </div>
      </aside>
      {/* Main Content (scrollable) */}
      <div className="flex-1 flex flex-col min-h-screen w-full overflow-y-auto">
        {/* Floating Header (sticky in main content) */}
        <header className="sticky top-0 left-0 w-full bg-white/80 backdrop-blur-xl shadow-xl rounded-2xl px-8 py-4 flex items-center justify-between z-20 border border-emerald-100 mt-8">
          <div className="flex items-center gap-4">
            <span className="text-2xl font-extrabold text-emerald-600 tracking-tight">Seller Panel</span>
            <span className="text-gray-400 font-medium hidden sm:inline">|</span>
            <span className="text-emerald-700 font-semibold hidden sm:inline">Welcome, Seller</span>
          </div>
          <div className="flex items-center gap-4">
            <button
              className="bg-gradient-to-r from-emerald-400 to-teal-400 text-white px-4 py-2 rounded-full font-semibold shadow hover:from-emerald-500 hover:to-teal-500 transition flex items-center gap-2"
              onClick={handleOpenModal}
            >
              <Plus className="w-5 h-5" /> Add Property
            </button>
            <button className="relative group">
              <Bell className="w-6 h-6 text-emerald-500" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-rose-400 rounded-full border-2 border-white animate-pulse" />
              <span className="sr-only">Notifications</span>
            </button>
          </div>
        </header>
        {/* Add Property Modal */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-lg relative animate-fadeIn">
              <button
                className="absolute top-4 right-4 text-gray-400 hover:text-rose-500"
                onClick={handleCloseModal}
                aria-label="Close"
              >
                <X className="w-6 h-6" />
              </button>
              <h2 className="text-2xl font-bold text-emerald-600 mb-6">Add New Property</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-1">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className="w-full border border-emerald-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-400 outline-none bg-emerald-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">Type</label>
                  <select
                    name="type"
                    value={form.type}
                    onChange={handleChange}
                    required
                    className="w-full border border-emerald-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-400 outline-none bg-emerald-50"
                  >
                    <option value="">Select type</option>
                    <option value="Apartment">Apartment</option>
                    <option value="House">House</option>
                    <option value="Villa">Villa</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">Price</label>
                  <input
                    type="number"
                    name="price"
                    value={form.price}
                    onChange={handleChange}
                    required
                    className="w-full border border-emerald-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-400 outline-none bg-emerald-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">Status</label>
                  <select
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                    className="w-full border border-emerald-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-400 outline-none bg-emerald-50"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">Description</label>
                  <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    rows={3}
                    className="w-full border border-emerald-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-400 outline-none bg-emerald-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">Property Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full border border-emerald-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-400 outline-none bg-emerald-50"
                  />
                </div>
                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    className="px-4 py-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 font-semibold"
                    onClick={handleCloseModal}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 rounded-lg bg-gradient-to-r from-emerald-400 to-teal-400 text-white font-semibold shadow hover:from-emerald-500 hover:to-teal-500 transition"
                  >
                    Add Property
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
        {/* Routed Content (scrollable) */}
        <main className="flex-1 p-4 md:p-8">
          <Routes>
            <Route path="/dashboard" element={<SellerDashboardHome />} />
            <Route path="/properties" element={<SellerProperties />} />
            <Route path="/transactions" element={<SellerTransactions />} />
            <Route path="/messages" element={<SellerMessages />} />
            <Route path="/settings" element={<SellerSettings />} />
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="*" element={<SellerDashboardHome />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default SellerDashboard; 