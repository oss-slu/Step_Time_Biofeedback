import React from 'react';

function ResearcherToolbar({ movingAverage, setMovingAverageFactor, threshold, setThreshold }) {
  return (
    <div style={styles.toolbar}>
      {/* Researcher Toolbar Header */}
      <h3 style={styles.header}>Researcher Toolbar</h3>

      {/* Toolbar content */}
      <div style={styles.toolsContainer}>
        {/* Moving Average Factor */}
        <div style={styles.tool}>
          <label style={styles.label}>Moving Average Factor:</label>
          <input
            type="number"
            value={movingAverage}
            onChange={(e) => setMovingAverageFactor(Number(e.target.value))}
            style={styles.input}
          />
        </div>

        {/* Threshold */}
        <div style={styles.tool}>
          <label style={styles.label}>Threshold:</label>
          <input
            type="number"
            value={threshold}
            onChange={(e) => setThreshold(Number(e.target.value))}
            style={styles.input}
          />
        </div>
      </div>
    </div>
  );
}

const styles = {
  toolbar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    backgroundColor: '#444',
    padding: '4px 12px',
    color: 'white',
    borderRadius: '0px',
    width: '100%',
    height: '40px',
    alignItems: 'center',
  },
  header: {
    fontSize: '14px',
    margin: '0',
    padding: '0 8px',
  },
  toolsContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '10px',
  },
  tool: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  label: {
    fontSize: '10px',
    marginBottom: '4px',
  },
  input: {
    padding: '4px',
    fontSize: '12px',
    borderRadius: '4px',
    width: '60px',
    border: '1px solid #ccc',
  },
};

export default ResearcherToolbar;
