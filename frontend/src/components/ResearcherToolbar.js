import './ResearcherToolbar.css';

function ResearcherToolbar({ movingAverageFactor, setMovingAverageFactor, threshold, setThreshold }) {
  return (
    <div className="researcher-toolbar">
      <h3 className="toolbar-header">Researcher Toolbar</h3>

      {/* Moving Average Factor Input */}
      <div className="tool">
        <label className="tool-label">Moving Average Factor:</label>
        <input
          type="number"
          value={movingAverageFactor}
          onChange={(e) => setMovingAverageFactor(Number(e.target.value))}
          className="tool-input"
        />
      </div>

      <br />

      {/* Threshold Input */}
      <div className="tool">
        <label className="tool-label">Threshold:</label>
        <input
          type="number"
          value={threshold}
          onChange={(e) => setThreshold(Number(e.target.value))}
          className="tool-input"
        />
      </div>

      {/* Submit Button */}
      <button className="toolbar-button">Submit</button>
    </div>
  );
}

export default ResearcherToolbar;
