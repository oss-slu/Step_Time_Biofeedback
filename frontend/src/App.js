import './App.css';
import { useState, useEffect, useRef } from 'react';
import Navigation from './Navigation';
import StepTimeDigits from './StepTimeDigits';
import StepTimeChart from './StepTimeChart';
import StepTimeGraph from './StepTimeGraph';
import useStepTime from './useStepTime';

function App() {
  const [currentView, setCurrentView] = useState('StepTimeDigits');
  const [connectionStatus, setConnectionStatus] = useState('Connected'); // Track WebSocket connection status
  const stepTime = useStepTime();

  const views = {
    StepTimeDigits: <StepTimeDigits stepTime={stepTime} />,
    StepTimeChart: <StepTimeChart stepTime={stepTime} />,
    StepTimeGraph: <StepTimeGraph stepTime={stepTime} />,
  };

  let websocket = useRef(null);

  useEffect(() => {
    websocket.current = new WebSocket("ws://localhost:8000/ws");

    websocket.current.onopen = () => { 
      console.log("WebSocket Connected to React");
      setConnectionStatus('Connected'); // Update connection status
      websocket.current.send("WebSocket Connected to React");
    };

    websocket.current.onmessage = function(event) {
      console.log("Data received from backend: ", event.data);
    };

    websocket.current.onclose = (event) => {
      console.log("WebSocket connection closed: ", event); 
      setConnectionStatus('Disconnected'); // Update connection status
    };

    websocket.current.onerror = (error) => {
      console.error("WebSocket error: ", error);
      setConnectionStatus('Error'); // Update connection status in case of an error
    };

    return () => {
      if (websocket.current) {
        websocket.current.close();
        console.log("WebSocket connection closed during cleanup");  
      }
    };
  }, []);

  // Send data only if WebSocket is connected
  const handleSendData = (data) => {
    if (websocket.current && websocket.current.readyState === WebSocket.OPEN) {
      websocket.current.send(data);
    } else {
      console.log("Cannot send data. WebSocket is not open.");
    }
  };

  return (
    <div className="App">
      <Navigation setCurrentView={setCurrentView} />
      <header className="App-header">
        {views[currentView]}
        <div>
          <h2>Target Zones</h2>
          <p>Left Foot: {stepTime.targetZones.left.min} - {stepTime.targetZones.left.max}</p>
          <p>Right Foot: {stepTime.targetZones.right.min} - {stepTime.targetZones.right.max}</p>
          <p>Average Target Zone: {stepTime.targetZones.average}</p>
        </div>
        {/* Display WebSocket connection status */}
        <div>
          <h3>WebSocket Status: {connectionStatus}</h3>
        </div>
      </header>
    </div>
  );
}

export default App;
