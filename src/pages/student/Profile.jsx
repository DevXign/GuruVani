import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Settings, LogOut, HelpCircle, FileText, LayoutDashboard, ArrowUpRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import MobileLayout from '../../components/layout/MobileLayout';

export default function Profile() {
    const { user, logout, login } = useAuth();
    const navigate = useNavigate();

    const handleSwitchRoll = (role) => {
        login({ ...user, role });
        if (role === 'mentor') navigate('/mentor/dashboard');
        if (role === 'admin') navigate('/admin');
        if (role === 'student') navigate('/mentors');
    };

    return (
        <MobileLayout>
            <div className="container" style={{ paddingTop: '20px' }}>
                <h1 className="mb-4">My Profile</h1>

                <div className="card text-center">
                    <div style={{
                        width: '80px', height: '80px', borderRadius: '50%', background: 'var(--primary)',
                        color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '32px', margin: '0 auto 12px'
                    }}>
                        {user?.name?.charAt(0) || 'U'}
                    </div>
                    <h2 className="mb-1">{user?.name || 'Guest User'}</h2>
                    <p>{user?.phone}</p>
                    <div style={{
                        display: 'inline-block', background: '#E0E7FF', color: '#4338CA',
                        padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: '700', marginTop: '8px',
                        textTransform: 'uppercase'
                    }}>
                        {user?.role}
                    </div>
                </div>

                <div className="mt-4">
                    <div className="card" style={{ padding: '0', border: '1.5px solid #EEE' }}>
                        {user?.role === 'student' && (
                            <div className="flex items-center gap-4" style={{ padding: '18px', borderBottom: '1px solid #EEE', cursor: 'pointer' }} onClick={() => navigate('/mentor/apply')}>
                                <FileText size={20} color="var(--primary)" />
                                <span style={{ flex: 1, fontWeight: '600' }}>Become a Mentor</span>
                                <div style={{ background: 'var(--accent)', color: 'var(--primary)', padding: '2px 8px', borderRadius: '4px', fontSize: '10px', fontWeight: '800' }}>APPLY</div>
                            </div>
                        )}

                        {user?.role === 'mentor' && (
                            <div className="flex items-center gap-4" style={{ padding: '18px', borderBottom: '1px solid #EEE', cursor: 'pointer' }} onClick={() => navigate('/mentor/dashboard')}>
                                <LayoutDashboard size={20} color="var(--primary)" />
                                <span style={{ flex: 1, fontWeight: '600' }}>Mentor Dashboard</span>
                                <ArrowUpRight size={16} color="#999" />
                            </div>
                        )}

                        <div className="flex items-center gap-4" style={{ padding: '18px', borderBottom: '1px solid #EEE', cursor: 'pointer' }}>
                            <HelpCircle size={20} color="#666" />
                            <span style={{ flex: 1, fontWeight: '600' }}>Support & Help</span>
                        </div>

                        <div className="flex items-center gap-4" style={{ padding: '18px', color: '#EB4D4B', cursor: 'pointer' }} onClick={() => { logout(); navigate('/login'); }}>
                            <LogOut size={20} />
                            <span style={{ flex: 1, fontWeight: '600' }}>Logout</span>
                        </div>
                    </div>
                </div>

                {/* Demo Control - For Startup MVP Presentation */}
                <div className="mt-8">
                    <p style={{ fontSize: '11px', color: '#999', fontWeight: '600', marginBottom: '8px', textTransform: 'uppercase' }}>Management Console (MVP Only)</p>
                    <div className="flex gap-2">
                        <button className="btn btn-outline" style={{ flex: 1, fontSize: '11px', padding: '10px' }} onClick={() => handleSwitchRoll('student')}>Student View</button>
                        <button className="btn btn-outline" style={{ flex: 1, fontSize: '11px', padding: '10px' }} onClick={() => handleSwitchRoll('mentor')}>Mentor View</button>
                        <button className="btn btn-outline" style={{ flex: 1, fontSize: '11px', padding: '10px' }} onClick={() => handleSwitchRoll('admin')}>Admin View</button>
                    </div>
                </div>

                <p className="text-center mt-6" style={{ fontSize: '12px', color: '#CCC' }}>GuruVani v1.0.0 Stable Build</p>
            </div>
        </MobileLayout>
    );
}
