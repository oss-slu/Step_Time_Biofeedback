import './App.css';
import { useState } from 'react';
import Navigation from './Navigation';
import StepTimeDigits from './StepTimeDigits';
import StepTimeChart from './StepTimeChart';
import StepTimeGraph from './StepTimeGraph';
import useStepTime from './useStepTime';

function App() {
  const [currentView, setCurrentView] = useState('StepTimeDigits');
  const stepTime = useStepTime();

  const views = {
    StepTimeDigits: <StepTimeDigits stepTime={stepTime} />,
    StepTimeChart: <StepTimeChart stepTime={stepTime} />,
    StepTimeGraph: <StepTimeGraph stepTime={stepTime} />,
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
