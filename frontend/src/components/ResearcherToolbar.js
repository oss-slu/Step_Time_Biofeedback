import "./ResearcherToolbar.css";
import { useRef } from "react";
import ToastNotification from "./toast/Toast";

function ResearcherToolbar({
  movingAverageFactor,
  setMovingAverageFactor,
  threshold,
  setThreshold,
  sendThresholdToBackend,
  isThresholdChanged,
  isMovingAverageChanged
}) {
  const threshold_toast = useRef(null);

  const handleThresholdChange = (e) => {
    setThreshold(Number(e.target.value));
    isThresholdChanged = true;
  };

  const handleMovingAverageFactorChange = (e) => {
    setMovingAverageFactor(Number(e.target.value));
    isMovingAverageChanged= true;
  };

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
  }


  return (
    <div className="researcher-toolbar">
      <h3 className="toolbar-header">Researcher Toolbar</h3>

      <div className="tool">
        <label className="tool-label">Moving Average Factor:</label>
        <input
          type="number"
          value={movingAverageFactor}
          onChange={handleMovingAverageFactorChange}
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
          onChange={handleThresholdChange}
          className="tool-input"
          data-testid="threshold-input"
        />
      </div>

      <ToastNotification ref={threshold_toast} />
      <button
        className="toolbar-button"
        onClick={() => {
          sendThresholdToBackend();
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
