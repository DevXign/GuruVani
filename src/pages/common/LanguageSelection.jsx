import React from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../../context/AuthContext';

export default function LanguageSelection() {
    const navigate = useNavigate();
    const { user, login } = useAuth();

    const handleSelect = (lang) => {
        const updatedUser = { ...user, language: lang };
        login(updatedUser);
        navigate('/goal-selection');
    };

    return (
        <div className="container" style={{ paddingTop: '100px' }}>
            <h1 className="text-center mb-6">Select your preferred language</h1>

            <div className="mt-4">
                <div
                    className="card text-center"
                    style={{ cursor: 'pointer', border: '2px solid var(--primary)', padding: '30px' }}
                    onClick={() => handleSelect('kn')}
                >
                    <h2 style={{ fontSize: '24px', color: 'var(--primary)' }}>ಕನ್ನಡ (Primary)</h2>
                </div>

                <div
                    className="card text-center mt-4"
                    style={{ cursor: 'pointer', border: '1.5px solid #E0E0E0', padding: '30px' }}
                    onClick={() => handleSelect('en')}
                >
                    <h2 style={{ fontSize: '24px', color: 'var(--text-muted)' }}>English (Secondary)</h2>
                </div>
            </div>
        </div>
    );
}
