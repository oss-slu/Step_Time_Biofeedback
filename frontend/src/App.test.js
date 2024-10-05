import { render } from '@testing-library/react';
import { act } from 'react';
import App from './App';
import WS from 'jest-websocket-mock';

describe('WebSocket in App Component', () => {
  let server;

  beforeEach(() => {
    server = new WS("ws://localhost:8000/ws");
  });

  afterEach(() => {
    server.close();
    WS.clean();
  });

  test('WebSocket connection messages', async () => {
    const consoleLogSpy = jest.spyOn(console, 'log');

    await act(async () => {
      render(<App />);
    });

    await server.connected;

    server.send("Message from backend");

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 100));
    });

    expect(consoleLogSpy).toHaveBeenCalledWith("Data received from backend: ", "Message from backend");

    consoleLogSpy.mockRestore();
 
  });
  test('Message on WebSocket connection open', async () => {
    await act(async () => {
      render(<App />);
    });
   
    // Wait for the server connection to be established
    await server.connected; 
  
    // Wait a bit to ensure the message is sent
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 100));
    });
    
    // Check if the WebSocket has received the expected message
    expect(server).toHaveReceivedMessages(["Websocket Connected to React"]); 

  });
  


  test("User is notified on WS Close", async () => {
    const consoleLogSpy = jest.spyOn(console, 'log');
  
    await act(async () => {
      render(<App />); 
    });
  
    await server.connected;
  
    // Simulate WebSocket close
    await act(async () => {
      server.close();
    });
  
    // Check if "WebSocket connection closed" is logged
    expect(consoleLogSpy).toHaveBeenCalledWith("WebSocket connection closed: ", expect.any(Object));
   
    consoleLogSpy.mockRestore();
  });
});
