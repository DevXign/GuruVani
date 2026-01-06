import React from 'react';
import MobileLayout from '../../components/layout/MobileLayout';

export default function Placeholder({ title }) {
    return (
        <MobileLayout>
            <div className="container" style={{ paddingTop: '40px', textAlign: 'center' }}>
                <h1 className="mb-4">{title}</h1>
                <div className="card">
                    <p>This functional component is coming soon in the next step of the MVP development.</p>
                    <button className="btn btn-outline mt-4" onClick={() => window.history.back()}>Go Back</button>
                </div>
            </div>
        </MobileLayout>
    );
}
