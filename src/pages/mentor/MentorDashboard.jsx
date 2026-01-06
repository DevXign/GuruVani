import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Users, IndianRupee, Clock, ArrowUpRight, Phone, Video } from 'lucide-react';
import MobileLayout from '../../components/layout/MobileLayout';
import { useData } from '../../context/DataContext';

export default function MentorDashboard() {
    const navigate = useNavigate();
    const { sessions } = useData();

    // In a real app, we'd filter by current mentor ID
    // For MVP demo, showing all upcoming sessions as "Yours"
    const upcomingSessions = sessions.filter(s => s.status === 'upcoming');
    const completedSessions = sessions.filter(s => s.status === 'completed');
    const totalEarnings = completedSessions.reduce((acc, curr) => acc + (curr.price || 0), 0);

    return (
        <MobileLayout>
            <div className="container" style={{ paddingTop: '20px', paddingBottom: '40px' }}>
                <header className="flex justify-between items-center mb-6">
                    <div>
                        <img src="/GuruvaniLogo(black).PNG" alt="GuruVani" style={{ width: '100px', marginBottom: '8px' }} />
                        <p style={{ fontSize: '14px', color: '#666' }}>Welcome back to your guidance desk</p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#DCFCE7', color: '#16A34A', padding: '6px 12px', borderRadius: '20px', fontSize: '11px', fontWeight: '800' }}>
                        <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#16A34A' }}></div>
                        ACTIVE
                    </div>
                </header>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '32px' }}>
                    <div className="card" style={{ margin: 0, padding: '20px', border: '1.5px solid #EEE', boxShadow: 'none' }}>
                        <IndianRupee size={20} color="var(--accent)" />
                        <h2 className="mt-2" style={{ fontSize: '24px' }}>₹{totalEarnings}</h2>
                        <p style={{ fontSize: '12px', fontWeight: '600', color: '#888', textTransform: 'uppercase' }}>Total Earnings</p>
                    </div>
                    <div className="card" style={{ margin: 0, padding: '20px', border: '1.5px solid #EEE', boxShadow: 'none' }}>
                        <Calendar size={20} color="var(--primary)" />
                        <h2 className="mt-2" style={{ fontSize: '24px' }}>{completedSessions.length}</h2>
                        <p style={{ fontSize: '12px', fontWeight: '600', color: '#888', textTransform: 'uppercase' }}>Sessions Done</p>
                    </div>
                </div>

                <h3 className="mb-4" style={{ fontSize: '18px' }}>Upcoming Sessions</h3>
                {upcomingSessions.length === 0 ? (
                    <div className="card text-center text-muted" style={{ padding: '40px' }}>
                        No upcoming sessions today.
                    </div>
                ) : (
                    upcomingSessions.map(session => (
                        <div key={session.id} className="card" style={{ borderLeft: '4px solid var(--accent)', borderTop: '1.5px solid #EEE', borderRight: '1.5px solid #EEE', borderBottom: '1.5px solid #EEE', boxShadow: 'none', marginBottom: '16px' }}>
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 style={{ fontSize: '16px', fontWeight: '700' }}>Student Request</h3>
                                    <div className="flex items-center gap-2 mt-2">
                                        <Clock size={14} color="var(--primary)" />
                                        <span style={{ fontSize: '13px', fontWeight: '600' }}>{session.date} • {session.time}</span>
                                    </div>
                                    <div className="flex items-center gap-2 mt-1">
                                        {session.mode === 'video' ? <Video size={14} color="#666" /> : <Phone size={14} color="#666" />}
                                        <span style={{ fontSize: '13px', color: '#666', textTransform: 'capitalize' }}>{session.mode} Call</span>
                                    </div>
                                </div>
                                <button
                                    className="btn btn-primary"
                                    style={{ width: 'auto', padding: '10px 20px', fontSize: '13px' }}
                                    onClick={() => alert('Starting secure call bridge...')}
                                >
                                    Start Call
                                </button>
                            </div>
                        </div>
                    ))
                )}

                <h3 className="mb-4 mt-8" style={{ fontSize: '18px' }}>Management</h3>
                <div className="card" style={{ padding: 0, border: '1.5px solid #EEE', boxShadow: 'none' }}>
                    <div className="flex items-center gap-4" style={{ padding: '18px', borderBottom: '1px solid #EEE', cursor: 'pointer' }}>
                        <Calendar size={20} color="var(--primary)" />
                        <span style={{ flex: 1, fontWeight: '600' }}>Update Availability</span>
                        <ArrowUpRight size={16} color="#999" />
                    </div>
                    <div className="flex items-center gap-4" style={{ padding: '18px', borderBottom: '1px solid #EEE', cursor: 'pointer' }}>
                        <Users size={20} color="var(--primary)" />
                        <span style={{ flex: 1, fontWeight: '600' }}>Student List</span>
                        <ArrowUpRight size={16} color="#999" />
                    </div>
                    <div className="flex items-center gap-4" style={{ padding: '18px', cursor: 'pointer' }}>
                        <IndianRupee size={20} color="var(--primary)" />
                        <span style={{ flex: 1, fontWeight: '600' }}>Request Payout</span>
                        <ArrowUpRight size={16} color="#999" />
                    </div>
                </div>

                <div style={{ marginTop: '40px' }}>
                    <button className="btn btn-outline" style={{ border: '1.5px solid #DDD' }} onClick={() => navigate('/profile')}>Switch to Student View</button>
                </div>
            </div>
        </MobileLayout>
    );
}
