import { useState } from "react";
import "./StanceTimeTreadmill.css";
import { HelpCircle } from "lucide-react";

function StanceTimeTreadmill({ stanceTime }) {
  const [showHelpText, setShowHelpText] = useState(false);

  const XFontSize = 8;
  const xColor = {
    left: "black",
    right: "black",
  };

  const scaleFactor = 50;
  const leftScaleFactor = scaleFactor / stanceTime.left;
  const rightScaleFactor = scaleFactor / stanceTime.right;
  const leftOffsetMin =
    (stanceTime.left - stanceTime.targetZones.left.min) * -leftScaleFactor;
  const leftOffsetMax =
    (stanceTime.left - stanceTime.targetZones.left.max) * leftScaleFactor;
  const rightOffsetMin =
    (stanceTime.right - stanceTime.targetZones.right.min) * -rightScaleFactor;
  const rightOffsetMax =
    (stanceTime.right - stanceTime.targetZones.right.max) * rightScaleFactor;

  // Based on a 100x100 viewbox, ensures at least 1 target-zone is visible to imply that the other is too far
  let leftMaxPosition = Math.max(scaleFactor - leftOffsetMin, 0);
  let leftMinPosition = Math.min(scaleFactor + leftOffsetMax, 100);
  let rightMaxPosition = Math.max(scaleFactor - rightOffsetMin, 0);
  let rightMinPosition = Math.min(scaleFactor + rightOffsetMax, 10);
  // let leftCurrent = stanceTime.left * leftScaleFactor;
  // let rightCurrent = stanceTime.right * rightScaleFactor;

  // TBD
  let leftCurrent = Math.floor(40);
  let rightCurrent = Math.floor(40);
  if (!stanceTime.left) leftCurrent = scaleFactor;
  if (!stanceTime.right) rightCurrent = scaleFactor;

  function hideHelp() {
    if (showHelpText) {
      setShowHelpText(false);
    }
  }

  // bounds check
  let isInsideZone = {
    left: false,
    right: false,
  };

  if (stanceTime.right) {
    if (rightCurrent <= rightMaxPosition && rightCurrent >= rightMinPosition) {
      isInsideZone.right = true;
    } else {
      xColor.right = "red";
    }
  }

  if (stanceTime.left) {
    if (leftCurrent <= leftMaxPosition && leftCurrent >= leftMinPosition) {
      isInsideZone.left = true;
    } else {
      xColor.left = "red";
    }
  }

  return (
    <div
      data-testid="stance-time-treadmill-view"
      className="StanceTimeTreadmill"
      onClick={hideHelp}
    >
      <div className="stance-time-treadmill-container">
        <div
          className="help-icon-container"
          onClick={() => setShowHelpText(true)}
          title="Show help"
        >
          <HelpCircle
            className="text-gray-400 hover:text-gray-300 cursor-pointer"
            size={30}
          />
        </div>

        {showHelpText && (
          <div className="popup-overlay">
            <div className="popup-content">
              <h2>Help Guide</h2>
              <ul>
                <li>
                  <strong>Stance Time Range:</strong>
                  The{" "}
                  <span
                    style={{
                      backgroundColor: "#a3bed4",
                      padding: "2px 6px",
                      borderRadius: "3px",
                    }}
                  >
                    blue rectangles
                  </span>{" "}
                  represents the stance time range bounds for the left and right
                  foot.
                </li>

                <li>
                  <strong>X's and O's: </strong>A{" "}
                  <span style={{ color: "green", fontSize: "2rem" }}>●</span>{" "}
                  appears if the step is within range; otherwise, a
                  <span style={{ color: "red", fontSize: "1.1rem" }}> X</span>{" "}
                  shows the step was out of range. A black{" "}
                  <span style={{ color: "black", fontSize: "1.1rem" }}> X</span>{" "}
                  appears if no stance time is found.
                </li>

                <li>
                  <strong>Baseline:</strong>
                  The horizontal dashed line ----- represents the normal stance
                  time position.
                </li>
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

        <div className="treadmill-wrapper">
          <svg
            data-testid="treadmill-svg"
            className="Treadmill"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <g data-testid="target-zones" className="TargetZones">
              <g data-testid="baseline" className="YAxis">
                <line x1="5" x2="5" y1="0" y2="100" />
              </g>
              <g data-testid="left-target-zones" className="LeftTargetZones">
                <rect
                  className="max-zone"
                  x="24"
                  y={leftMinPosition}
                  width="10"
                  height={leftMaxPosition - leftMinPosition}
                />
              </g>
              <g data-testid="right-target-zones" className="RightTargetZones">
                <rect
                  className="max-zone"
                  x="74"
                  y={rightMinPosition}
                  width="10"
                  height={rightMaxPosition - rightMinPosition}
                />
              </g>
              <g data-testid="baseline" className="Baseline">
                <line x1="5" x2="90" y1="50" y2="50" />
              </g>
            </g>
            <g data-testid="stance-time-values" className="StanceTimeValues">
              <g
                data-testid="left-step-mark"
                className="LeftStep"
                style={{
                  transform: `translate(0, ${leftCurrent}px)`,
                  transition: "transform 0.25s ease-in-out",
                }}
              >
                {isInsideZone.left ? (
                  <circle cx="29" cy="0" r="2" fill="green" />
                ) : (
                  <text
                    x="29"
                    y={XFontSize / 4}
                    fontSize={XFontSize}
                    textAnchor="middle"
                    fill={xColor.left}
                  >
                    x
                  </text>
                )}
              </g>
              <g
                data-testid="right-step-mark"
                className="RightStep"
                style={{
                  transform: `translate(0, ${rightCurrent}px)`,
                  transition: "transform 0.25s ease-in-out",
                }}
              >
                {isInsideZone.right ? (
                  <circle cx="79" cy="0" r="2" fill="green" />
                ) : (
                  <text
                    x="79"
                    y={XFontSize / 4}
                    fontSize={XFontSize}
                    textAnchor="middle"
                    fill={xColor.right}
                  >
                    x
                  </text>
                )}
              </g>
            </g>
          </svg>
          <div className="treadmill-labels">
            <span className="label-left">Left</span>
            <span className="label-right">Right</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StanceTimeTreadmill;
