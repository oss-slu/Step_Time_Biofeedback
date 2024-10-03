import "./App.css";
import { useEffect } from "react";

function App() {
  let websocket = null;
  let websocketConnected = false;

  useEffect(() => {
    websocket = new WebSocket("ws://localhost:8000/ws");

    websocket.onopen = () => {
      console.log("WebSocket Connected to React");
      websocketConnected = true;
    };

    websocket.onmessage = function(event) {
      console.log("Data received from backend: ", event.data);
    };

    websocket.onclose = (event) => {
      console.log("WebSocket connection closed: ", event);
      websocketConnected = false;
    };

    return () => {};
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <p>Hello, World!</p>
      </header>
    </div>
  );
}

export default App;
