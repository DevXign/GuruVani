import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, Calendar as CalendarIcon, Video, Phone } from 'lucide-react';
import { useData } from '../../context/DataContext';

const DATES = [
    { day: 'Wed', date: '07', full: '2026-01-07' },
    { day: 'Thu', date: '08', full: '2026-01-08' },
    { day: 'Fri', date: '09', full: '2026-01-09' },
    { day: 'Sat', date: '10', full: '2026-01-10' },
    { day: 'Sun', date: '11', full: '2026-01-11' },
];

const SLOTS = ['10:00 AM', '11:30 AM', '02:00 PM', '04:30 PM', '06:00 PM', '08:00 PM'];

export default function Booking() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { mentors } = useData();
    const mentor = mentors.find(m => m.id === id);

    const [selectedDate, setSelectedDate] = useState(DATES[0].full);
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [mode, setMode] = useState('audio'); // audio | video

    if (!mentor) return <div>Mentor not found</div>;

    return (
        <div className="container" style={{ paddingTop: '20px' }}>
            <header style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                <ArrowLeft onClick={() => navigate(-1)} />
                <h1>Book a Session</h1>
            </header>

            <div className="card" style={{ display: 'flex', gap: '16px', alignItems: 'center', border: 'none', background: '#F8F9FA' }}>
                <img src={mentor.image} style={{ width: '60px', height: '60px', borderRadius: '50%' }} />
                <div>
                    <h3 style={{ margin: 0 }}>{mentor.name}</h3>
                    <p style={{ margin: 0, fontSize: '13px' }}>₹{mentor.price30min} for 30 mins</p>
                </div>
            </div>

            <div className="mt-4">
                <h3 style={{ fontSize: '16px' }}>Select Date</h3>
                <div style={{ display: 'flex', gap: '12px', overflowX: 'auto', padding: '12px 0' }}>
                    {DATES.map((d) => (
                        <div
                            key={d.full}
                            onClick={() => setSelectedDate(d.full)}
                            style={{
                                minWidth: '65px',
                                padding: '14px 10px',
                                borderRadius: '12px',
                                textAlign: 'center',
                                background: selectedDate === d.full ? 'var(--primary)' : 'white',
                                color: selectedDate === d.full ? 'white' : 'var(--text-main)',
                                border: '1.5px solid',
                                borderColor: selectedDate === d.full ? 'var(--primary)' : '#EEE',
                                cursor: 'pointer',
                                transition: 'all 0.2s'
                            }}
                        >
                            <div style={{ fontSize: '11px', fontWeight: '500', marginBottom: '4px', textTransform: 'uppercase', opacity: 0.8 }}>{d.day}</div>
                            <div style={{ fontSize: '20px', fontWeight: '800' }}>{d.date}</div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="mt-4">
                <h3 style={{ fontSize: '16px' }}>Select Time Slot</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginTop: '12px' }}>
                    {SLOTS.map((slot) => (
                        <div
                            key={slot}
                            onClick={() => setSelectedSlot(slot)}
                            style={{
                                padding: '12px 4px',
                                borderRadius: '8px',
                                textAlign: 'center',
                                background: selectedSlot === slot ? 'var(--accent)' : 'white',
                                border: '1.5px solid',
                                borderColor: selectedSlot === slot ? 'var(--accent)' : '#EEE',
                                fontSize: '13px',
                                fontWeight: '700',
                                color: selectedSlot === slot ? 'var(--primary)' : 'var(--text-main)',
                                cursor: 'pointer',
                                transition: 'all 0.2s'
                            }}
                        >
                            {slot}
                        </div>
                    ))}
                </div>
            </div>

            <div className="mt-6">
                <h3 style={{ fontSize: '16px' }}>Session Mode</h3>
                <div style={{ display: 'flex', gap: '16px', marginTop: '12px' }}>
                    <div
                        onClick={() => setMode('audio')}
                        style={{
                            flex: 1, padding: '16px', borderRadius: '12px',
                            border: '2px solid',
                            borderColor: mode === 'audio' ? 'var(--primary)' : '#F0F0F0',
                            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
                            background: mode === 'audio' ? 'white' : '#FAFAFA',
                            cursor: 'pointer'
                        }}
                    >
                        <Phone size={24} color={mode === 'audio' ? 'var(--primary)' : '#999'} />
                        <span style={{ fontSize: '14px', fontWeight: '700', color: mode === 'audio' ? 'var(--primary)' : '#666' }}>Audio Call</span>
                    </div>
                    <div
                        onClick={() => setMode('video')}
                        style={{
                            flex: 1, padding: '16px', borderRadius: '12px',
                            border: '2px solid',
                            borderColor: mode === 'video' ? 'var(--primary)' : '#F0F0F0',
                            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
                            background: mode === 'video' ? 'white' : '#FAFAFA',
                            cursor: 'pointer'
                        }}
                    >
                        <Video size={24} color={mode === 'video' ? 'var(--primary)' : '#999'} />
                        <span style={{ fontSize: '14px', fontWeight: '700', color: mode === 'video' ? 'var(--primary)' : '#666' }}>Video Call</span>
                    </div>
                </div>
            </div>

            <div style={{ marginTop: '40px', paddingBottom: '40px' }}>
                <button
                    className="btn btn-primary"
                    disabled={!selectedSlot}
                    style={{ opacity: selectedSlot ? 1 : 0.5 }}
                    onClick={() => navigate('/payment', { state: { mentor, date: selectedDate, time: selectedSlot, mode } })}
                >
                    Proceed to Payment
                </button>
            </div>
        </div>
    );
}
