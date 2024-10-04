import React from 'react';
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

    server.close();
  });

  test('Message on WebSocket connection open', async () => {
    await act(async () => {
      render(<App />);
    });

    await server.connected;

    expect(server).toReceiveMessage("Websocket Connected to React");

    server.close();

  });

  test("User is notified on WS Close", async () => {
    await act(async () => {
      render(<App />);
    });

    await server.connected;

    expect(server).toReceiveMessage("Websocket Connected to React");

    server.close();

    expect(server).toReceiveMessage("WebSocket connection closed:");
  });
});
