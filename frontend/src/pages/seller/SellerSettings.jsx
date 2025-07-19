import React, { useState, useEffect } from 'react';
import { Settings, Bell, User, Save } from 'lucide-react';

export default function SellerSettings() {
  const [userSettings, setUserSettings] = useState({
    name: '',
    email: '',
    notifications: true,
    phone: '',
    address: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const user = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchUserSettings = async () => {
      if (!user?.id || !token) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch('http://localhost:5000/api/users/profile', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          const data = await response.json();
          if (data.success) {
            setUserSettings({
              name: data.user.name || user.name || '',
              email: data.user.email || user.email || '',
              notifications: true,
              phone: data.user.phone || '',
              address: data.user.address || ''
            });
          }
        } else {
          // Fallback to user data from localStorage
          setUserSettings({
            name: user.name || '',
            email: user.email || '',
            notifications: true,
            phone: '',
            address: ''
          });
        }
      } catch (error) {
        console.error('Error fetching user settings:', error);
        // Fallback to user data from localStorage
        setUserSettings({
          name: user.name || '',
          email: user.email || '',
          notifications: true,
          phone: '',
          address: ''
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUserSettings();
  }, [user?.id, token]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUserSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSaveSettings = async () => {
    if (!user?.id || !token) return;

    setSaving(true);
    try {
      const response = await fetch('http://localhost:5000/api/users/profile', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: userSettings.name,
          phone: userSettings.phone,
          address: userSettings.address
        })
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          // Update localStorage user data
          const updatedUser = { ...user, name: userSettings.name };
          localStorage.setItem('user', JSON.stringify(updatedUser));
          alert('Settings saved successfully!');
        } else {
          console.error('Save failed:', data);
          alert(data.message || 'Failed to save settings. Please try again.');
        }
      } else {
        const errorData = await response.json().catch(() => ({}));
        console.error('HTTP Error:', response.status, errorData);
        alert(errorData.message || 'Failed to save settings. Please try again.');
      }
    } catch (error) {
      console.error('Error saving settings:', error);
      alert('Failed to save settings. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-8 max-w-2xl mx-auto">
        <div className="flex items-center gap-4 mb-4">
          <Settings className="w-7 h-7 text-sky-500" />
          <h2 className="text-2xl font-bold text-sky-700">Seller Settings</h2>
        </div>
        <div className="bg-white rounded-2xl shadow p-6">
          <div className="animate-pulse space-y-4">
            <div className="flex items-center gap-4">
              <div className="bg-gray-200 w-10 h-10 rounded-full"></div>
              <div className="space-y-2">
                <div className="bg-gray-200 h-4 w-32 rounded"></div>
                <div className="bg-gray-200 h-3 w-48 rounded"></div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="bg-gray-200 h-10 w-full rounded"></div>
              <div className="bg-gray-200 h-10 w-full rounded"></div>
              <div className="bg-gray-200 h-10 w-full rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-2xl mx-auto">
      <div className="flex items-center gap-4 mb-4">
        <Settings className="w-7 h-7 text-sky-500" />
        <h2 className="text-2xl font-bold text-sky-700">Seller Settings</h2>
      </div>
      <div className="bg-white rounded-2xl shadow p-6 space-y-6">
        <div className="flex items-center gap-4">
          <User className="w-10 h-10 text-sky-400" />
          <div>
            <div className="font-bold text-lg text-sky-700">{userSettings.name || 'Seller'}</div>
            <div className="text-gray-500 text-sm">{userSettings.email}</div>
          </div>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              value={userSettings.name}
              onChange={handleInputChange}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
              placeholder="Enter your full name"
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={userSettings.email}
              onChange={handleInputChange}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
              placeholder="Enter your email"
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={userSettings.phone}
              onChange={handleInputChange}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
              placeholder="Enter your phone number"
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Address</label>
            <textarea
              name="address"
              value={userSettings.address}
              onChange={handleInputChange}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
              placeholder="Enter your address"
              rows={3}
            />
          </div>
          
          <div>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="notifications"
                checked={userSettings.notifications}
                onChange={handleInputChange}
                className="accent-sky-500"
              />
              <span className="text-sm font-semibold text-gray-700">Enable Notifications</span>
              <Bell className="w-5 h-5 text-sky-400" />
            </label>
          </div>
        </div>
        
        <button
          onClick={handleSaveSettings}
          disabled={saving}
          className="w-full bg-gradient-to-r from-sky-400 to-sky-600 text-white px-6 py-3 rounded-xl font-semibold shadow hover:from-sky-500 hover:to-sky-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          <Save className="w-5 h-5" />
          {saving ? 'Saving...' : 'Save Settings'}
        </button>
      </div>
    </div>
  );
}