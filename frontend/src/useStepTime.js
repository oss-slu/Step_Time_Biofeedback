import { useState, useEffect } from 'react';

function useStepTime() {
  // TODO: update default values, check w/ line 14 comment
  const [stepTime, setStepTime] = useState({
    left: 0, 
    right: 0,
    targetZones: {
      left: { min: 25, max: 30 },
      right: { min: 50, max: 45 }
    } 
  });

  // TODO: update to work with WebSocket & take input inside useEffect call
  const updateStepTimes = () => {
    setStepTime(prev => ({
      left: prev.left + 1,
      right: prev.right + 1,
      targetZones: prev.targetZones
    }));
  };

  useEffect(() => {
    // interval is set in ms
    const interval = setInterval(updateStepTimes, 1000);

    return () => clearInterval(interval); 
  }); 

  return stepTime;
}

export default useStepTime;