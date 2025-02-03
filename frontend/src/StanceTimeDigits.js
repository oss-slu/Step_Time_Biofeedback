import "./StanceTimeDigits.css";

function StanceTimeDigits({ stanceTime }) {
  const minTargetZoneLeft = stanceTime.targetZones.left.min
  const minTargetZoneRight = stanceTime.targetZones.right.min
  const maxTargetZoneLeft = stanceTime.targetZones.left.max
  const maxTargetZoneRight = stanceTime.targetZones.right.max
  return (
    <div data-testid='stance-time-digits-view' className="StanceTimeDigits">
      <div data-testid='target-zones-values' className="TargetZones">
        <p data-testid='target-zones-title'>Target Zones</p>
        <ul>
          <li data-testid='target-zones-left'>{minTargetZoneLeft.toFixed(4)}-{maxTargetZoneLeft.toFixed(4)}</li>
          <li data-testid='target-zones-right'>{minTargetZoneRight.toFixed(4)}-{maxTargetZoneRight.toFixed(4)}</li>
        </ul>
      </div>
      <div data-testid='current-stance-time-values' className="CurrentStanceTime">
        <ul>
          <li data-testid='current-stance-time-left'>{stanceTime.left}</li>
          <li data-testid='current-stance-time-right'>{stanceTime.right}</li>
        </ul>
      </div>
    </div>
  );
}

export default StanceTimeDigits;