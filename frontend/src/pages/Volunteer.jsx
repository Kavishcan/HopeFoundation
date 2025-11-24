import React, { useState } from 'react';
import axios from 'axios';
import { UserPlus, Mail, Phone, Briefcase, Calendar, MessageSquare } from 'lucide-react';

const Volunteer = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        skills: '',
        availability: '',
        message: ''
    });
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await axios.post('http://localhost:5000/api/volunteer/apply', formData);
            if (res.data.success) {
                setSuccess(true);
                setFormData({ name: '', email: '', phone: '', skills: '', availability: '', message: '' });
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to submit application. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="container" style={{ padding: '4rem 0', textAlign: 'center' }}>
                <div className="card animate-fade-in" style={{ maxWidth: '600px', margin: '0 auto', padding: '3rem' }}>
                    <div style={{
                        width: '80px', height: '80px', background: 'rgba(99, 102, 241, 0.2)',
                        borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        margin: '0 auto 1.5rem'
                    }}>
                        <UserPlus size={40} color="#6366f1" />
                    </div>
                    <h2 style={{ color: '#6366f1', marginBottom: '1rem' }}>Application Submitted!</h2>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
                        Thank you for your interest in volunteering with us. We'll review your application and get back to you soon.
                    </p>
                    <button onClick={() => setSuccess(false)} className="btn btn-primary">
                        Submit Another Application
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="container" style={{ padding: '4rem 0' }}>
            <div className="card animate-fade-in" style={{ maxWidth: '700px', margin: '0 auto' }}>
                <h2 style={{ textAlign: 'center', marginBottom: '1rem' }}>Join Our Volunteer Team</h2>
                <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '3rem' }}>
                    Make a difference in your community. Fill out the form below to apply as a volunteer.
                </p>

                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label><Mail size={16} style={{ display: 'inline', marginRight: '0.5rem' }} />Full Name *</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            placeholder="Enter your full name"
                        />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div className="input-group">
                            <label><Mail size={16} style={{ display: 'inline', marginRight: '0.5rem' }} />Email Address *</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                placeholder="your.email@example.com"
                            />
                        </div>

                        <div className="input-group">
                            <label><Phone size={16} style={{ display: 'inline', marginRight: '0.5rem' }} />Phone Number *</label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                                placeholder="+1 (555) 000-0000"
                            />
                        </div>
                    </div>

                    <div className="input-group">
                        <label><Briefcase size={16} style={{ display: 'inline', marginRight: '0.5rem' }} />Skills & Expertise</label>
                        <input
                            type="text"
                            name="skills"
                            value={formData.skills}
                            onChange={handleChange}
                            placeholder="e.g., Teaching, Medical, Event Planning, etc."
                        />
                    </div>

                    <div className="input-group">
                        <label><Calendar size={16} style={{ display: 'inline', marginRight: '0.5rem' }} />Availability</label>
                        <input
                            type="text"
                            name="availability"
                            value={formData.availability}
                            onChange={handleChange}
                            placeholder="e.g., Weekends, Evenings, Full-time, etc."
                        />
                    </div>

                    <div className="input-group">
                        <label><MessageSquare size={16} style={{ display: 'inline', marginRight: '0.5rem' }} />Why do you want to volunteer?</label>
                        <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            rows="4"
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                background: 'rgba(15, 23, 42, 0.5)',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                borderRadius: '0.5rem',
                                color: 'white',
                                fontSize: '1rem',
                                fontFamily: 'inherit',
                                resize: 'vertical'
                            }}
                            placeholder="Tell us about your motivation and what you hope to contribute..."
                        />
                    </div>

                    {error && <div style={{ color: '#fca5a5', marginBottom: '1rem', textAlign: 'center' }}>{error}</div>}

                    <button type="submit" disabled={loading} className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                        {loading ? 'Submitting...' : 'Submit Application'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Volunteer;
