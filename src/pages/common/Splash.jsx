import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../../context/AuthContext';

export default function Splash() {
    const navigate = useNavigate();
    const { user } = useAuth();

    useEffect(() => {
        const timer = setTimeout(() => {
            if (user) {
                if (user.role === 'admin') navigate('/admin');
                else if (user.role === 'mentor') navigate('/mentor/dashboard');
                else navigate('/mentors'); // Students and guest-like roles go to mentor list
            } else {
                navigate('/login');
            }
        }, 2500);
        return () => clearTimeout(timer);
    }, [navigate, user]);

    return (
        <div className="splash" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', background: 'var(--primary)' }}>
            <div className="logo-container" style={{ textAlign: 'center' }}>
                <img src="/GuruvaniLogo(white).PNG" alt="GuruVani" style={{ width: '200px', marginBottom: '20px' }} />
                <div className="tagline" style={{ fontSize: '18px', color: 'var(--accent)', fontWeight: '500', letterSpacing: '1px' }}>Real voices. Real guidance.</div>
            </div>

            <div style={{ position: 'absolute', bottom: '60px' }}>
                <div className="loader"></div>
            </div>
        </div>
    );
}
