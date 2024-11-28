import "./StepTimeDigits.css";

function StepTimeDigits({ stepTime }) {
  const minTargetZoneLeft = stepTime.targetZones.left.min
  const minTargetZoneRight = stepTime.targetZones.right.min
  const maxTargetZoneLeft = stepTime.targetZones.left.max
  const maxTargetZoneRight = stepTime.targetZones.right.max
  return (
    <div data-testid='step-time-digits-view' className="StepTimeDigits">
      <div data-testid='target-zones-values' className="TargetZones">
        <p data-testid='target-zones-title'>Target Zones</p>
        <ul>
          <li data-testid='target-zones-left'>{minTargetZoneLeft.toFixed(4)}-{maxTargetZoneLeft.toFixed(4)}</li>
          <li data-testid='target-zones-right'>{minTargetZoneRight.toFixed(4)}-{maxTargetZoneRight.toFixed(4)}</li>
        </ul>
      </div>
      <div data-testid='current-step-time-values' className="CurrentStepTime">
        <ul>
          <li data-testid='current-step-time-left'>{stepTime.left}</li>
          <li data-testid='current-step-time-right'>{stepTime.right}</li>
        </ul>
      </div>
    </div>
  );
}

export default StepTimeDigits;