import "./StanceTimeTreadmill.css"

function StanceTimeTreadmill({ stanceTime }) {
  const scaleFactor = 50;
  const leftScaleFactor = scaleFactor / stanceTime.left;
  const rightScaleFactor = scaleFactor / stanceTime.right;
  const leftOffsetMin = (stanceTime.left - stanceTime.targetZones.left.min) * -leftScaleFactor;
  const leftOffsetMax = (stanceTime.left - stanceTime.targetZones.left.max) * leftScaleFactor;
  const rightOffsetMin = (stanceTime.right - stanceTime.targetZones.right.min) * -rightScaleFactor;
  const rightOffsetMax = (stanceTime.right - stanceTime.targetZones.right.max) * rightScaleFactor;

  // Based on a 100x100 viewbox, ensures at least 1 target-zone is visible to imply that the other is too far 
  let leftMinPosition = Math.max(scaleFactor - leftOffsetMin, 0);
  let leftMaxPosition = Math.min(scaleFactor + leftOffsetMax, 100);
  let rightMinPositon = Math.max(scaleFactor - rightOffsetMin, 0);
  let rightMaxPosition = Math.min(scaleFactor + rightOffsetMax, 100);
  
  return (
    <div data-testid='stance-time-treadmill-view' className="StanceTimeTreadmill">
      <div className='visual-key'>
        <ul>
          <li><strong><u>Key</u></strong></li>
          <li><strong>Vertical Lines:</strong> The blue line represents the upper echlon of the target zone and the orange line represents the bottom line of the target zone for left and right target zones respectively.</li>
          <li><strong>X's:</strong> The left and right x's represent the left and right current step time respectively.</li>
        </ul>
      </div>
      <svg data-testid="treadmill-svg" className="Treadmill" viewBox="0 0 100 100" preserveAspectRatio='none'>
        <g data-testid='target-zones' className='TargetZones'>
          <g data-testid='left-target-zones' className='LeftTargetZones'>
            <line className='max-zone' x1='24' x2='26' y1={leftMaxPosition} y2={leftMaxPosition} />
            <line className='min-zone' x1='24' x2='26' y1={leftMinPosition} y2={leftMinPosition} />
          </g>
          <g data-testid='right-target-zones' className='RightTargetZones'>
            <line className='max-zone' x1='74' x2='76' y1={rightMaxPosition} y2={rightMaxPosition} />
            <line className='min-zone' x1='74' x2='76' y1={rightMinPositon} y2={rightMinPositon} />
          </g>
        </g>
        <g data-testid='stance-time-values' className='StanceTimeValues'>
          <g data-testid='left-step' className='LeftStep'>
            <line x1='24.5' x2='25.5' y1='49.5' y2='50.5' />
            <line x1='24.5' x2='25.5' y1='50.5' y2='49.5' />
          </g>
          <g data-testid='right-step' className='RightStep'> 
            <line x1='74.5' x2='75.5' y1='49.5' y2='50.5' />
            <line x1='74.5' x2='75.5' y1='50.5' y2='49.5' />
          </g>
        </g>
      </svg>
    </div>
  );
}
  
export default StanceTimeTreadmill;