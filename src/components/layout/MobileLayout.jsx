import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Calendar, User, MessageSquare } from 'lucide-react';

export default function MobileLayout({ children }) {
    return (
        <div style={{ paddingBottom: '80px', flex: 1 }}>
            {children}

            <nav style={{
                position: 'fixed',
                bottom: 0,
                left: 0,
                right: 0,
                background: 'white',
                display: 'flex',
                justifyContent: 'space-around',
                padding: '12px 0',
                boxShadow: '0 -2px 10px rgba(0,0,0,0.05)',
                borderTop: '1px solid #EEE',
                zIndex: 100
            }}>
                <NavLink to="/mentors" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                    <Home size={24} />
                    <span>Home</span>
                </NavLink>
                <NavLink to="/sessions" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                    <Calendar size={24} />
                    <span>Sessions</span>
                </NavLink>
                <NavLink to="/profile" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                    <User size={24} />
                    <span>Profile</span>
                </NavLink>
            </nav>

            <style>{`
        .nav-link {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-decoration: none;
          color: #999;
          font-size: 12px;
          gap: 4px;
        }
        .nav-link.active {
          color: var(--primary);
        }
        .nav-link span { font-weight: 500; }
      `}</style>
        </div>
    );
}
