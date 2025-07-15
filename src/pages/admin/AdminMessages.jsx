import React from 'react';
import { MessageCircle, Mail, CheckCircle, XCircle } from 'lucide-react';

const mockMessages = [
  { id: 1, user: 'Allena', subject: 'Payment issue', status: 'Open' },
  { id: 2, user: 'Prakriti', subject: 'Property approval', status: 'Closed' },
  { id: 3, user: 'Ramesh', subject: 'Account ban', status: 'Open' },
];

export default function AdminMessages() {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4 mb-4">
        <MessageCircle className="w-7 h-7 text-sky-500" />
        <h2 className="text-2xl font-bold text-sky-700">Support Messages</h2>
      </div>
      <div className="overflow-x-auto bg-white rounded-2xl shadow">
        <table className="min-w-full">
          <thead>
            <tr className="bg-sky-100 text-sky-700">
              <th className="py-3 px-4 text-left">ID</th>
              <th className="py-3 px-4 text-left">User</th>
              <th className="py-3 px-4 text-left">Subject</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {mockMessages.map((m) => (
              <tr key={m.id} className="even:bg-sky-50 hover:bg-sky-100 transition">
                <td className="py-2 px-4">{m.id}</td>
                <td className="py-2 px-4">{m.user}</td>
                <td className="py-2 px-4">{m.subject}</td>
                <td className="py-2 px-4">
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${m.status === 'Open' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}`}>{m.status}</span>
                </td>
                <td className="py-2 px-4 flex gap-2">
                  <button className="bg-green-400 hover:bg-green-600 text-white px-2 py-1 rounded transition" title="Mark as Closed"><CheckCircle className="w-4 h-4" /></button>
                  <button className="bg-red-400 hover:bg-red-600 text-white px-2 py-1 rounded transition" title="Delete"><XCircle className="w-4 h-4" /></button>
                  <button className="bg-sky-400 hover:bg-sky-600 text-white px-2 py-1 rounded transition" title="Reply"><Mail className="w-4 h-4" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 