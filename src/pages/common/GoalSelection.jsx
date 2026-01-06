import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const GOALS = [
    { id: 'upsc', label: 'UPSC / KPSC', icon: '🏛️' },
    { id: 'banking', label: 'Banking Exams', icon: '💰' },
    { id: 'govt', label: 'Other Government Exams', icon: '📜' },
    { id: 'career', label: 'Career Guidance', icon: '🎯' },
];

export default function GoalSelection() {
    const [selected, setSelected] = useState([]);
    const navigate = useNavigate();

    const toggleGoal = (id) => {
        setSelected(prev =>
            prev.includes(id) ? prev.filter(g => g !== id) : [...prev, id]
        );
    };

    return (
        <div className="container" style={{ paddingTop: '80px' }}>
            <h1 className="mb-2">Choose what you are preparing for</h1>
            <p className="mb-6" style={{ fontSize: '15px' }}>This helps us find the best mentors for your journey</p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                {GOALS.map((goal) => (
                    <div
                        key={goal.id}
                        className="card"
                        style={{
                            borderColor: selected.includes(goal.id) ? 'var(--accent)' : '#E0E0E0',
                            borderWidth: '2px',
                            borderStyle: 'solid',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            padding: '24px 16px',
                            margin: '0',
                            cursor: 'pointer',
                            transition: 'border-color 0.2s'
                        }}
                        onClick={() => toggleGoal(goal.id)}
                    >
                        <span style={{ fontSize: '32px', marginBottom: '12px' }}>{goal.icon}</span>
                        <span style={{ fontWeight: '600', textAlign: 'center', fontSize: '14px' }}>{goal.label}</span>
                    </div>
                ))}
            </div>

            <div style={{ marginTop: '40px' }}>
                <button
                    className="btn btn-primary"
                    disabled={selected.length === 0}
                    onClick={() => navigate('/mentors')}
                    style={{ opacity: selected.length === 0 ? 0.5 : 1 }}
                >
                    Continue
                </button>
            </div>
        </div>
    );
}
