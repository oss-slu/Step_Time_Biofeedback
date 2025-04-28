import React from 'react';
import './WebSocketSwitch.css';

const WebSocketSwitch = ({ isConnected, reconnect }) => {
  const handleToggle = () => {
    if (!isConnected) {
      reconnect();
    }
  };

  return (
    <div className="websocket-toggle" title={isConnected ? 'Connected' : 'Disconnected'}>
      <label>
        <input type="checkbox" checked={isConnected} onChange={handleToggle} />
        <div className={`switch-track ${isConnected ? 'connected' : 'disconnected'}`}>
          <div className="switch-thumb"></div>
        </div>
      </label>
    </div>
  );
};

export default WebSocketSwitch;
