import './App.css';
import { useState, useEffect, useRef } from 'react';
import Navigation from './Navigation';
import StepTimeDigits from './StepTimeDigits';
import StepTimeChart from './StepTimeChart';
import StepTimeGraph from './StepTimeGraph';

function App() {
  const [currentView, setCurrentView] = useState('StepTimeDigits');
  const [stepTime, setStepTime] = useState({
    left: 0,
    right: 0,
    targetZones: {
      left: { min: 0, max: 0 },
      right: { min: 0, max: 0 }
    }
  });
  const [connected, setConnected] = useState(false); // Track WebSocket connection status
  const websocket = useRef(null);

  const views = {
    StepTimeDigits: <StepTimeDigits stepTime={stepTime} />,
    StepTimeChart: <StepTimeChart stepTime={stepTime} />,
    StepTimeGraph: <StepTimeGraph stepTime={stepTime} />
  };

  useEffect(() => {
    // Establish WebSocket connection
    websocket.current = new WebSocket("ws://localhost:8000/ws");

    websocket.current.onopen = () => {
      console.log("WebSocket Connected");
      setConnected(true);  // Update state when connection is established
      websocket.current.send("WebSocket Connected to React");
    };

    websocket.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setStepTime({
        left: data.step_times[0] ?? 0,
        right: data.step_times[1] ?? 0,
        targetZones: {
          left: data.target_zone ?? { min: 0, max: 0 },
          right: data.target_zone ?? { min: 0, max: 0 }
        }
      });
    };

    websocket.current.onclose = () => {
      console.log("WebSocket connection closed");
      setConnected(false);  // Update state to reflect disconnection
      alert("WebSocket connection closed! No data streaming.");
    };

    websocket.current.onerror = (error) => {
      console.error("WebSocket error:", error);
      setConnected(false);  // Handle error and update connection status
      alert("WebSocket error occurred. Reconnecting...");
    };

    return () => {
      // Cleanup: close WebSocket when the component unmounts
      if (websocket.current) {
        websocket.current.close();
        console.log("WebSocket closed during cleanup");
      }
    };
  }, []); // Empty dependency array ensures this effect runs only once

  return (
    <div className="App">
      <Navigation setCurrentView={setCurrentView} />
      <header className="App-header">
        {views[currentView]}
        <div>
          <h2>Target Zones</h2>
          <p>Left Foot: {stepTime.targetZones.left.min} - {stepTime.targetZones.left.max}</p>
          <p>Right Foot: {stepTime.targetZones.right.min} - {stepTime.targetZones.right.max}</p>
          <p>Average Target Zone: {(stepTime.targetZones.left.max + stepTime.targetZones.right.max) / 2}</p>
        </div>
        <div>
          <h3>Connection Status: {connected ? "Connected" : "Disconnected"}</h3>
        </div>
      </header>
    </div>
  );
}

export default App;
