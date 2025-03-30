import './Navigation.css';

function Navigation({ setCurrentView }) {
    return (
        <nav role="navigation" className="Navigation">
            <ul>
            <li data-testid='stance-time-tredmill-nav' onClick={() => setCurrentView('StanceTimeTredmil')}>Stance Time Treadmill</li>
            <li data-testid='stance-time-digits-nav' onClick={() => setCurrentView('StanceTimeDigits')}>Stance Time Digits</li>
            <li data-testid='stance-time-chart-nav' onClick={() => setCurrentView('StanceTimeChart')}>Stance Time Chart</li>
            <li data-testid='stance-time-graph-nav' onClick={() => setCurrentView('StanceTimeGraph')}>Stance Time Graph</li>
            </ul>
        </nav>
    );
}

export default Navigation;