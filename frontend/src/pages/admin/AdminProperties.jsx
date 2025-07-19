import React, { useState, useEffect } from 'react';
import { Search, CheckCircle, XCircle, Edit2, Home, Trash2, ChevronLeft, ChevronRight, Filter } from 'lucide-react';

export default function AdminProperties() {
  const [search, setSearch] = useState('');
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [statusFilter, setStatusFilter] = useState('all');
  const [total, setTotal] = useState(0);

  const fetchProperties = async (page = 1, status = 'all', searchTerm = '') => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '10',
        ...(status !== 'all' && { status }),
        ...(searchTerm && { search: searchTerm })
      });

      const response = await fetch(`http://localhost:4000/api/admin/properties?${params}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch properties');
      }

      const data = await response.json();
      setProperties(data.properties || []);
      setTotalPages(data.totalPages || 1);
      setCurrentPage(data.currentPage || 1);
      setTotal(data.total || 0);
    } catch (err) {
      setError(err.message);
      console.error('Properties fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties(currentPage, statusFilter, search);
  }, [currentPage, statusFilter]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (currentPage === 1) {
        fetchProperties(1, statusFilter, search);
      } else {
        setCurrentPage(1);
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [search]);

  const handleStatusUpdate = async (propertyId, newStatus) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:4000/api/admin/properties/${propertyId}/status`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: newStatus })
      });

      if (!response.ok) {
        throw new Error('Failed to update property status');
      }

      await fetchProperties(currentPage, statusFilter, search);
    } catch (err) {
      alert(`Failed to update property status: ${err.message}`);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this property?')) return;
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:4000/api/properties/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        await fetchProperties(currentPage, statusFilter, search);
      } else {
        throw new Error('Failed to delete property');
      }
    } catch (err) {
      alert(`Failed to delete property: ${err.message}`);
    }
  };

  if (loading) {
    return (
      <div className="space-y-8">
        <div className="flex items-center gap-4 mb-4">
          <Home className="w-7 h-7 text-sky-500" />
          <h2 className="text-2xl font-bold text-sky-700">Manage Properties</h2>
        </div>
        <div className="bg-white rounded-2xl shadow p-8">
          <div className="animate-pulse space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-12 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-8">
        <div className="flex items-center gap-4 mb-4">
          <Home className="w-7 h-7 text-sky-500" />
          <h2 className="text-2xl font-bold text-sky-700">Manage Properties</h2>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-600">Error loading properties: {error}</p>
          <button 
            onClick={() => fetchProperties(currentPage, statusFilter, search)}
            className="mt-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <Home className="w-7 h-7 text-sky-500" />
          <h2 className="text-2xl font-bold text-sky-700">Manage Properties</h2>
          <span className="text-sm text-gray-500">({total} total)</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-sky-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-sky-200 rounded-lg px-3 py-1 focus:ring-2 focus:ring-sky-400 outline-none bg-sky-50"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <Search className="w-5 h-5 text-sky-400" />
            <input
              type="text"
              placeholder="Search properties..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="border border-sky-200 rounded-lg px-3 py-1 focus:ring-2 focus:ring-sky-400 outline-none bg-sky-50"
            />
          </div>
        </div>
      </div>
      
      <div className="overflow-x-auto bg-white rounded-2xl shadow">
        <table className="min-w-full">
          <thead>
            <tr className="bg-sky-100 text-sky-700">
              <th className="py-3 px-4 text-left">Title</th>
              <th className="py-3 px-4 text-left">Owner</th>
              <th className="py-3 px-4 text-left">Type</th>
              <th className="py-3 px-4 text-left">Location</th>
              <th className="py-3 px-4 text-left">Price</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {properties.length > 0 ? (
              properties.map((property) => (
                <tr key={property._id} className="even:bg-sky-50 hover:bg-sky-100 transition">
                  <td className="py-2 px-4 font-medium">{property.title}</td>
                  <td className="py-2 px-4">
                    <div>
                      <div className="font-medium">{property.owner?.name || 'Unknown'}</div>
                      <div className="text-sm text-gray-500">{property.owner?.email}</div>
                    </div>
                  </td>
                  <td className="py-2 px-4 capitalize">{property.propertyType}</td>
                  <td className="py-2 px-4">
                    <div className="text-sm">
                      <div>{property.location?.city}</div>
                      <div className="text-gray-500">{property.location?.address}</div>
                    </div>
                  </td>
                  <td className="py-2 px-4 font-medium">NPR {property.price?.toLocaleString()}</td>
                  <td className="py-2 px-4">
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${
                      property.status === 'approved' ? 'bg-green-100 text-green-700' : 
                      property.status === 'rejected' ? 'bg-red-100 text-red-700' : 
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {property.status}
                    </span>
                  </td>
                  <td className="py-2 px-4">
                    <div className="flex gap-2">
                      {property.status !== 'approved' && (
                        <button 
                          className="bg-green-400 hover:bg-green-600 text-white px-2 py-1 rounded transition" 
                          title="Approve"
                          onClick={() => handleStatusUpdate(property._id, 'approved')}
                        >
                          <CheckCircle className="w-4 h-4" />
                        </button>
                      )}
                      {property.status !== 'rejected' && (
                        <button 
                          className="bg-red-400 hover:bg-red-600 text-white px-2 py-1 rounded transition" 
                          title="Reject"
                          onClick={() => handleStatusUpdate(property._id, 'rejected')}
                        >
                          <XCircle className="w-4 h-4" />
                        </button>
                      )}
                      <button 
                        className="bg-red-500 hover:bg-red-700 text-white px-2 py-1 rounded transition" 
                        title="Delete" 
                        onClick={() => handleDelete(property._id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="py-8 text-center text-gray-500">
                  No properties found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between bg-white rounded-lg shadow p-4">
          <div className="text-sm text-gray-600">
            Page {currentPage} of {totalPages}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="flex items-center gap-1 px-3 py-1 rounded border border-sky-200 text-sky-600 hover:bg-sky-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </button>
            <span className="px-3 py-1 bg-sky-100 text-sky-700 rounded">
              {currentPage}
            </span>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="flex items-center gap-1 px-3 py-1 rounded border border-sky-200 text-sky-600 hover:bg-sky-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}