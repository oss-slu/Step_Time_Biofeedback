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

  const [isWebSocketConnected, setIsWebSocketConnected] = useState(false); // WebSocket connection state
  const [webSocketError, setWebSocketError] = useState(null); // For displaying errors to the user

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
      setIsWebSocketConnected(true);  // Update state when connected
      websocket.current.send("Websocket Connected to React");
    };

    websocket.current.onmessage = function (event) {
      console.log("Data received from backend: ", event.data);
      // Your logic for processing the received data
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
      <Navigation setCurrentView={setCurrentView} />
      <header className="App-header">
        {views[currentView]}
        <div>
          <h2>Target Zones</h2>
          <p>Left Foot: {stepTime.targetZones.left.min} - {stepTime.targetZones.left.max}</p>
          <p>Right Foot: {stepTime.targetZones.right.min} - {stepTime.targetZones.right.max}</p>
          <p>Average Target Zone: {stepTime.targetZones.average}</p>
        </div>

        {/* Show WebSocket connection status or error */}
        <div>
          {isWebSocketConnected ? (
            <p style={{ color: 'green' }}>WebSocket Connected</p>
          ) : (
            <p style={{ color: 'red' }}>{webSocketError || "Waiting for WebSocket connection..."}</p>
          )}
        </div>

        {/* You can disable streaming or show message based on connection */}
        {!isWebSocketConnected && (
          <div>
            <p style={{ color: 'orange' }}>Streaming stopped. Please check your WebSocket connection.</p>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
