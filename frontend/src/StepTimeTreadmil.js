import "./StepTimeTreadmill.css"

function StepTimeTreadmill({ stepTime }) {
  const leftOffsetMin = (stepTime.left - stepTime.targetZones.left.min);
  const leftOffsetMax = (stepTime.left - stepTime.targetZones.left.max) * -1;
  const rightOffsetMin = (stepTime.right - stepTime.targetZones.right.min);
  const rightOffsetMax = (stepTime.right - stepTime.targetZones.right.max) * -1;

  return (
    <div data-testid='step-time-treadmill-view' className="StepTimeTreadmill">
      <svg data-testid="treadmill-svg" className="Treadmill" viewBox="0 0 100 100" preserveAspectRatio='none'>
        <g data-testid='target-zones' className='TargetZones'>
          <g data-testid='left-target-zones' className='LeftTargetZones'>ß
            <line x1='24' x2='26' y1={50 - leftOffsetMin} y2={50 - leftOffsetMin} />
            <line x1='24' x2='26' y1={50 + leftOffsetMax} y2={50 + leftOffsetMax} />
          </g>
          <g data-testid='right-target-zones' className='RightTargetZones'>
            <line x1='74' x2='76' y1={50 - rightOffsetMin} y2={50 - rightOffsetMin} />
            <line x1='74' x2='76' y1={50 + rightOffsetMax} y2={50 + rightOffsetMax} />
          </g>
        </g>
        <g data-testid='step-time-values' className='StepTimeValues'>
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
  
export default StepTimeTreadmill;