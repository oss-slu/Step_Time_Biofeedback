import "./ResearcherToolbar.css";
import { useRef, useState } from "react";
import ToastNotification from "./toast/Toast";

function ResearcherToolbar({
  movingAverageFactor,
  setMovingAverageFactor,
  threshold,
  setThreshold,
  sendDataToBackend,
}) {
  const threshold_toast = useRef(null);
  const [sendThreshold, setSendThreshold] = useState(false);
  const [sendMAF, setSendMAF] = useState(false);

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
          onChange={ (e) => {
            setMovingAverageFactor(Number(e.target.value));
            setSendMAF(true);
          }}
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
          onChange={(e) => {
            setThreshold(Number(e.target.value));
            setSendThreshold(true);
          }}
          className="tool-input"
          data-testid="threshold-input"
        />
      </div>

      <ToastNotification ref={threshold_toast} />
      <button
        className="toolbar-button"
        onClick={() => {
          const data = {}

          if (sendThreshold) data.threshold = threshold;
          if (sendMAF) data.movingAverageFactor = movingAverageFactor;

          if (Object.keys(data).length) sendDataToBackend(data);
          else console.log("Tried to send old toolbar parameters to backend")

          activateToast();
          
          // reset send data flags
          setSendMAF(false);
          setSendThreshold(false);
        }}
        data-testid="send-data-btn"
      >
        Submit
      </button>
    </div>
  );
}

export default ResearcherToolbar;
