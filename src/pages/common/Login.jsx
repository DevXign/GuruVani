import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';


export default function Login() {
    const [phone, setPhone] = useState('');
    const [otp, setOtp] = useState('');
    const [step, setStep] = useState(1); // 1: phone, 2: otp
    const navigate = useNavigate();
    const { login } = useAuth();

    const maskPhone = (num) => {
        return num ? `******${num.slice(-4)}` : '';
    };

    const handleSendOtp = (e) => {
        e.preventDefault();
        if (phone.length === 10) {
            setStep(2);
        }
    };

    const handleVerifyOtp = (e) => {
        e.preventDefault();
        // Keep functional logic for MVP testing but remove hint/demo text
        if (otp === '1234') {
            const mockUser = { id: 'u1', name: 'User', phone, role: 'student', language: null };
            login(mockUser);
            navigate('/language-selection');
        } else {
            alert('Verification failed. Please check the code.');
        }
    };

    return (
        <div className="container" style={{ paddingTop: '60px' }}>
            <div className="text-center mb-10">
                <img src="/GuruvaniLogo(black).PNG" alt="GuruVani" style={{ width: '150px', marginBottom: '16px' }} />
            </div>
            <div className="card" style={{ border: '1.5px solid #EEE', boxShadow: 'none' }}>
                <h1 className="text-center mb-2" style={{ fontSize: '24px' }}>Welcome</h1>
                <p className="text-center mb-8" style={{ color: '#666', fontSize: '15px' }}>Your journey to expert guidance starts here</p>

                {step === 1 ? (
                    <form onSubmit={handleSendOtp}>
                        <div className="input-group">
                            <label>Mobile Number</label>
                            <input
                                type="tel"
                                placeholder="Enter mobile number"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">Send OTP</button>
                    </form>
                ) : (
                    <form onSubmit={handleVerifyOtp}>
                        <div className="input-group">
                            <label>Enter the OTP sent to your mobile number {maskPhone(phone)}</label>
                            <input
                                type="text"
                                placeholder="4-digit code"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 4))}
                                required
                            />
                            <div className="flex justify-between items-center mt-4">
                                <button
                                    type="button"
                                    style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: '12px', cursor: 'pointer' }}
                                    onClick={() => setStep(1)}
                                >
                                    Change Number
                                </button>
                                <button
                                    type="button"
                                    style={{ background: 'none', border: 'none', color: 'var(--primary)', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer' }}
                                    onClick={() => alert('OTP resent successfully')}
                                >
                                    Resend OTP
                                </button>
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary mt-2">Verify & Login</button>
                    </form>
                )}
            </div>
        </div>
    );
}
