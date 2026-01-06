import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload, CheckCircle, AlertCircle, FileText, Check } from 'lucide-react';
import { useData } from '../../context/DataContext';

export default function MentorApplication() {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        name: '',
        previousRole: '',
        experienceYears: '',
        expertise: []
    });
    const [uploading, setUploading] = useState({ id: false, exp: false });
    const [files, setFiles] = useState({ id: null, exp: null });
    const [error, setError] = useState('');

    const navigate = useNavigate();
    const { applyAsMentor } = useData();

    const handleNext = () => {
        if (!formData.name || !formData.previousRole || !formData.experienceYears || formData.expertise.length === 0) {
            setError('Please fill all fields and select at least one expertise.');
            return;
        }
        if (parseInt(formData.experienceYears) < 15) {
            setError('Minimum 15 years of professional experience is mandatory.');
            return;
        }
        setError('');
        setStep(2);
    };

    const simulateUpload = (type) => {
        setUploading(prev => ({ ...prev, [type]: true }));
        setTimeout(() => {
            setUploading(prev => ({ ...prev, [type]: false }));
            setFiles(prev => ({ ...prev, [type]: 'document_uploaded.pdf' }));
        }, 2000);
    };

    const handleSubmit = () => {
        if (!files.id || !files.exp) {
            setError('Please upload both identity and experience proofs.');
            return;
        }
        applyAsMentor(formData);
        setStep(3);
    };

    const toggleExpertise = (ex) => {
        setError('');
        setFormData(prev => ({
            ...prev,
            expertise: prev.expertise.includes(ex)
                ? prev.expertise.filter(e => e !== ex)
                : [...prev.expertise, ex]
        }));
    };

    return (
        <div className="container" style={{ paddingTop: '20px', paddingBottom: '40px' }}>
            <header style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
                <ArrowLeft onClick={() => navigate(-1)} style={{ cursor: 'pointer' }} />
                <img src="/GuruvaniLogo(black).PNG" alt="GuruVani" style={{ width: '100px' }} />
            </header>

            {step === 1 && (
                <div>
                    <h2 style={{ fontSize: '24px', fontWeight: '800', color: 'var(--primary)', marginBottom: '8px' }}>Expert Onboarding</h2>
                    <p style={{ color: '#666', fontSize: '14px', marginBottom: '24px' }}>Join our elite circle of mentors. (Min. 15 years exp. required)</p>

                    <div className="mt-4">
                        {error && (
                            <div style={{ background: '#FEF2F2', border: '1px solid #FEE2E2', color: '#B91C1C', padding: '12px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px', fontSize: '13px' }}>
                                <AlertCircle size={16} />
                                {error}
                            </div>
                        )}

                        <div className="input-group">
                            <label style={{ fontWeight: '700', fontSize: '13px' }}>FULL NAME</label>
                            <input
                                type="text"
                                placeholder="Enter your full name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                style={{ borderRadius: '10px', padding: '14px' }}
                            />
                        </div>
                        <div className="input-group">
                            <label style={{ fontWeight: '700', fontSize: '13px' }}>CURRENT/LAST DESIGNATION</label>
                            <input
                                type="text"
                                placeholder="e.g. Chief Technical Officer, Infosys"
                                value={formData.previousRole}
                                onChange={(e) => setFormData({ ...formData, previousRole: e.target.value })}
                                style={{ borderRadius: '10px', padding: '14px' }}
                            />
                        </div>
                        <div className="input-group">
                            <label style={{ fontWeight: '700', fontSize: '13px' }}>TOTAL EXPERIENCE (YEARS)</label>
                            <input
                                type="number"
                                placeholder="Min. 15 required"
                                value={formData.experienceYears}
                                onChange={(e) => setFormData({ ...formData, experienceYears: e.target.value })}
                                style={{ borderRadius: '10px', padding: '14px' }}
                            />
                        </div>
                        <div className="input-group">
                            <label style={{ fontWeight: '700', fontSize: '13px', marginBottom: '12px', display: 'block' }}>PRIMARY EXPERTISE</label>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '10px' }}>
                                {['UPSC / KPSC', 'Banking Exams', 'Other Government Exams', 'Career Guidance'].map(ex => (
                                    <div
                                        key={ex}
                                        style={{
                                            display: 'flex', alignItems: 'center', gap: '12px', padding: '16px',
                                            background: formData.expertise.includes(ex) ? '#F0F7FF' : 'white',
                                            border: '1.5px solid',
                                            borderColor: formData.expertise.includes(ex) ? 'var(--primary)' : '#EEE',
                                            borderRadius: '12px', cursor: 'pointer', transition: 'all 0.2s'
                                        }}
                                        onClick={() => toggleExpertise(ex)}
                                    >
                                        <div style={{
                                            width: '20px', height: '20px', borderRadius: '4px', border: '2px solid',
                                            borderColor: formData.expertise.includes(ex) ? 'var(--primary)' : '#DDD',
                                            background: formData.expertise.includes(ex) ? 'var(--primary)' : 'transparent',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center'
                                        }}>
                                            {formData.expertise.includes(ex) && <Check size={14} color="white" />}
                                        </div>
                                        <span style={{ fontSize: '14px', fontWeight: formData.expertise.includes(ex) ? '700' : '500' }}>{ex}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <button className="btn btn-primary mt-10" onClick={handleNext} style={{ height: '56px', fontSize: '16px' }}>Proceed to Verification</button>
                    </div>
                </div>
            )}

            {step === 2 && (
                <div>
                    <h2 style={{ fontSize: '24px', fontWeight: '800', color: 'var(--primary)', marginBottom: '8px' }}>Security Verification</h2>
                    <p style={{ color: '#666', fontSize: '14px', marginBottom: '32px' }}>We manually verify identity and experience docs to maintain the highest trust.</p>

                    {error && (
                        <div style={{ background: '#FEF2F2', border: '1px solid #FEE2E2', color: '#B91C1C', padding: '12px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px', fontSize: '13px' }}>
                            <AlertCircle size={16} />
                            {error}
                        </div>
                    )}

                    <div className="card" style={{ border: '2px dashed #DDD', textAlign: 'center', padding: '40px', background: '#F9FAFB', borderRadius: '16px' }}>
                        {files.id ? (
                            <div className="flex flex-col items-center">
                                <FileText size={40} color="#16A34A" />
                                <p className="mt-2" style={{ fontWeight: '600', color: '#16A34A' }}>Aadhar/PAN Card Uploaded</p>
                                <button className="btn btn-outline mt-3" style={{ height: '32px', padding: '0 12px', fontSize: '12px' }} onClick={() => setFiles(prev => ({ ...prev, id: null }))}>Change</button>
                            </div>
                        ) : uploading.id ? (
                            <div className="flex flex-col items-center w-full">
                                <div style={{ width: '40px', height: '40px', border: '4px solid #F3F3F3', borderTop: '4px solid var(--primary)', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
                                <p className="mt-4" style={{ fontSize: '14px', color: '#666' }}>Securely uploading identity proof...</p>
                            </div>
                        ) : (
                            <div onClick={() => simulateUpload('id')} style={{ cursor: 'pointer' }}>
                                <Upload size={40} color="var(--primary)" style={{ opacity: 0.6 }} />
                                <h4 className="mt-4" style={{ fontSize: '16px' }}>Identity Proof</h4>
                                <p style={{ fontSize: '13px', color: '#888' }}>Tap to upload Aadhar / PAN Card</p>
                            </div>
                        )}
                    </div>

                    <div className="card mt-6" style={{ border: '2px dashed #DDD', textAlign: 'center', padding: '40px', background: '#F9FAFB', borderRadius: '16px' }}>
                        {files.exp ? (
                            <div className="flex flex-col items-center">
                                <FileText size={40} color="#16A34A" />
                                <p className="mt-2" style={{ fontWeight: '600', color: '#16A34A' }}>Experience Proof Uploaded</p>
                                <button className="btn btn-outline mt-3" style={{ height: '32px', padding: '0 12px', fontSize: '12px' }} onClick={() => setFiles(prev => ({ ...prev, exp: null }))}>Change</button>
                            </div>
                        ) : uploading.exp ? (
                            <div className="flex flex-col items-center w-full">
                                <div style={{ width: '40px', height: '40px', border: '4px solid #F3F3F3', borderTop: '4px solid var(--primary)', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
                                <p className="mt-4" style={{ fontSize: '14px', color: '#666' }}>Securely uploading experience proof...</p>
                            </div>
                        ) : (
                            <div onClick={() => simulateUpload('exp')} style={{ cursor: 'pointer' }}>
                                <Upload size={40} color="var(--primary)" style={{ opacity: 0.6 }} />
                                <h4 className="mt-4" style={{ fontSize: '16px' }}>Professional Proof</h4>
                                <p style={{ fontSize: '13px', color: '#888' }}>Tap to upload ID Card or Certificate</p>
                            </div>
                        )}
                    </div>

                    <p className="mt-8" style={{ fontSize: '12px', color: '#666', textAlign: 'center', fontWeight: '500' }}>
                        By submitting, you agree to our <span style={{ color: 'var(--primary)', fontWeight: '700' }}>Terms of Service</span> for mentors.
                    </p>

                    <button
                        className="btn btn-primary mt-6"
                        onClick={handleSubmit}
                        disabled={uploading.id || uploading.exp}
                        style={{ height: '56px', fontSize: '16px' }}
                    >
                        Submit Final Application
                    </button>
                </div>
            )}

            {step === 3 && (
                <div style={{ textAlign: 'center', paddingTop: '60px' }}>
                    <div style={{ width: '100px', height: '100px', background: '#DCFCE7', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 32px' }}>
                        <CheckCircle size={60} color="#16A34A" />
                    </div>
                    <h2 style={{ fontSize: '28px', fontWeight: '800', color: 'var(--primary)' }}>Application Received</h2>
                    <p className="mt-4" style={{ color: '#666', lineHeight: '1.6', fontSize: '16px' }}>Our verification team will review your <b>{formData.experienceYears} years</b> of experience. Check back in 24-48 hours.</p>
                    <button className="btn btn-primary mt-12" onClick={() => navigate('/profile')} style={{ height: '56px' }}>Back to Profile</button>
                </div>
            )}

            <style>{`
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
}
