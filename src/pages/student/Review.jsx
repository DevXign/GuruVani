import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Star, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Review() {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const { mentorName } = location.state || { mentorName: 'your Mentor' };

    return (
        <div className="container" style={{ paddingTop: '20px' }}>
            <header className="flex items-center gap-4 mb-8">
                <ArrowLeft onClick={() => navigate('/sessions')} />
                <h1>Rate Session</h1>
            </header>

            <div className="card text-center">
                <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#EEE', margin: '0 auto 16px' }}></div>
                <h3>How was your session with {mentorName}?</h3>
                <p>Your feedback helps us improve the quality of guidance.</p>

                <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', margin: '24px 0' }}>
                    {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                            key={star}
                            size={32}
                            color={rating >= star ? 'var(--accent)' : '#CCC'}
                            fill={rating >= star ? 'var(--accent)' : 'transparent'}
                            onClick={() => setRating(star)}
                            style={{ cursor: 'pointer' }}
                        />
                    ))}
                </div>

                <div className="input-group" style={{ textAlign: 'left' }}>
                    <label>Any comments?</label>
                    <textarea
                        placeholder="Share your experience..."
                        rows="4"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    ></textarea>
                </div>

                <button
                    className="btn btn-primary"
                    disabled={rating === 0}
                    style={{ opacity: rating === 0 ? 0.5 : 1 }}
                    onClick={() => {
                        alert('Thank you for your review!');
                        navigate('/sessions');
                    }}
                >
                    Submit Review
                </button>
            </div>
        </div>
    );
}
