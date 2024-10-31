import './App.css';
import { useState, useEffect, useRef } from 'react';
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

  let websocket = useRef(null);
  // let websocketConnected = false;

  useEffect(() => {
    websocket.current = new WebSocket("ws://localhost:8000/ws");

    websocket.current.onopen = () => { 
      console.log("WebSocket Connected to React");
      websocket.current.send("Websocket Connected to React")
      // websocketConnected = true;
    };

    websocket.current.onmessage = function(event) {
       console.log("Data received from backend: ", event.data);
    };

    websocket.current.onclose = (event) => {
      console.log("WebSocket connection closed: ", event); 
      // websocketConnected = false;
    };

    return () => {
      if (websocket.current) {
        websocket.current.close();
        console.log("WebSocket connection closed during cleanup");  
      }
    };
  }, []);

  return (
    <div className="App">
      <Navigation setCurrentView={setCurrentView} />
      <header className="App-header">
        {views[currentView]}
        <div>
          <h2>Target Zones</h2>
<<<<<<< HEAD
          <p>Left Foot: {stepTime.targetZones.left.min} - {stepTimeData.targetZones.left.max}</p>
          <p>Right Foot: {stepTime.targetZones.right.min} - {stepTimeData.targetZones.right.max}</p>
=======
          <p>Left Foot: {stepTime.targetZones.left.min} - {stepTime.targetZones.left.max}</p>
          <p>Right Foot: {stepTime.targetZones.right.min} - {stepTime.targetZones.right.max}</p>
>>>>>>> origin/main
          <p>Average Target Zone: {stepTime.targetZones.average}</p>
          </div>
      </header>
    </div>
  );
}

export default App;
