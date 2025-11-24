import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Donate from './pages/Donate';
import AdminDashboard from './pages/AdminDashboard';
import { AuthProvider, AuthContext } from './context/AuthContext';

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <div>Loading...</div>;

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (adminOnly && user.role !== 'admin') {
    return <Navigate to="/" />;
  }

  return children;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
          <Navbar />
          <main style={{ flex: 1 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/donate" element={<Donate />} />
              <Route
                path="/admin"
                element={
                  <ProtectedRoute adminOnly={true}>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </main>
          <footer style={{ background: '#0f172a', padding: '4rem 0 2rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
            <div className="container">
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '3rem', marginBottom: '3rem' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
                    <img src="/image/logo.jpg" alt="Logo" style={{ height: '40px', borderRadius: '50%' }} />
                    <span className="gradient-text" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Hope Foundation</span>
                  </div>
                  <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                    Stay Connected with Our Mission. Subscribe to our newsletter and be
                    the first to hear about our latest projects, success stories, and
                    ways you can help.
                  </p>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <input type="email" placeholder="Enter your email" style={{ padding: '0.5rem', borderRadius: '0.25rem', border: 'none', flex: 1 }} />
                    <button className="btn btn-primary" style={{ padding: '0.5rem 1rem' }}>Subscribe</button>
                  </div>
                </div>

                <div>
                  <h3 style={{ fontSize: '1.2rem', marginBottom: '1.5rem' }}>Useful Links</h3>
                  <ul style={{ listStyle: 'none', padding: 0 }}>
                    <li style={{ marginBottom: '0.5rem' }}><a href="/#homeSection" style={{ color: 'var(--text-muted)' }}>Home</a></li>
                    <li style={{ marginBottom: '0.5rem' }}><a href="/#aboutSection" style={{ color: 'var(--text-muted)' }}>About Us</a></li>
                    <li style={{ marginBottom: '0.5rem' }}><a href="/#programsSection" style={{ color: 'var(--text-muted)' }}>Programs</a></li>
                    <li style={{ marginBottom: '0.5rem' }}><a href="/#educationSection" style={{ color: 'var(--text-muted)' }}>Education</a></li>
                    <li style={{ marginBottom: '0.5rem' }}><a href="/#gallerySection" style={{ color: 'var(--text-muted)' }}>Gallery</a></li>
                  </ul>
                </div>

                <div>
                  <h3 style={{ fontSize: '1.2rem', marginBottom: '1.5rem' }}>Connect With Us</h3>
                  <p style={{ color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                    <strong>Address:</strong><br />
                    94/1/2, Saunders Place<br />
                    Colombo-12, Sri Lanka
                  </p>
                  <p style={{ color: 'var(--text-muted)', marginBottom: '0.5rem' }}><strong>Email:</strong> info@hopefoundation.org</p>
                  <p style={{ color: 'var(--text-muted)' }}><strong>Phone:</strong> (+94) 755075259</p>
                </div>
              </div>

              <div style={{ textAlign: 'center', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.05)', color: 'var(--text-muted)' }}>
                <p>&copy; 2025 Hope Foundation. All rights reserved. | Making a difference, one life at a time.</p>
              </div>
            </div>
          </footer>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
