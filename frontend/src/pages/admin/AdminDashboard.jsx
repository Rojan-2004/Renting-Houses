import React from 'react';
import { NavLink, Routes, Route, useNavigate } from 'react-router-dom';
import { Home, Building2, Users, Receipt, User, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import AdminDashboardHome from './AdminDashboardHome';
import AdminProperties from './AdminProperties';
import AdminUsers from './AdminUsers';
import AdminTransactions from './AdminTransactions';
import AdminProfile from './AdminProfile';

const navLinks = [
  { to: '/admin/dashboard', label: 'Dashboard', icon: <Home className="w-5 h-5 mr-2" /> },
  { to: '/admin/properties', label: 'Properties', icon: <Building2 className="w-5 h-5 mr-2" /> },
  { to: '/admin/users', label: 'Users', icon: <Users className="w-5 h-5 mr-2" /> },
  { to: '/admin/transactions', label: 'Transactions', icon: <Receipt className="w-5 h-5 mr-2" /> },
  { to: '/admin/profile', label: 'Profile', icon: <User className="w-5 h-5 mr-2" /> },
];

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user: currentUser, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-sky-100 via-white to-sky-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-sky-100 shadow-lg flex flex-col items-center py-8 px-4 rounded-r-3xl sticky top-0 h-screen z-20">
        <img src="/images/Logo.png" alt="Logo" className="w-24 mb-4 rounded-full border-2 border-sky-200 shadow" />
        <img src="/images/User.png" alt="User" className="w-16 rounded-full border-2 border-sky-200 mb-2" />
        <p className="text-sky-700 font-semibold mb-6 text-center">Welcome Back!<br /><span className="font-bold text-lg">{currentUser?.name || 'Admin'}</span></p>
        <nav className="flex flex-col gap-2 w-full">
          {navLinks.map(link => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                isActive
                  ? 'bg-sky-400 text-white font-bold shadow px-4 py-2 rounded-xl flex items-center transition'
                  : 'text-sky-700 hover:bg-sky-100 px-4 py-2 rounded-xl flex items-center transition'
              }
            >
              {link.icon}
              {link.label}
            </NavLink>
          ))}
          <button
            onClick={handleLogout}
            className="text-sky-700 hover:bg-red-100 hover:text-red-600 px-4 py-2 rounded-xl flex items-center transition mt-4"
          >
            <LogOut className="w-5 h-5 mr-2" />
            Logout
          </button>
        </nav>
      </aside>
      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Sticky Header */}
        <header className="w-full bg-white shadow-md py-4 px-8 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <img src="/images/Logo.png" alt="Logo" className="h-10 w-10 rounded-full border-2 border-sky-200" />
            <span className="text-2xl font-bold text-sky-700 tracking-tight">Rental Buddy Admin</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sky-700 font-semibold">{currentUser?.email || 'admin@rentalbuddy.com'}</span>
            <img src="/images/User.png" alt="User" className="h-10 w-10 rounded-full border-2 border-sky-200" />
          </div>
        </header>
        {/* Routed Content */}
        <main className="flex-1 p-8 md:p-12">
          <Routes>
            <Route path="/dashboard" element={<AdminDashboardHome />} />
            <Route path="/properties" element={<AdminProperties />} />
            <Route path="/users" element={<AdminUsers />} />
            <Route path="/transactions" element={<AdminTransactions />} />
            <Route path="/profile" element={<AdminProfile />} />
            <Route path="*" element={<AdminDashboardHome />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
