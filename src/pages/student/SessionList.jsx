import React, { useState } from 'react';
import { Video, Phone, Calendar, Clock, ChevronRight } from 'lucide-react';
import MobileLayout from '../../components/layout/MobileLayout';
import { useData } from '../../context/DataContext';

export default function SessionList() {
    const [activeTab, setActiveTab] = useState('upcoming');
    const { sessions, mentors } = useData();

    const getMentor = (id) => mentors.find(m => m.id === id);

    const filteredSessions = sessions.filter(s => s.status === activeTab);

    return (
        <MobileLayout>
            <div className="container" style={{ paddingTop: '20px' }}>
                <h1 className="mb-4">My Sessions</h1>

                <div style={{ display: 'flex', background: '#F0F0F0', padding: '6px', borderRadius: '12px', marginBottom: '24px' }}>
                    <button
                        onClick={() => setActiveTab('upcoming')}
                        style={{
                            flex: 1, padding: '12px', borderRadius: '8px', border: 'none',
                            background: activeTab === 'upcoming' ? 'white' : 'transparent',
                            color: activeTab === 'upcoming' ? 'var(--primary)' : '#666',
                            fontWeight: '700', fontSize: '14px', cursor: 'pointer',
                            boxShadow: activeTab === 'upcoming' ? '0 2px 8px rgba(0,0,0,0.05)' : 'none',
                            transition: 'all 0.2s'
                        }}
                    >
                        Upcoming
                    </button>
                    <button
                        onClick={() => setActiveTab('completed')}
                        style={{
                            flex: 1, padding: '12px', borderRadius: '8px', border: 'none',
                            background: activeTab === 'completed' ? 'white' : 'transparent',
                            color: activeTab === 'completed' ? 'var(--primary)' : '#666',
                            fontWeight: '700', fontSize: '14px', cursor: 'pointer',
                            boxShadow: activeTab === 'completed' ? '0 2px 8px rgba(0,0,0,0.05)' : 'none',
                            transition: 'all 0.2s'
                        }}
                    >
                        Completed
                    </button>
                </div>

                <div>
                    {activeTab === 'upcoming' && filteredSessions.map(session => {
                        const mentor = getMentor(session.mentorId);
                        return (
                            <div key={session.id} className="card" style={{ border: '1.5px solid #F0F0F0', marginBottom: '16px' }}>
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex gap-3 items-center">
                                        <div style={{ background: '#F8F9FA', padding: '10px', borderRadius: '12px', border: '1px solid #EEE' }}>
                                            {session.mode === 'video' ? <Video size={20} color="var(--primary)" /> : <Phone size={20} color="var(--primary)" />}
                                        </div>
                                        <div>
                                            <h3 style={{ fontSize: '16px', margin: 0 }}>{mentor?.name}</h3>
                                            <p style={{ fontSize: '12px', color: '#666' }}>{mentor?.previousRole}</p>
                                        </div>
                                    </div>
                                    <div style={{
                                        background: '#F0FDF4', color: '#16A34A',
                                        padding: '4px 10px', borderRadius: '20px',
                                        fontSize: '11px', fontWeight: '800',
                                        border: '1px solid #DCFCE7'
                                    }}>
                                        CONFIRMED
                                    </div>
                                </div>

                                <div style={{ display: 'flex', gap: '20px', marginBottom: '20px', padding: '12px', background: '#F8F9FA', borderRadius: '8px' }}>
                                    <div className="flex items-center gap-2">
                                        <Calendar size={14} color="var(--primary)" />
                                        <span style={{ fontSize: '13px', fontWeight: '600' }}>{session.date}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Clock size={14} color="var(--primary)" />
                                        <span style={{ fontSize: '13px', fontWeight: '600' }}>{session.time}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span style={{ fontSize: '13px', fontWeight: '600', textTransform: 'capitalize' }}>{session.mode} Call</span>
                                    </div>
                                </div>

                                <div className="flex gap-3">
                                    <button className="btn btn-primary" style={{ flex: 2, height: '48px', fontSize: '14px' }}>Join Session</button>
                                    <button className="btn btn-outline" style={{ flex: 1, height: '48px', fontSize: '14px', border: '1.5px solid #EEE' }}>Help</button>
                                </div>
                            </div>
                        );
                    })}

                    {activeTab === 'completed' && (
                        <div style={{ textAlign: 'center', padding: '60px 20px', color: '#999' }}>
                            <div style={{ background: '#F8F9FA', width: '80px', height: '80px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                                <Calendar size={32} />
                            </div>
                            <p style={{ fontSize: '15px', fontWeight: '500' }}>No completed sessions yet.</p>
                        </div>
                    )}
                </div>
            </div>
        </MobileLayout>
    );
}
