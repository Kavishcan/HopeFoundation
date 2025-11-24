import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Heart, LogOut, User, LayoutDashboard } from 'lucide-react';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav style={{ padding: '1.5rem 0', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Link to="/" style={{ fontSize: '1.5rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <img src="/image/logo.jpg" alt="Logo" style={{ height: '40px', borderRadius: '50%' }} />
                    <span className="gradient-text">Hope Foundation</span>
                </Link>

                <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                    <a href="/#homeSection" style={{ color: 'var(--text-muted)' }}>Home</a>
                    <a href="/#aboutSection" style={{ color: 'var(--text-muted)' }}>About</a>
                    <a href="/#programsSection" style={{ color: 'var(--text-muted)' }}>Programs</a>
                    <a href="/#educationSection" style={{ color: 'var(--text-muted)' }}>Education</a>
                    <a href="/#gallerySection" style={{ color: 'var(--text-muted)' }}>Gallery</a>
                    <Link to="/donate" style={{ color: 'var(--text-muted)' }}>Donate</Link>

                    {user ? (
                        <>
                            {user.role === 'admin' && (
                                <Link to="/admin" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <LayoutDashboard size={18} />
                                    Dashboard
                                </Link>
                            )}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)' }}>
                                    <User size={18} />
                                    {user.name}
                                </span>
                                <button onClick={handleLogout} className="btn btn-outline" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>
                                    <LogOut size={16} />
                                </button>
                            </div>
                        </>
                    ) : (
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <Link to="/login" className="btn btn-outline">Login</Link>
                            <Link to="/register" className="btn btn-primary">Get Started</Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
