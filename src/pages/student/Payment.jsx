import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Shield, CheckCircle2, CreditCard, Landmark, Wallet } from 'lucide-react';
import { useData } from '../../context/DataContext';

export default function Payment() {
    const location = useLocation();
    const navigate = useNavigate();
    const { mentor, date, time, mode } = location.state || {};
    const { bookSession } = useData();
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handlePay = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setSuccess(true);
            bookSession({
                mentorId: mentor.id,
                date,
                time,
                mode,
                price: mentor.price30min
            });
        }, 1500);
    };

    if (!mentor) return <div className="container" style={{ paddingTop: '100px', textAlign: 'center' }}>No booking data found.</div>;

    if (success) {
        return (
            <div className="container" style={{ height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
                <CheckCircle2 size={80} color="#16A34A" />
                <h1 className="mt-6" style={{ fontSize: '28px' }}>Payment successful</h1>
                <p className="mt-2" style={{ fontSize: '18px', color: '#666' }}>Your session has been booked</p>
                <button
                    className="btn btn-primary mt-10"
                    onClick={() => navigate('/sessions')}
                    style={{ maxWidth: '250px' }}
                >
                    View My Sessions
                </button>
            </div>
        );
    }

    return (
        <div className="container" style={{ paddingTop: '20px' }}>
            <h1 style={{ fontSize: '24px' }}>Secure Payment</h1>
            <p className="mb-6" style={{ color: '#666' }}>Complete your booking with {mentor.name}</p>

            <div className="card" style={{ border: '1.5px solid #EEE' }}>
                <div className="flex justify-between items-center mb-3">
                    <span style={{ color: '#666' }}>Session Fee</span>
                    <span style={{ fontWeight: '600' }}>₹{mentor.price30min}</span>
                </div>
                <div className="flex justify-between items-center mb-3">
                    <span style={{ color: '#666' }}>Platform Fee (incl. GST)</span>
                    <span style={{ fontWeight: '600' }}>₹0.00</span>
                </div>
                <hr style={{ margin: '16px 0', border: 'none', borderTop: '1px solid #EEE' }} />
                <div className="flex justify-between items-center" style={{ fontWeight: '800', fontSize: '20px' }}>
                    <span>Total Amount</span>
                    <span style={{ color: 'var(--primary)' }}>₹{mentor.price30min}</span>
                </div>
            </div>

            <h3 className="mt-8 mb-4" style={{ fontSize: '16px' }}>Select Payment Method</h3>
            <div className="card" style={{ padding: '0', border: '1.5px solid #EEE' }}>
                <div className="flex items-center gap-3" style={{ padding: '18px', borderBottom: '1px solid #EEE' }}>
                    <div style={{ width: '20px', height: '20px', borderRadius: '50%', border: '2px solid var(--primary)', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'white' }}></div>
                    </div>
                    <CreditCard size={20} color="var(--primary)" />
                    <span style={{ flex: 1, fontWeight: '600' }}>UPI (GPay, PhonePe, Paytm)</span>
                </div>
                <div className="flex items-center gap-3" style={{ padding: '18px', borderBottom: '1px solid #EEE', opacity: 0.5 }}>
                    <div style={{ width: '20px', height: '20px', borderRadius: '50%', border: '2px solid #CCC' }}></div>
                    <Landmark size={20} color="#666" />
                    <span style={{ flex: 1, fontWeight: '500' }}>Net Banking</span>
                </div>
                <div className="flex items-center gap-3" style={{ padding: '18px', opacity: 0.5 }}>
                    <div style={{ width: '20px', height: '20px', borderRadius: '50%', border: '2px solid #CCC' }}></div>
                    <Wallet size={20} color="#666" />
                    <span style={{ flex: 1, fontWeight: '500' }}>Wallets</span>
                </div>
            </div>

            <div style={{ textAlign: 'center', marginTop: '32px' }}>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', color: '#16A34A', fontSize: '13px', fontWeight: '600' }}>
                    <Shield size={16} />
                    <span>Secure & encrypted payment</span>
                </div>
            </div>

            <div style={{ position: 'fixed', bottom: '24px', left: '20px', right: '20px' }}>
                <button className="btn btn-primary" onClick={handlePay} disabled={loading} style={{ height: '56px' }}>
                    {loading ? 'Processing...' : `Pay ₹${mentor.price30min}`}
                </button>
            </div>
        </div>
    );
}
