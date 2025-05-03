import "./ResearcherToolbar.css";
import { useRef } from "react";
import ToastNotification from "./toast/Toast";

function ResearcherToolbar({
  movingAverageFactor,
  setMovingAverageFactor,
  threshold,
  setThreshold,
  sendThresholdToBackend,
  isThresholdChanged = false,
  isMovingAverageChanged = false
}) {
  const threshold_toast = useRef(null);

 

  function activateToast(boolean ) {
      if(isThresholdChanged && isMovingAverageChanged) {
        threshold_toast.current.show({ severity: "success", summary: "Threshold and Moving Average Updated", detail: "Threshold and Moving average factor successfully updated!" });
      }
      else if (isThresholdChanged) {
        threshold_toast.current.show({ severity: "success", summary: "Threshold Updated", detail: "Threshold successfully updated!" });
      } 
      else if (isMovingAverageChanged) {
        threshold_toast.current.show({ severity: "success", summary: "Moving Average Updated", detail: "Moving average factor successfully updated!" });
      }
      else {
        threshold_toast.current.show({ severity: "success", summary: "Nothing Updated", detail: "Neither threshold or moving average factor was updated!" });
      }
  }


  return (
    <div className="researcher-toolbar">
      <h3 className="toolbar-header">Researcher Toolbar</h3>

      <div className="tool">
        <label className="tool-label">Moving Average Factor:</label>
        <input
          type="number"
          value={movingAverageFactor}
          onChange={(e) => setMovingAverageFactor(Number(e.target.value))}
          className="tool-input"
          data-testid="moving-average-input"
        />
      </div>

      <br />

      <div className="tool">
        <label className="tool-label">Threshold:</label>
        <input
          type="number"
          value={threshold}
          onChange={(e) => setThreshold(Number(e.target.value))}
          className="tool-input"
          data-testid="threshold-input"
        />
      </div>

      <ToastNotification ref={threshold_toast} />
      <button
        className="toolbar-button"
        onClick={() => {
          sendThresholdToBackend();
          if (threshold !== 0)
            isThresholdChanged = true;

          if (movingAverageFactor !== 0)
            isMovingAverageChanged = true;

          activateToast();
        }}
        data-testid="threshold-btn"
      >
        Submit
      </button>
    </div>
  );
}

export default ResearcherToolbar;
