import './App.css';
import { useState, useEffect } from 'react';
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

  var websocket = null;

  useEffect(() => {
    websocket = new WebSocket("ws://localhost:8000/ws");

    websocket.onopen = () => websocket.send("Websocket Connected to React");

    websocket.onmessage = function(event) {
      console.log("Data received from backend: ", event.data);
    };

    return () => {
      if (websocket) {
        websocket.close();
        console.log("WebSocket connection closed");
      }
    };
  }, []);

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