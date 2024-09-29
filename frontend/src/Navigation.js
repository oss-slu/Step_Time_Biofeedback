import React from 'react';
import './Naviation.css';

function Naviation({ setCurrentView }) {
    return (
        <div className="Navigation">
            <nav>
                <ul>
                    <li onClick={() => setCurrentView('step_time')}>Step Time</li>
                    <li onClick={() => setCurrentView('chart')}>Chart</li>
                    <li onClick={() => setCurrentView('graph')}>Graph</li>
                </ul>
            </nav>
        </div>
    );
}

export default Naviation;