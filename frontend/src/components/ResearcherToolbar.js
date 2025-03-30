import { useState } from "react";
import "./ResearcherToolbar.css";

function ResearcherToolbar({ movingAverageFactor, setMovingAverageFactor, threshold, setThreshold, sendThresholdToBackend }) {

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

      <button className="toolbar-button" onClick={sendThresholdToBackend}  data-testid="threshold-btn">
        Submit
      </button>
    </div>
  );
}

export default ResearcherToolbar;