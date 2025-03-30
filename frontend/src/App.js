import './App.css';
import { useState, useEffect, useRef, useCallback } from 'react';
import Navigation from './Navigation';
import StanceTimeTreadmill from './StanceTimeTreadmill';
import StanceTimeDigits from './StanceTimeDigits';
import StanceTimeChart from './StanceTimeChart';
import StanceTimeGraph from './StanceTimeGraph';
import ResearcherToolbar from './components/ResearcherToolbar';
import PatientView from './PatientView';

function App() {
  const [currentView, setCurrentView] = useState('StanceTimeTreadmill');

  const [stanceTime, setStanceTime] = useState({
    left: 0, 
    right: 0,
    targetZones: {
      left: { min: 0, max: 0 },
      right: { min: 0, max: 0 }
    } 
  });

  const [isWebSocketConnected, setIsWebSocketConnected] = useState(false);
  const [webSocketError, setWebSocketError] = useState(null);

  const [movingAverageFactor, setMovingAverageFactor] = useState(0);
  const [threshold, setThreshold] = useState(0);

  const [borderColor, setBorderColor] = useState("green");

  const [patientWindow, setPatientWindow] = useState(false);
  const [currentPatientView, setCurrentPatientView] = useState("StanceTimeDigits");

  const views = {
    StanceTimeTreadmill: <StanceTimeTreadmill stanceTime={stanceTime} data-testid="stance-time-treadmill-view" />,
    StanceTimeDigits: <StanceTimeDigits stanceTime={stanceTime} data-testid="stance-time-digits-view" />,
    StanceTimeChart: <StanceTimeChart stanceTime={stanceTime} data-testid="stance-time-chart-view" />,
    StanceTimeGraph: <StanceTimeGraph stanceTime={stanceTime} data-testid="stance-time-graph-view" />
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
    setBorderColor(color);
    console.log(color);
  
    const elements = document.querySelectorAll(".CurrentStanceTime li");
    elements.forEach(element => {
      element.style.borderColor = color;
    });
  }

  function updateTargetZones(data) {
    setStanceTime({
      left: data.stance_times?.[0] ?? 0,
      right: data.stance_times?.[1] ?? 0,
      targetZones: {
        left: data.target_zone ?? { min: 0, max: 0 },
        right: data.target_zone ?? { min: 0, max: 0 }
      }
    });
  }

  const reconnectWebsocket = useCallback(() => {
    if (websocket.current) {
      websocket.current.close();
      console.log("WebSocket connection closed manually.");
    }
  
    const websocketURL = process.env.REACT_APP_WEBSOCKET_URL;
    websocket.current = new WebSocket(websocketURL);
    websocket.current.onopen = () => {
      console.log("WebSocket Connected to React");
      setIsWebSocketConnected(true); // Update state when connected
      websocket.current.send("Websocket Connected to React");
    };
  
    websocket.current.onmessage = (event) => {
      console.log("Data received from backend");
      const data = JSON.parse(event.data);
      if(data.message_type === "Force Data"){
        updateVisualThreshold(data.force);
      } else if(data.message_type === "Target Zone"){
        updateTargetZones(data);
      }
    };
  
    websocket.current.onclose = (event) => {
      console.log("WebSocket connection closed: ", event);
      setIsWebSocketConnected(false); // Update state when connected
      setWebSocketError("WebSocket connection closed. Data streaming stopped.");
    };
  
    websocket.current.onerror = (event) => {
      console.log("WebSocket error: ", event);
      setWebSocketError("WebSocket encountered an error. Data streaming stopped.");
    };
  }, []);

  let websocket = useRef(null);

  useEffect(() => {
    reconnectWebsocket();
  
    return () => {
      if (websocket.current) {
        websocket.current.close();
        console.log("WebSocket connection closed during cleanup");
      }
    };
  }, [reconnectWebsocket]);

  function sendThresholdToBackend() {
    // if (websocket.current && websocket.current.readyState === WebSocket.OPEN) {
    //   const data = { threshold };
    //   websocket.current.send(JSON.stringify(data));
    //   console.log("Threshold sent to backend:", data);
    // } else {
    //   console.error("WebSocket is not open");
    // }
    console.log("Test");
  }

  const toggle = () => {
    if (patientWindow && !patientWindow.closed) {
      if (currentPatientView === currentView) {
        patientWindow.close();
      } else {
        setCurrentPatientView(currentView);
      }
    } else {
      setCurrentPatientView(currentView);
      setPatientWindow(window.open('', '_blank', 'width=800px,height=600px'));
    }
  }

  return (
    <div className="App">
      <div className={`WebSocketBanner ${isWebSocketConnected ? 'connected' : 'disconnected'}`}>
        {isWebSocketConnected
          ? "Connection established"
          : webSocketError || "Waiting for WebSocket connection..."}
        {!isWebSocketConnected && <button onClick={reconnectWebsocket}>Reconnect</button>}
      </div>
      <Navigation setCurrentView={setCurrentView}/>
      {patientWindow && <PatientView borderColor={borderColor} patientWindow={patientWindow} view={views[currentPatientView]}/>}
      <div className="main-layout">
        <div className="sidebar">
          <ResearcherToolbar 
            movingAverageFactor={movingAverageFactor} 
            setMovingAverageFactor={setMovingAverageFactor}
            threshold={threshold} 
            setThreshold={setThreshold}
            sendThresholdToBackend={sendThresholdToBackend}
          />
        </div>
        <div className="main-view">
          <img
            data-testid='patient-view-popout-toggle'
            id='popout-icon' title='Toggle patient view'
            alt='pop-out icon' src='/pop-out.png'
            onClick={toggle}
            style={{ transform: `rotate(${
              patientWindow && !patientWindow.closed && currentPatientView === currentView
              ? '180deg' : '0deg'})`
          }}>
          </img>
          <header className="App-header">
          {views[currentView]}
          </header>
        </div>
      </div>
    </div>
  );
}

export default App;
