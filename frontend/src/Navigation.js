import './Naviation.css';

function Naviation({ setCurrentView }) {
    return (
        <nav role="navigation" className="Navigation">
            <ul>
                <li data-testid='step-time-digits-nav' onClick={() => setCurrentView('StepTimeDigits')}>Step Time Digits</li>
                <li data-testid='step-time-chart-nav' onClick={() => setCurrentView('StepTimeChart')}>Step Time Chart</li>
                <li data-testid='step-time-graph-nav' onClick={() => setCurrentView('StepTimeGraph')}>Step Time Graph</li>
            </ul>
        </nav>
    );
}

export default Naviation;