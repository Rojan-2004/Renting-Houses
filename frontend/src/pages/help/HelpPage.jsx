import React from 'react';

export default function HelpPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-100 via-white to-purple-100">
      <div className="max-w-3xl mx-auto py-20 px-4">
        <h1 className="text-4xl font-extrabold text-blue-700 mb-6 drop-shadow">Help & FAQs</h1>
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-bold text-blue-600 mb-2">How do I create an account?</h2>
            <p className="text-gray-700">Click on the Sign Up button and fill in your details. You will receive a confirmation email after registration.</p>
          </div>
          <div>
            <h2 className="text-xl font-bold text-blue-600 mb-2">How do I book a property?</h2>
            <p className="text-gray-700">Browse available properties, click on your preferred one, and use the Book Now button to start the booking process.</p>
          </div>
          <div>
            <h2 className="text-xl font-bold text-blue-600 mb-2">Who do I contact for support?</h2>
            <p className="text-gray-700">You can use the Contact Us page to send us a message, or email us at rentalbuddy@gmail.com.</p>
          </div>
        </div>
      </div>
    </div>
  );
} 