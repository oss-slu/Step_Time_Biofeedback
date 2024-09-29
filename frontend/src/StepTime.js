import React from 'react';
import "./StepTime.css";

function StepTime({ stepTime }) {
  return (
    <div className="StepTime">
      <div className="TargetZones">
        <p>Target Zones</p>
        <ul>
          <li>{stepTime.targetZones.left.min}-{stepTime.targetZones.left.max}</li>
          <li>{stepTime.targetZones.right.min}-{stepTime.targetZones.right.max}</li>
        </ul>
      </div>
      <div className="CurrentStepTime">
        <ul>
          <li className="Left">{stepTime.left}</li>
          <li className="Right">{stepTime.right}</li>
        </ul>
      </div>
    </div>
  );
}

export default StepTime;