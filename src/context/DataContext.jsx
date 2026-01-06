import React, { createContext, useContext, useState, useEffect } from 'react';
import { MOCK_MENTORS, MOCK_SESSIONS } from '../data/mockData';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [mentors, setMentors] = useState([]);
    const [sessions, setSessions] = useState([]);
    const [applications, setApplications] = useState([]);

    // Initialize from LocalStorage or MockData
    useEffect(() => {
        const storedMentors = localStorage.getItem('gv_mentors');
        const storedSessions = localStorage.getItem('gv_sessions');
        const storedApps = localStorage.getItem('gv_apps');

        if (storedMentors) {
            setMentors(JSON.parse(storedMentors));
        } else {
            setMentors(MOCK_MENTORS);
            localStorage.setItem('gv_mentors', JSON.stringify(MOCK_MENTORS));
        }

        if (storedSessions) {
            setSessions(JSON.parse(storedSessions));
        } else {
            setSessions(MOCK_SESSIONS);
            localStorage.setItem('gv_sessions', JSON.stringify(MOCK_SESSIONS));
        }

        if (storedApps) {
            setApplications(JSON.parse(storedApps));
        }
    }, []);

    // Helper to persist data
    const persist = (key, data) => {
        localStorage.setItem(key, JSON.stringify(data));
    };

    // Actions
    const bookSession = (session) => {
        const newSessions = [...sessions, { ...session, id: `s${Date.now()}`, status: 'upcoming' }];
        setSessions(newSessions);
        persist('gv_sessions', newSessions);
    };

    const applyAsMentor = (appData) => {
        const newApp = { ...appData, id: `app${Date.now()}`, appliedAt: new Date().toISOString().split('T')[0] };
        const newApps = [...applications, newApp];
        setApplications(newApps);
        persist('gv_apps', newApps);
    };

    const approveMentor = (appId) => {
        const app = applications.find(a => a.id === appId);
        if (!app) return;

        // Add to mentors
        const newMentor = {
            id: `m${Date.now()}`,
            name: app.name || 'New Mentor',
            bio: 'Senior Professional',
            experienceYears: app.experienceYears,
            previousRole: app.previousRole,
            expertise: app.expertise || [],
            status: 'approved',
            price30min: 400,
            rating: 5.0,
            totalSessions: 0,
            image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop'
        };

        const newMentors = [...mentors, newMentor];
        setMentors(newMentors);
        persist('gv_mentors', newMentors);

        // Remove from applications
        const newApps = applications.filter(a => a.id !== appId);
        setApplications(newApps);
        persist('gv_apps', newApps);
    };

    const rejectMentor = (appId) => {
        const newApps = applications.filter(a => a.id !== appId);
        setApplications(newApps);
        persist('gv_apps', newApps);
    };

    return (
        <DataContext.Provider value={{
            mentors, sessions, applications,
            bookSession, applyAsMentor, approveMentor, rejectMentor
        }}>
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => useContext(DataContext);
