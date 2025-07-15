import React from 'react';
import {
  Routes,
  Route,
  NavLink,
  useNavigate,
} from 'react-router-dom';
import './AdminDashboard.css';

// Dashboard Section
const DashboardSection = () => (
  <section className="section">
    <div className="promo-box">
      <h2>Enjoy your first home sale</h2>
      <img src="/images/house.jpg" alt="House" className="promo-image" />
      <button className="explore-btn">Explore Now</button>
    </div>
  </section>
);

// Verify Homes Section
const VerifyHomesSection = () => {
  const navigate = useNavigate();
  const properties = [
    {
      salesBy: 'Allena',
      location: 'Chabahil, Kathmandu',
      type: 'Rent',
      price: 'Rs 5,447.00',
    },
    {
      salesBy: 'Prakriti Chapai',
      location: 'Chabahil, Kathmandu',
      type: 'Rent',
      price: 'Rs 4,965.00',
    },
  ];

  return (
    <section className="section">
      <h2>Verify Homes</h2>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Sales by</th>
              <th>Property name</th>
              <th>Sales type</th>
              <th>Price</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {properties.map((item, index) => (
              <tr key={index}>
                <td>{item.salesBy}</td>
                <td>{item.location}</td>
                <td>{item.type}</td>
                <td>{item.price}</td>
                <td>
                  <button onClick={() => navigate('/client-details')}>View</button>
                  <button onClick={() => navigate('/property-details')}>Accept</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

// Building Connection / Reports Section
const BuildingConnectionSection = () => (
  <section className="section">
    <h2>Building Condition</h2>
    <ul>
      <li>Home verification process: ███████</li>
      <li>Client verification process: █████</li>
      <li>Pending request: █</li>
    </ul>
    <button>Maintenance Details</button>
  </section>
);

// Client Details Section
const ClientDetailsSection = () => (
  <section className="section">
    <h2>Client Details</h2>
    <p>Name: <strong>Allena</strong></p>
    <p>Address: Chabahil, Kathmandu</p>
    <p>Rent: Rs 5,447.00</p>
    <button>Add</button>
    <button>Remove</button>
  </section>
);

// Property Details Section
const PropertyDetailsSection = () => (
  <section className="section">
    <h2>4 BHK — With Good Furnishing and Good Neighbourhood</h2>
    <img src="/images/home.jpg" alt="Approved Property" className="property-image" />
    <p><strong>Availability:</strong> Yes</p>
    <ul>
      <li>Spacious and well-ventilated rooms</li>
      <li>Ample natural lighting</li>
      <li>Fully equipped kitchen with high-end appliances</li>
      <li>Modern and secure features</li>
      <li>Energy-efficient design</li>
    </ul>
    <p><strong>Features:</strong> 4 Bedrooms | 2 Bathrooms | 1 Kitchen | 1 Living Room | 1 Car Garage | Campfire Area</p>
    <p><strong>Price:</strong> Rs 60,000</p>
    <h3>Description</h3>
    <p>Step into luxury with this stunning high-end home now available for sale — a masterpiece of elegance and modern living.</p>
    <button>Approve</button>
    <button>Disapprove</button>
  </section>
);

// Settings Section
const SettingsSection = () => {
  const saveSettings = () => alert('Settings saved!');
  return (
    <section className="section">
      <h2>Admin Settings</h2>
      <p><strong>Profile Email:</strong> admin@rentalbuddy.com</p>
      <label><input type="checkbox" defaultChecked /> Enable Notifications</label><br /><br />
      <label><input type="checkbox" /> Allow Admin Tools Access</label><br /><br />
      <button onClick={saveSettings}>Save Settings</button>
    </section>
  );
};

// Logout Section
const LogoutSection = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    alert('You have been logged out.');
    navigate('/dashboard');
  };

  return (
    <section className="section">
      <div className="logout-popup">
        <h2>Are you sure you want to logout?</h2>
        <div className="emoji">😔</div>
        <button className="confirm" onClick={handleLogout}>Yes, Logout</button>
        <button className="cancel" onClick={() => navigate('/dashboard')}>Cancel</button>
      </div>
    </section>
  );
};

// Admin Dashboard Component
const AdminDashboard = () => (
  <div className="dashboard-container">
    <div className="sidebar">
      <img src="/images/Logo.png" alt="Logo" className="logo" />
      <img src="/images/User.png" alt="User" className="user-photo" />
      <p>Welcome Back!<br /><strong>Parixit</strong></p>

      <NavLink to="/dashboard" className={({ isActive }) => isActive ? 'active-btn' : ''}>Dashboard</NavLink>
      <NavLink to="/verify-homes" className={({ isActive }) => isActive ? 'active-btn' : ''}>Clients</NavLink>
      <NavLink to="/building-connection" className={({ isActive }) => isActive ? 'active-btn' : ''}>Reports</NavLink>
      <NavLink to="/settings" className={({ isActive }) => isActive ? 'active-btn' : ''}>Settings</NavLink>
      <NavLink to="/logout" className={({ isActive }) => isActive ? 'active-btn' : ''}>Logout</NavLink>
    </div>

    <div className="content">
      <Routes>
        <Route path="/" element={<DashboardSection />} />
        <Route path="/dashboard" element={<DashboardSection />} />
        <Route path="/verify-homes" element={<VerifyHomesSection />} />
        <Route path="/building-connection" element={<BuildingConnectionSection />} />
        <Route path="/client-details" element={<ClientDetailsSection />} />
        <Route path="/property-details" element={<PropertyDetailsSection />} />
        <Route path="/settings" element={<SettingsSection />} />
        <Route path="/logout" element={<LogoutSection />} />
        <Route path="*" element={<DashboardSection />} /> {/* Fallback */}
      </Routes>
    </div>
  </div>
);

export default AdminDashboard;
