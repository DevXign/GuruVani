export const MOCK_USERS = [
  { id: '1', name: 'Admin User', phone: '9900000000', role: 'admin', language: 'en', createdAt: new Date() },
  { id: '2', name: 'Student One', phone: '9800000000', role: 'student', language: 'kn', createdAt: new Date() },
  { id: '3', name: 'Mentor One', phone: '9700000000', role: 'mentor', language: 'en', createdAt: new Date() },
];

export const MOCK_MENTORS = [
  {
    id: 'm1',
    userId: '3',
    name: 'Dr. Ramesh Kumar',
    bio: 'Retired IAS Officer with 30 years of experience in public administration.',
    experienceYears: 30,
    previousRole: 'Additional Chief Secretary',
    expertise: ['UPSC', 'Govt Exams'],
    status: 'approved',
    price30min: 500,
    rating: 4.9,
    totalSessions: 120,
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop'
  },
  {
    id: 'm2',
    name: 'Sushma Hegde',
    bio: 'Bank PO specialized in IBPS and SBI exams training.',
    experienceYears: 8,
    previousRole: 'Senior Manager, SBI',
    expertise: ['Banking', 'Interview'],
    status: 'approved',
    price30min: 300,
    rating: 4.7,
    totalSessions: 45,
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop'
  }
];

export const MOCK_SESSIONS = [
  {
    id: 's1',
    studentId: '2',
    mentorId: 'm1',
    date: '2026-01-10',
    time: '10:00 AM',
    duration: '30 min',
    mode: 'audio',
    price: 500,
    status: 'upcoming',
    meetingLink: 'https://meet.jit.si/guruvani-s1'
  }
];
