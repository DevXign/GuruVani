import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, ShieldCheck, Clock, CheckCircle2 } from 'lucide-react';
import { useData } from '../../context/DataContext';

export default function MentorProfile() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { mentors } = useData();
    const mentor = mentors.find(m => m.id === id);

    if (!mentor) return <div>Mentor not found</div>;

    return (
        <div className="container" style={{ padding: 0, paddingBottom: '100px' }}>
            {/* Header Sticky */}
            <div style={{
                position: 'sticky', top: 0, background: 'white', padding: '16px 20px',
                display: 'flex', alignItems: 'center', gap: '16px', zIndex: 10,
                boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
            }}>
                <ArrowLeft onClick={() => navigate(-1)} style={{ cursor: 'pointer' }} />
                <h2 style={{ fontSize: '18px', margin: 0 }}>Mentor Details</h2>
            </div>

            <div style={{ padding: '20px' }}>
                <div style={{ display: 'flex', gap: '20px', marginBottom: '24px' }}>
                    <img
                        src={mentor.image}
                        alt={mentor.name}
                        style={{ width: '90px', height: '90px', borderRadius: '50%', objectFit: 'cover' }}
                    />
                    <div>
                        <div className="flex items-center gap-1 mb-1">
                            <h1 style={{ fontSize: '20px', margin: 0 }}>{mentor.name}</h1>
                            <CheckCircle2 size={16} color="#1E2A44" fill="#F4A340" />
                        </div>
                        <p style={{ fontWeight: '600', color: 'var(--primary)', marginBottom: '4px', fontSize: '14px' }}>{mentor.previousRole}</p>
                        <div style={{ display: 'flex', gap: '12px' }}>
                            <div className="flex items-center gap-1">
                                <Star size={14} color="var(--accent)" fill="var(--accent)" />
                                <span style={{ fontSize: '13px', fontWeight: '700' }}>{mentor.rating}</span>
                                <span style={{ fontSize: '12px', color: '#666' }}>({mentor.totalSessions} sessions)</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card" style={{ background: '#F8F9FA', border: '1px solid #EEE' }}>
                    <h3 style={{ marginBottom: '8px', fontSize: '15px' }}>Professional Bio</h3>
                    <p style={{ fontSize: '14px', lineHeight: '1.6', color: '#444' }}>{mentor.bio}</p>
                </div>

                <div className="mt-6">
                    <h3 style={{ marginBottom: '12px', fontSize: '15px' }}>Areas of Expertise</h3>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                        {mentor.expertise.map(exp => (
                            <span key={exp} style={{
                                background: '#E3F2FD',
                                color: 'var(--primary)', padding: '6px 14px', borderRadius: '20px',
                                fontSize: '12px', fontWeight: '600'
                            }}>
                                {exp}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="mt-8">
                    <div className="flex items-start gap-3 p-4" style={{ background: '#F0FDF4', borderRadius: '12px' }}>
                        <ShieldCheck size={20} color="#16A34A" style={{ marginTop: '2px' }} />
                        <div>
                            <h4 style={{ fontSize: '14px', color: '#16A34A', marginBottom: '2px' }}>Verified Profile</h4>
                            <p style={{ fontSize: '12px', color: '#16A34A', opacity: 0.8 }}>Identity and professional experience documents have been manually verified by GuruVani admin team.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div style={{
                position: 'fixed', bottom: 0, left: 0, right: 0,
                padding: '16px 20px', background: 'white', borderTop: '1px solid #EEE',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                zIndex: 100
            }}>
                <div>
                    <p style={{ fontSize: '12px', marginBottom: '2px', color: '#666' }}>Session (30 mins)</p>
                    <span style={{ fontSize: '20px', fontWeight: '800', color: 'var(--primary)' }}>₹{mentor.price30min}</span>
                </div>
                <button
                    className="btn btn-primary"
                    style={{ width: 'auto', paddingLeft: '40px', paddingRight: '40px' }}
                    onClick={() => navigate(`/booking/${mentor.id}`)}
                >
                    Proceed to Booking
                </button>
            </div>
        </div>
    );
}
