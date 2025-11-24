import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { Users, DollarSign, Activity } from 'lucide-react';

const AdminDashboard = () => {
    const [stats, setStats] = useState({ userCount: 0, totalDonations: 0, volunteerCount: 0 });
    const [users, setUsers] = useState([]);
    const [volunteers, setVolunteers] = useState([]);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('token');
            const config = { headers: { Authorization: `Bearer ${token}` } };

            try {
                const statsRes = await axios.get('http://localhost:5000/api/admin/stats', config);
                setStats(statsRes.data);

                const usersRes = await axios.get('http://localhost:5000/api/admin/users', config);
                setUsers(usersRes.data);

                const volunteersRes = await axios.get('http://localhost:5000/api/admin/volunteers', config);
                setVolunteers(volunteersRes.data);
            } catch (err) {
                console.error(err);
            }
        };

        if (user && user.role === 'admin') {
            fetchData();
        }
    }, [user]);

    return (
        <div className="container" style={{ padding: '4rem 0' }}>
            <h2 style={{ marginBottom: '2rem' }}>Admin Dashboard</h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>
                <StatCard
                    icon={<Users size={30} color="#6366f1" />}
                    title="Total Users"
                    value={stats.userCount}
                />
                <StatCard
                    icon={<DollarSign size={30} color="#10b981" />}
                    title="Total Donations"
                    value={`$${stats.totalDonations}`}
                />
                <StatCard
                    icon={<Activity size={30} color="#ec4899" />}
                    title="Volunteers"
                    value={stats.volunteerCount}
                />
            </div>

            <div className="card" style={{ marginBottom: '3rem' }}>
                <h3 style={{ marginBottom: '1.5rem' }}>Recent Users</h3>
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '600px' }}>
                        <thead>
                            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', textAlign: 'left' }}>
                                <th style={{ padding: '1rem' }}>Name</th>
                                <th style={{ padding: '1rem' }}>Email</th>
                                <th style={{ padding: '1rem' }}>Role</th>
                                <th style={{ padding: '1rem' }}>Joined</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((u) => (
                                <tr key={u.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                    <td style={{ padding: '1rem' }}>{u.name}</td>
                                    <td style={{ padding: '1rem', color: 'var(--text-muted)' }}>{u.email}</td>
                                    <td style={{ padding: '1rem' }}>
                                        <span style={{
                                            padding: '0.25rem 0.75rem',
                                            borderRadius: '1rem',
                                            fontSize: '0.8rem',
                                            background: u.role === 'admin' ? 'rgba(99, 102, 241, 0.2)' : 'rgba(255, 255, 255, 0.1)',
                                            color: u.role === 'admin' ? '#818cf8' : 'white'
                                        }}>
                                            {u.role}
                                        </span>
                                    </td>
                                    <td style={{ padding: '1rem', color: 'var(--text-muted)' }}>{new Date(u.createdAt).toLocaleDateString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="card">
                <h3 style={{ marginBottom: '1.5rem' }}>Volunteer Applications</h3>
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '700px' }}>
                        <thead>
                            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', textAlign: 'left' }}>
                                <th style={{ padding: '1rem' }}>Name</th>
                                <th style={{ padding: '1rem' }}>Email</th>
                                <th style={{ padding: '1rem' }}>Phone</th>
                                <th style={{ padding: '1rem' }}>Skills</th>
                                <th style={{ padding: '1rem' }}>Status</th>
                                <th style={{ padding: '1rem' }}>Applied</th>
                            </tr>
                        </thead>
                        <tbody>
                            {volunteers.map((v) => (
                                <tr key={v.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                    <td style={{ padding: '1rem' }}>{v.name}</td>
                                    <td style={{ padding: '1rem', color: 'var(--text-muted)' }}>{v.email}</td>
                                    <td style={{ padding: '1rem', color: 'var(--text-muted)' }}>{v.phone}</td>
                                    <td style={{ padding: '1rem', color: 'var(--text-muted)' }}>{v.skills || 'N/A'}</td>
                                    <td style={{ padding: '1rem' }}>
                                        <span style={{
                                            padding: '0.25rem 0.75rem',
                                            borderRadius: '1rem',
                                            fontSize: '0.8rem',
                                            background: v.status === 'pending' ? 'rgba(251, 191, 36, 0.2)' : 'rgba(16, 185, 129, 0.2)',
                                            color: v.status === 'pending' ? '#fbbf24' : '#10b981'
                                        }}>
                                            {v.status}
                                        </span>
                                    </td>
                                    <td style={{ padding: '1rem', color: 'var(--text-muted)' }}>{new Date(v.createdAt).toLocaleDateString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

const StatCard = ({ icon, title, value }) => (
    <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
        <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '50%' }}>
            {icon}
        </div>
        <div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{title}</p>
            <h4 style={{ fontSize: '1.5rem' }}>{value}</h4>
        </div>
    </div>
);

export default AdminDashboard;
