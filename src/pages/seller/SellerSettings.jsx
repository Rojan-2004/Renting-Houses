import React from 'react';
import { Settings, Bell, User } from 'lucide-react';

export default function SellerSettings() {
  return (
    <div className="space-y-8 max-w-2xl mx-auto">
      <div className="flex items-center gap-4 mb-4">
        <Settings className="w-7 h-7 text-sky-500" />
        <h2 className="text-2xl font-bold text-sky-700">Seller Settings</h2>
      </div>
      <div className="bg-white rounded-2xl shadow p-6 flex flex-col gap-6">
        <div className="flex items-center gap-4">
          <User className="w-10 h-10 text-sky-400" />
          <div>
            <div className="font-bold text-lg text-sky-700">Seller</div>
            <div className="text-gray-500 text-sm">seller@rentalbuddy.com</div>
          </div>
        </div>
        <div>
          <label className="flex items-center gap-2 mb-2">
            <input type="checkbox" className="accent-sky-500" defaultChecked /> Enable Notifications
            <Bell className="w-5 h-5 text-sky-400" />
          </label>
        </div>
        <button className="bg-gradient-to-r from-sky-400 to-sky-600 text-white px-6 py-2 rounded-xl font-semibold shadow hover:from-sky-500 hover:to-sky-700 transition">Save Settings</button>
      </div>
    </div>
  );
} 