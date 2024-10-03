import "./App.css";
import { useEffect } from "react";

function App() {
  var websocket = null;

  useEffect(() => {
    websocket = new WebSocket("ws://localhost:8000/ws");

    websocket.onopen = () => websocket.send("Websocket Connected to React");

    websocket.onmessage = function(event) {
      console.log("Data received from backend: ", event.data);
    };

    return () => {
      if (websocket) {
        websocket.close();
        console.log("WebSocket connection closed");
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
