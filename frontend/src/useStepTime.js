import { useState, useEffect } from 'react';

function useStepTime() {
  // TODO: update default values, check w/ line 14 comment
  const [stepTime, setStepTime] = useState({
    left: 0, 
    right: 0,
    targetZones: {
      left: { min: 0, max: 0 },
      right: { min: 0, max: 0 }
    } 
  });

  useEffect(() => {
    // Establish WebSocket connection
    const websocket = new WebSocket("ws://localhost:8000/ws");

    websocket.onopen = () => {
      console.log("WebSocket Connected");
    };

    websocket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      // Update step time and target zones
      setStepTime({
        left: data.step_times[0] || 0,  // Assuming data has step_times array
        right: data.step_times[1] || 0, // Adjust indices as per your data structure
        targetZones: {
          left: data.target_zone || { min: 0, max: 0 },  // Adjust as necessary
          right: data.target_zone || { min: 0, max: 0 }  // Adjust as necessary
        }
      });
    };

    websocket.onclose = () => {
      console.log("WebSocket connection closed");
    };

    // Cleanup function to close the WebSocket connection when the component unmounts
    return () => {
      websocket.close();
      console.log("WebSocket closed on cleanup");
    };
  }, []); // Empty dependency array means this effect runs once on mount
  return stepTime;
}

export default useStepTime;