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

  function updateVisualThreshold(forceData) {
    let color = null;

    if (forceData <= 19.00 && forceData >= 18.00) {
      color = "yellow";
    } else if (forceData < 18.00) {
      color = "red";
    } else {
      color = "green";
    }
  
    const elements = document.querySelectorAll(".CurrentStepTime li");
    elements.forEach(element => {
      element.style.background = color;
    });
  }

  useEffect(() => {
    // Establish WebSocket connection
    const websocket = new WebSocket("ws://localhost:8000/ws");

    websocket.onopen = () => {
      console.log("WebSocket Connected");
    };

    websocket.onmessage = (event) => {
      const data = JSON.parse(event.data); 

      if(data.message_type === "Force Data"){
        console.log("Recevied Force Data: ");
        updateVisualThreshold(data.force);
      }
      else{
        setStepTime({
          left: data.step_times?.[0] ?? 0,  // Use optional chaining to safely access the first element
          right: data.step_times?.[1] ?? 0, // Same for the second element
          targetZones: {
            left: data.target_zone ?? { min: 0, max: 0 },  // If target_zone is not defined, default to { min: 0, max: 0 }
            right: data.target_zone ?? { min: 0, max: 0 }  // Same for the right foot
          }
        });
      }
    };

    websocket.onclose = () => {
      console.log("WebSocket connection closed"); 
    };

    return () => {
      websocket.close();
      console.log("WebSocket closed on cleanup");
    };
  }, []);
  return stepTime;
}

export default useStepTime;