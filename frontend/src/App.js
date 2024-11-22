import './App.css';
import { useState, useEffect, useRef } from 'react';
import Navigation from './Navigation';
import StepTimeDigits from './StepTimeDigits';
import StepTimeChart from './StepTimeChart';
import StepTimeGraph from './StepTimeGraph';
import StepTimeTredmill from './StepTimeTreadmil';

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

  const [isWebSocketConnected, setIsWebSocketConnected] = useState(false); // WebSocket connection state
  const [webSocketError, setWebSocketError] = useState(null); // For displaying errors to the user

  const views = {
    StepTimeDigits: <StepTimeDigits stepTime={stepTime} />,
    StepTimeChart: <StepTimeChart stepTime={stepTime} />,
    StepTimeGraph: <StepTimeGraph stepTime={stepTime} />,
    StepTimeTredmill: <StepTimeTredmill stepTime={stepTime} />
  };

  function updateVisualThreshold(forceData) {
    let color = null;

    if (forceData <= 19.00 && forceData >= 18.00) {
      color = "yellow";
    } else if (forceData < 18.00) {
      color = "red";
    } else {
      color = "green";
    }

    console.log(color);
  
    const elements = document.querySelectorAll(".CurrentStepTime li");
    elements.forEach(element => {
      element.style.borderColor = color;
    });
  }

  function updateTargetZones(data) {
    setStepTime({
      left: data.step_times?.[0] ?? 0,
      right: data.step_times?.[1] ?? 0,
      targetZones: {
        left: data.target_zone ?? { min: 0, max: 0 },
        right: data.target_zone ?? { min: 0, max: 0 }
      }
    });
  }

  let websocket = useRef(null);

  useEffect(() => {
    websocket.current = new WebSocket("ws://localhost:8000/ws");

    websocket.current.onopen = () => {
      console.log("WebSocket Connected to React");
      setIsWebSocketConnected(true);  // Update state when connected
      websocket.current.send("Websocket Connected to React");
    };

    websocket.current.onmessage = function (event) {
      console.log("Data received from backend");
      // Your logic for processing the received data

      const data = JSON.parse(event.data); 

      if(data.message_type === "Force Data"){
        updateVisualThreshold(data.force);
      }
      else if(data.message_type === "Target Zone"){
        updateTargetZones(data);
      }
    };

    websocket.current.onclose = (event) => {
      console.log("WebSocket connection closed: ", event);
      setIsWebSocketConnected(false); // Update state when closed
      setWebSocketError("WebSocket connection closed. Data streaming stopped.");
    };

    websocket.current.onerror = (event) => {
      console.log("WebSocket error: ", event);
      setWebSocketError("WebSocket encountered an error. Data streaming stopped.");
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
      {/* WebSocket Status Banner */}
      <div
        style={{
          width: '100%',
          padding: '10px',
          backgroundColor: isWebSocketConnected ? 'green' : 'red',
          color: 'white',
          textAlign: 'center',
          position: 'fixed', // Ensure it stays at the top
          top: 0,
          left: 0,
          zIndex: 1000,
        }}
      >
        {isWebSocketConnected
          ? "WebSocket Connected"
          : webSocketError || "Waiting for WebSocket connection..."}
      </div>
  
      {/* Page Content */}
      <Navigation setCurrentView={setCurrentView} />
      <header className="App-header" style={{ marginTop: '50px' }}>
        {views[currentView]}
        <div>
          <h2>Target Zones</h2>
          <p>Left Foot: {stepTime.targetZones.left.min} - {stepTime.targetZones.left.max}</p>
          <p>Right Foot: {stepTime.targetZones.right.min} - {stepTime.targetZones.right.max}</p>
          <p>Average Target Zone: {stepTime.targetZones.average}</p>
        </div>
      </header>
    </div>
  );
}

export default App;
