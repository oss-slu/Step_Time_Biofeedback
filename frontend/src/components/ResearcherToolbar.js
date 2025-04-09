import "./ResearcherToolbar.css";
import { Toast } from "primereact/toast";
import { useRef } from "react";

function ResearcherToolbar({
  movingAverageFactor,
  setMovingAverageFactor,
  threshold,
  setThreshold,
  sendThresholdToBackend,
}) {
  const threshold_toast = useRef(null);

  function activateToast() {
    threshold_toast.current.show({ severity: "success", summary: "Submitted", detail: "Threshold successfully submitted!" });
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

      <Toast ref={threshold_toast} />
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
