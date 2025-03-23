import "./StanceTimeTreadmill.css";

function StanceTimeTreadmill({ stanceTime, setShowHelpText, showHelpText }) {
  const scaleFactor = 50;
  const leftScaleFactor = scaleFactor / stanceTime.left;
  const rightScaleFactor = scaleFactor / stanceTime.right;
  const leftOffsetMin = (stanceTime.left - stanceTime.targetZones.left.min) * -leftScaleFactor;
  const leftOffsetMax = (stanceTime.left - stanceTime.targetZones.left.max) * leftScaleFactor;
  const rightOffsetMin = (stanceTime.right - stanceTime.targetZones.right.min) * -rightScaleFactor;
  const rightOffsetMax = (stanceTime.right - stanceTime.targetZones.right.max) * rightScaleFactor;

  // Based on a 100x100 viewbox, ensures at least 1 target-zone is visible to imply that the other is too far
  let leftMaxPosition = Math.max(scaleFactor - leftOffsetMin, 0);
  let leftMinPosition = Math.min(scaleFactor + leftOffsetMax, 100);
  let rightMaxPosition = Math.max(scaleFactor - rightOffsetMin, 0);
  let rightMinPosition = Math.min(scaleFactor + rightOffsetMax, 100);
  // let leftCurrent = stanceTime.left * leftScaleFactor;
  // let rightCurrent = stanceTime.right * rightScaleFactor;
  let leftCurrent = Math.floor(Math.random() * 80);
  let rightCurrent = Math.floor(Math.random() * 80);

  function hideHelp() {
    if (showHelpText) {
      setShowHelpText(false);
    }
  }
  
  return (
    <div data-testid="stance-time-treadmill-view" className="StanceTimeTreadmill" onClick={hideHelp}>
      <div className="stance-time-treadmill-container">
      <button 
        onClick={() => setShowHelpText(true)}
        className="help-button"
      >
        Show Help
      </button>

      {showHelpText && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h2>Help Guide</h2>
            <ul>
              <li><strong>Stance Time Range:</strong> The blue rectangles represent the stance time range bounds for the left and right foot.</li>
              <li><strong>X's and O's:</strong> A circle appears if the step is within range; otherwise, an X shows the step was out of range.</li>
              <li><strong>Baseline:</strong> The horizontal line represents the normal stance time position.</li>
            </ul>
            <button 
              onClick={() => setShowHelpText(false)}
              className="close-button"
            >
              Close
            </button>
          </div>
        </div>
      )}
      </div>

      <svg data-testid="treadmill-svg" className="Treadmill" viewBox="0 0 100 100" preserveAspectRatio="none">
        <g data-testid="target-zones" className="TargetZones">
          <g data-testid="baseline" className="YAxis">
            <line x1="5" x2="5" y1="0" y2="100" />
          </g>
          <g data-testid="left-target-zones" className="LeftTargetZones">
            <rect className="max-zone" x="24" y={leftMinPosition} width="10" height={leftMaxPosition - leftMinPosition} />
          </g>
          <g data-testid="right-target-zones" className="RightTargetZones">
            <rect className="max-zone" x="74" y={rightMinPosition} width="10" height={rightMaxPosition - rightMinPosition} />
          </g>
          <g data-testid="baseline" className="Baseline">
            <line x1="5" x2="90" y1="50" y2="50" />
          </g>
        </g>
        <g data-testid="stance-time-values" className="StanceTimeValues">
          <g
            data-testid="left-step-mark" className="LeftStep"
            style={{
              transform: `translate(0, ${leftCurrent}px)`,
              transition: 'transform 0.25s ease-in-out',
            }}
          >
            {leftCurrent <= leftMaxPosition && leftCurrent >= leftMinPosition ? (
              <circle cx="29" cy="0" r="1.5" fill="green" />
            ) : (
              <>
                <line x1="27" y1="-1.5" x2="31" y2="1.5" stroke="red" strokeWidth="2" />
                <line x1="27" y1="1.5" x2="31" y2="-1.5" stroke="red" strokeWidth="2" />
              </>
            )}
          </g>
          <g
            data-testid="right-step-mark" className="RightStep"
            style={{
              transform: `translate(0, ${rightCurrent}px)`,
              transition: 'transform 0.25s ease-in-out',
            }}
          >
            {rightCurrent <= rightMaxPosition && rightCurrent >= rightMinPosition ? (
              <circle cx="79" cy="0" r="1.5" fill="green" />
            ) : (
              <>
                <line x1="77" y1="-1.5" x2="81" y2="1.5" stroke="red" strokeWidth="2" />
                <line x1="77" y1="1.5" x2="81" y2="-1.5" stroke="red" strokeWidth="2" />
              </>
            )}
          </g>
        </g>
      </svg>

      <svg data-testid="treadmill-text-svg" className="Treadmill-text" viewBox="0 0 100 10" preserveAspectRatio="none">
        <text x="29" y="5" textAnchor="middle" fontSize="5" fill="white">Left</text>
        <text x="79" y="5" textAnchor="middle" fontSize="5" fill="white">Right</text>
      </svg>
    </div>
  );
}

export default StanceTimeTreadmill;