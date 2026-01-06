import React, { useState } from 'react';
import { Users, UserCheck, Calendar, IndianRupee, Bell, ShieldCheck, CheckCircle2, XCircle } from 'lucide-react';
import { useData } from '../../context/DataContext';

export default function AdminDashboard() {
    const [activeView, setActiveView] = useState('overview');
    const { mentors, applications, approveMentor, rejectMentor, sessions } = useData();

    return (
        <div style={{ display: 'flex', minHeight: '100vh', background: '#F8F9FA' }}>
            {/* Sidebar */}
            <div style={{ width: '260px', background: 'var(--primary)', color: 'white', padding: '32px 24px', display: 'flex', flexDirection: 'column' }}>
                <div style={{ marginBottom: '48px', textAlign: 'center' }}>
                    <img src="/GuruvaniLogo(white).PNG" alt="GuruVani" style={{ width: '120px', marginBottom: '16px' }} />
                    <p style={{ fontSize: '12px', color: 'var(--accent)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px' }}>Admin Portal</p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', flex: 1 }}>
                    <SidebarItem
                        active={activeView === 'overview'}
                        onClick={() => setActiveView('overview')}
                        icon={<Users size={18} />}
                        label="Dashboard"
                    />
                    <SidebarItem
                        active={activeView === 'approvals'}
                        onClick={() => setActiveView('approvals')}
                        icon={<ShieldCheck size={18} />}
                        label="Mentor Approvals"
                        badge="2"
                    />
                    <SidebarItem icon={<Calendar size={18} />} label="All Sessions" disabled />
                    <SidebarItem icon={<IndianRupee size={18} />} label="Payouts" disabled />
                </div>

                <div style={{ paddingTop: '24px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                    <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)' }}>v1.0.0 Stable</p>
                </div>
            </div>

            {/* Main Content */}
            <div style={{ flex: 1, padding: '40px', overflowY: 'auto' }}>
                <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
                    <div>
                        <h2 style={{ fontSize: '28px', color: 'var(--primary)', fontWeight: '700' }}>
                            {activeView === 'overview' ? 'Operational Overview' : 'Pending Mentor Verifications'}
                        </h2>
                        <p style={{ fontSize: '14px', color: '#666', marginTop: '4px' }}>Welcome back, System Administrator</p>
                    </div>
                    <div className="flex items-center gap-6">
                        <div style={{ position: 'relative', cursor: 'pointer' }}>
                            <Bell size={22} color="var(--primary)" />
                            <div style={{ position: 'absolute', top: '-2px', right: '-2px', width: '8px', height: '8px', background: 'red', borderRadius: '50%', border: '2px solid white' }}></div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '6px 12px', background: 'white', borderRadius: '30px', border: '1.5px solid #EEE' }}>
                            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 'bold' }}>AD</div>
                            <span style={{ fontSize: '14px', fontWeight: '600' }}>Admin</span>
                        </div>
                    </div>
                </header>

                {activeView === 'overview' ? (
                    <div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px', marginBottom: '48px' }}>
                            <StatCard icon={<Users color="var(--primary)" />} label="Active Students" value="1,240" />
                            <StatCard icon={<UserCheck color="#16A34A" />} label="Verified Mentors" value={mentors.length} />
                            <StatCard icon={<Calendar color="#D97706" />} label="Total Sessions" value={sessions.length} />
                            <StatCard icon={<IndianRupee color="#DB2777" />} label="Platform Revenue" value={`₹${sessions.length * 50}`} />
                        </div>

                        <div className="card" style={{ border: '1.5px solid #EEE', boxShadow: 'none' }}>
                            <h3 style={{ fontSize: '18px', marginBottom: '20px' }}>Recent Platform Activity</h3>
                            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                <thead>
                                    <tr style={{ textAlign: 'left', borderBottom: '2px solid #F8F9FA', color: '#888', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                        <th style={{ padding: '16px 0' }}>Student Name</th>
                                        <th>Mentor Assigned</th>
                                        <th>Session Date</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr style={{ borderBottom: '1px solid #F8F9FA', fontSize: '14px' }}>
                                        <td style={{ padding: '20px 0', fontWeight: '600' }}>Arjun K.</td>
                                        <td>Dr. Ramesh Kumar</td>
                                        <td>Jan 06, 2026</td>
                                        <td>
                                            <span style={{ color: '#16A34A', background: '#DCFCE7', padding: '4px 12px', borderRadius: '20px', fontSize: '11px', fontWeight: '700' }}>COMPLETED</span>
                                        </td>
                                    </tr>
                                    <tr style={{ borderBottom: '1px solid #F8F9FA', fontSize: '14px' }}>
                                        <td style={{ padding: '20px 0', fontWeight: '600' }}>Priya S.</td>
                                        <td>Sushma Hegde</td>
                                        <td>Jan 07, 2026</td>
                                        <td>
                                            <span style={{ color: '#F4A340', background: '#FFF7ED', padding: '4px 12px', borderRadius: '20px', fontSize: '11px', fontWeight: '700' }}>UPCOMING</span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                ) : (
                    <div style={{ display: 'grid', gap: '20px' }}>
                        {applications.length === 0 ? (
                            <div className="card text-center text-muted">No pending applications at the moment.</div>
                        ) : applications.map(m => (
                            <div key={m.id} className="card flex justify-between items-center" style={{ border: '1.5px solid #EEE', boxShadow: 'none' }}>
                                <div>
                                    <h3 style={{ margin: 0, fontSize: '16px' }}>{m.name}</h3>
                                    <p style={{ margin: '4px 0 0', fontSize: '13px', color: '#666' }}>{m.previousRole} • <span style={{ color: 'var(--primary)', fontWeight: '600' }}>Pending</span></p>
                                    <p style={{ margin: '4px 0 0', fontSize: '11px', color: '#999' }}>Applied on {m.appliedAt}</p>
                                </div>
                                <div className="flex gap-3">
                                    <button className="btn btn-outline" style={{ width: 'auto', padding: '10px 20px', fontSize: '13px', border: '1.5px solid #EEE' }}>View Documents</button>
                                    <button
                                        className="btn btn-primary"
                                        style={{ width: 'auto', padding: '10px 24px', fontSize: '13px', background: '#16A34A', border: 'none' }}
                                        onClick={() => approveMentor(m.id)}
                                    >
                                        <CheckCircle2 size={16} style={{ marginRight: '6px' }} /> Approve
                                    </button>
                                    <button
                                        className="btn btn-outline"
                                        style={{ width: 'auto', padding: '10px 16px', fontSize: '13px', color: '#EF4444', borderColor: '#FEE2E2', background: '#FEF2F2' }}
                                        onClick={() => rejectMentor(m.id)}
                                    >
                                        <XCircle size={16} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

function SidebarItem({ icon, label, active, onClick, badge, disabled }) {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            style={{
                background: active ? 'rgba(255,255,255,0.15)' : 'transparent',
                border: 'none',
                color: 'white',
                padding: '14px 16px',
                textAlign: 'left',
                borderRadius: '10px',
                cursor: disabled ? 'default' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                transition: 'all 0.2s',
                opacity: disabled ? 0.4 : 1,
                fontSize: '14px',
                fontWeight: active ? '700' : '500'
            }}
        >
            {icon}
            <span style={{ flex: 1 }}>{label}</span>
            {badge && (
                <span style={{ background: 'var(--accent)', color: 'var(--primary)', padding: '2px 8px', borderRadius: '10px', fontSize: '11px', fontWeight: '800' }}>
                    {badge}
                </span>
            )}
        </button>
    );
}

function StatCard({ icon, label, value }) {
    return (
        <div className="card" style={{ margin: 0, padding: '24px', border: '1.5px solid #EEE', boxShadow: 'none', background: 'white' }}>
            <div style={{ marginBottom: '16px', background: '#F8F9FA', width: '40px', height: '40px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {icon}
            </div>
            <p style={{ margin: 0, fontSize: '13px', fontWeight: '600', color: '#666' }}>{label}</p>
            <h2 style={{ margin: '4px 0 0', fontSize: '24px', color: 'var(--primary)', fontWeight: '800' }}>{value}</h2>
        </div>
    );
}
