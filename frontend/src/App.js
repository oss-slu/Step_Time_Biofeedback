import './App.css';
import React, { useState } from 'react';
import Navigation from './Navigation';
import StepTime from './StepTime';
import Chart from './Chart';
import Graph from './Graph';
import useStepTime from './useStepTime';

function App() {
  const [currentView, setCurrentView] = useState('step_time');
  const stepTime = useStepTime();

  const views = {
    step_time: <StepTime stepTime={stepTime} />,
    chart: <Chart stepTime={stepTime} />,
    graph: <Graph stepTime={stepTime} />,
  };

  return (
    <div className="App">
      <Navigation setCurrentView={setCurrentView} />
      <header className="App-header">
        {views[currentView]}
      </header>
    </div>
  );
}

export default App;
