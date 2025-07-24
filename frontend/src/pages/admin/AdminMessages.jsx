import React from 'react';
import { MessageCircle, Mail, AlertCircle } from 'lucide-react';

export default function AdminMessages() {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4 mb-4">
        <MessageCircle className="w-7 h-7 text-sky-500" />
        <h2 className="text-2xl font-bold text-sky-700">Support Messages</h2>
      </div>
      
      <div className="bg-white rounded-2xl shadow p-8">
        <div className="text-center">
          <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-10 h-10 text-yellow-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Messages System Not Implemented
          </h3>
          <p className="text-gray-600 mb-6">
            The support messages system is not yet implemented in the backend. 
            This feature would require additional API endpoints for managing user messages and support tickets.
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-left">
            <h4 className="font-semibold text-blue-800 mb-2">To implement this feature, you would need:</h4>
            <ul className="text-blue-700 space-y-1 text-sm">
              <li>• Message/Ticket model in the backend</li>
              <li>• API endpoints for CRUD operations on messages</li>
              <li>• Real-time messaging functionality (optional)</li>
              <li>• Email notification system</li>
              <li>• Message status management</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}