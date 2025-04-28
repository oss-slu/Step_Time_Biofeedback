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
  const toast = useRef(null);
  const [sendThreshold, setSendThreshold] = useState(false);
  const [sendMAF, setSendMAF] = useState(false);

  function toastNotifyChanged(parameterName="") {
    if (parameterName !== "") toast.current.show({ severity: "success", summary: "Success:", detail: `Backend received ${parameterName} successfully!` });

    else toast.current.show({ severity: "warn", summary: "Warning:", detail: "There are no changes to sumbit." });
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

      <ToastNotification ref={toast} />
      <button
        className="toolbar-button"
        onClick={() => {
          const data = {}

          if (sendThreshold) data.threshold = threshold
          if (sendMAF) data.movingAverageFactor = movingAverageFactor;
          
          let keys = Object.keys(data)

          if (keys.length) sendDataToBackend(data);
          else console.log("Tried to send old toolbar parameters to backend")
          
          // empty string notification warns user of no change
          toastNotifyChanged(keys.join(", "));

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
