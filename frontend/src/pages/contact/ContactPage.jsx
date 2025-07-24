import React, { useState } from 'react';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-100 via-white to-purple-100">
      <div className="max-w-2xl mx-auto py-20 px-4">
        <h1 className="text-4xl font-extrabold text-blue-700 mb-6 drop-shadow">Contact Us</h1>
        <p className="text-lg text-gray-700 mb-8">Have questions or need help? Fill out the form below and our team will get back to you soon.</p>
        {submitted ? (
          <div className="bg-green-100 text-green-700 p-6 rounded-xl shadow text-center font-semibold">Thank you for contacting us! We'll be in touch soon.</div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6 bg-white/80 backdrop-blur-2xl rounded-2xl shadow-xl p-8 border border-blue-100">
            <div>
              <label className="block font-semibold mb-1 text-blue-700">Name</label>
              <input type="text" name="name" value={form.name} onChange={handleChange} required className="w-full px-4 py-3 rounded-xl border border-blue-200 bg-blue-50 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none" />
            </div>
            <div>
              <label className="block font-semibold mb-1 text-blue-700">Email</label>
              <input type="email" name="email" value={form.email} onChange={handleChange} required className="w-full px-4 py-3 rounded-xl border border-blue-200 bg-blue-50 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none" />
            </div>
            <div>
              <label className="block font-semibold mb-1 text-blue-700">Message</label>
              <textarea name="message" value={form.message} onChange={handleChange} required rows={5} className="w-full px-4 py-3 rounded-xl border border-blue-200 bg-blue-50 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none resize-none" />
            </div>
            <button type="submit" className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold shadow-lg hover:from-blue-700 hover:to-purple-700 transition text-lg mt-2">Send Message</button>
          </form>
        )}
      </div>
    </div>
  );
} 