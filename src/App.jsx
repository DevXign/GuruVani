import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { DataProvider } from './context/DataContext';

// Pages
import Splash from './pages/common/Splash';
import Login from './pages/common/Login';
import LanguageSelection from './pages/common/LanguageSelection';
import GoalSelection from './pages/common/GoalSelection';
import MentorList from './pages/student/MentorList';
import MentorProfile from './pages/student/MentorProfile';
import Booking from './pages/student/Booking';
import Payment from './pages/student/Payment';
import SessionList from './pages/student/SessionList';
import Review from './pages/student/Review';
import Profile from './pages/student/Profile';
import MentorApplication from './pages/mentor/MentorApplication';
import MentorDashboard from './pages/mentor/MentorDashboard';
import AdminDashboard from './pages/admin/AdminDashboard';
import Placeholder from './pages/common/Placeholder';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div>Loading...</div>;
  return user ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Splash />} />
            <Route path="/login" element={<Login />} />
            <Route path="/language-selection" element={<LanguageSelection />} />
            <Route path="/goal-selection" element={<GoalSelection />} />

            {/* Student Routes */}
            <Route path="/mentors" element={<PrivateRoute><MentorList /></PrivateRoute>} />
            <Route path="/mentors/:id" element={<PrivateRoute><MentorProfile /></PrivateRoute>} />
            <Route path="/booking/:id" element={<PrivateRoute><Booking /></PrivateRoute>} />
            <Route path="/payment" element={<PrivateRoute><Payment /></PrivateRoute>} />
            <Route path="/sessions" element={<PrivateRoute><SessionList /></PrivateRoute>} />
            <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
            <Route path="/review" element={<PrivateRoute><Review /></PrivateRoute>} />

            {/* Mentor Routes */}
            <Route path="/mentor/apply" element={<PrivateRoute><MentorApplication /></PrivateRoute>} />
            <Route path="/mentor/dashboard" element={<PrivateRoute><MentorDashboard /></PrivateRoute>} />

            {/* Admin Routes */}
            <Route path="/admin" element={<PrivateRoute><AdminDashboard /></PrivateRoute>} />
          </Routes>
        </Router>
      </DataProvider>
    </AuthProvider>
  );
}

export default App;
