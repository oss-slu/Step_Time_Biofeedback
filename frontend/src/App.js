import "./App.css";
import { useEffect, useRef } from "react";

function App() {
  let websocket = useRef(null);
  let websocketConnected = false;

  useEffect(() => {
    websocket.current = new WebSocket("ws://localhost:8000/ws");

    websocket.current.onopen = () => {
      console.log("WebSocket Connected to React");
      websocket.current.send("Websocket Connected to React")
      websocketConnected = true;
    };

    websocket.current.onmessage = function(event) {
      console.log("Data received from backend: ", event.data);
    };

    websocket.current.onclose = (event) => {
      console.log("WebSocket connection closed: ", event);
      websocketConnected = false;
    };

    return () => {
      if (websocket.current) {
        websocket.current.close();
        console.log("WebSocket connection closed during cleanup");
      }
    };
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
