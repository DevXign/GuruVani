import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, CheckCircle2 } from 'lucide-react';
import MobileLayout from '../../components/layout/MobileLayout';
import { useData } from '../../context/DataContext';

export default function MentorList() {
    const navigate = useNavigate();
    const { mentors } = useData();
    const approvedMentors = mentors.filter(m => m.status === 'approved');

    return (
        <MobileLayout>
            <div className="container" style={{ paddingTop: '20px' }}>
                <header style={{ marginBottom: '24px' }}>
                    <h1 style={{ fontSize: '22px' }}>Available mentors for your goal</h1>
                    <p style={{ fontSize: '14px', marginTop: '4px' }}>Expert guidance from retired and senior professionals</p>
                </header>

                <div className="mentor-grid">
                    {approvedMentors.map((mentor) => (
                        <div
                            key={mentor.id}
                            className="card"
                            style={{ padding: '0', overflow: 'hidden', cursor: 'pointer', border: '1px solid #EEE' }}
                            onClick={() => navigate(`/mentors/${mentor.id}`)}
                        >
                            <div style={{ display: 'flex' }}>
                                <img
                                    src={mentor.image}
                                    alt={mentor.name}
                                    style={{ width: '110px', height: '140px', objectFit: 'cover' }}
                                />
                                <div style={{ padding: '12px', flex: 1 }}>
                                    <div className="flex items-center gap-1 mb-1">
                                        <h3 style={{ fontSize: '16px', margin: 0 }}>{mentor.name}</h3>
                                        <CheckCircle2 size={14} color="#1E2A44" fill="#F4A340" />
                                    </div>
                                    <p style={{ fontSize: '12px', color: 'var(--primary)', fontWeight: '600', marginBottom: '4px' }}>
                                        {mentor.previousRole}
                                    </p>
                                    <p style={{ fontSize: '11px', color: '#666', marginBottom: '8px' }}>
                                        {mentor.experienceYears} years of experience
                                    </p>

                                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '8px' }}>
                                        <Star size={14} color="#F4A340" fill="#F4A340" />
                                        <span style={{ fontSize: '13px', fontWeight: '700' }}>{mentor.rating}</span>
                                        <span style={{ fontSize: '12px', color: '#999' }}>({mentor.totalSessions} sessions)</span>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <span style={{ fontWeight: '800', color: 'var(--primary)', fontSize: '15px' }}>₹{mentor.price30min}<span style={{ fontSize: '10px', fontWeight: '400' }}>/30m</span></span>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#16A34A' }}></div>
                                            <span style={{ color: '#16A34A', fontSize: '11px', fontWeight: '700' }}>Online</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </MobileLayout>
    );
}
