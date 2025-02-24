import './Naviation.css';

function Naviation({ setCurrentView }) {
    return (
        <nav role="navigation" className="Navigation">
            <ul>
                <li data-testid='stance-time-digits-nav' onClick={() => setCurrentView('StanceTimeDigits')}>Stance Time Digits</li>
                <li data-testid='stance-time-chart-nav' onClick={() => setCurrentView('StanceTimeChart')}>Stance Time Chart</li>
                <li data-testid='stance-time-graph-nav' onClick={() => setCurrentView('StanceTimeGraph')}>Stance Time Graph</li>
                <li data-testid='stance-time-treadmill-nav' onClick={() => setCurrentView('StanceTimeTredmill')}>Stance Time Treadmill</li>
            </ul>
        </nav>
    );
}

export default Naviation;