import React, { useState } from 'react';
import axios from 'axios';
import { CreditCard, Calendar, Lock } from 'lucide-react';

const Donate = () => {
    const [amount, setAmount] = useState(50);
    const [paymentDetails, setPaymentDetails] = useState({
        cardNumber: '',
        expiry: '',
        cvc: ''
    });
    const [processing, setProcessing] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const handlePaymentChange = (e) => {
        setPaymentDetails({ ...paymentDetails, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setProcessing(true);
        setError('');

        const token = localStorage.getItem('token');
        const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};

        try {
            const res = await axios.post('http://localhost:5000/api/payment/process', {
                amount,
                ...paymentDetails
            }, config);

            if (res.data.success) {
                setSuccess(true);
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Payment failed. Please try again.');
        } finally {
            setProcessing(false);
        }
    };

    if (success) {
        return (
            <div className="container" style={{ padding: '4rem 0', textAlign: 'center' }}>
                <div className="card animate-fade-in" style={{ maxWidth: '500px', margin: '0 auto', padding: '3rem' }}>
                    <div style={{
                        width: '80px', height: '80px', background: 'rgba(16, 185, 129, 0.2)',
                        borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        margin: '0 auto 1.5rem'
                    }}>
                        <CreditCard size={40} color="#10b981" />
                    </div>
                    <h2 style={{ color: '#10b981', marginBottom: '1rem' }}>Donation Successful!</h2>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
                        Thank you for your generous donation of <strong>${amount}</strong>. Your support makes a difference.
                    </p>
                    <button onClick={() => { setSuccess(false); setAmount(50); setPaymentDetails({ cardNumber: '', expiry: '', cvc: '' }); }} className="btn btn-primary">
                        Donate Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="container" style={{ padding: '4rem 0' }}>
            <div className="card animate-fade-in" style={{ maxWidth: '600px', margin: '0 auto' }}>
                <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Make a Donation</h2>

                <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', justifyContent: 'center' }}>
                    {[10, 25, 50, 100].map((val) => (
                        <button
                            key={val}
                            onClick={() => setAmount(val)}
                            className={`btn ${amount === val ? 'btn-primary' : 'btn-outline'}`}
                            style={{ minWidth: '80px', justifyContent: 'center' }}
                        >
                            ${val}
                        </button>
                    ))}
                </div>

                <div className="input-group">
                    <label>Custom Amount ($)</label>
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(Number(e.target.value))}
                        min="1"
                    />
                </div>

                <form onSubmit={handleSubmit} style={{ marginTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '2rem' }}>
                    <h3 style={{ marginBottom: '1.5rem', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Lock size={18} color="var(--primary)" /> Secure Payment Details
                    </h3>

                    <div className="input-group">
                        <label>Card Number</label>
                        <div style={{ position: 'relative' }}>
                            <input
                                type="text"
                                name="cardNumber"
                                placeholder="0000 0000 0000 0000"
                                value={paymentDetails.cardNumber}
                                onChange={handlePaymentChange}
                                required
                                maxLength="19"
                                style={{ paddingLeft: '3rem' }}
                            />
                            <CreditCard size={20} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div className="input-group">
                            <label>Expiry Date</label>
                            <div style={{ position: 'relative' }}>
                                <input
                                    type="text"
                                    name="expiry"
                                    placeholder="MM/YY"
                                    value={paymentDetails.expiry}
                                    onChange={handlePaymentChange}
                                    required
                                    maxLength="5"
                                    style={{ paddingLeft: '3rem' }}
                                />
                                <Calendar size={20} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                            </div>
                        </div>
                        <div className="input-group">
                            <label>CVC</label>
                            <div style={{ position: 'relative' }}>
                                <input
                                    type="text"
                                    name="cvc"
                                    placeholder="123"
                                    value={paymentDetails.cvc}
                                    onChange={handlePaymentChange}
                                    required
                                    maxLength="3"
                                    style={{ paddingLeft: '3rem' }}
                                />
                                <Lock size={20} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                            </div>
                        </div>
                    </div>

                    {error && <div style={{ color: '#fca5a5', marginBottom: '1rem', textAlign: 'center' }}>{error}</div>}

                    <button type="submit" disabled={processing} className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '1rem' }}>
                        {processing ? 'Processing...' : `Donate $${amount}`}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Donate;
