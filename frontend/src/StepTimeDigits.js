import "./StepTimeDigits.css";

function StepTimeDigits({ stepTime }) {
  return (
    <div data-testid='step-time-digits-view' className="StepTimeDigits">
      <div data-testid='target-zones-values' className="TargetZones">
        <p data-testid='target-zones-title'>Target Zones</p>
        <ul>
          <li data-testid='target-zones-left'>{stepTime.targetZones.left.min}-{stepTime.targetZones.left.max}</li>
          <li data-testid='target-zones-right'>{stepTime.targetZones.right.min}-{stepTime.targetZones.right.max}</li>
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