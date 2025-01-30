import { render, screen, fireEvent } from "@testing-library/react";
import App from "../App";
import WS from "jest-websocket-mock";

test("Navbar is rendered on screen", () => {
  render(<App />);
  expect(screen.getByRole("navigation")).toBeInTheDocument();
});

jest.setTimeout(10000);

describe("StepTime view changes", () => {
  let server;

  beforeEach(async () => {
    server = new WS("ws://localhost:8000/ws", { jsonProtocol: true });
    await server.connected; // Ensure connection before sending messages
  });

  afterEach(() => {
    WS.clean();
  });

  test("Force Threshold Green Test", async () => {
    render(<App />);
    await server.connected;

    await server.send({
      message_type: "Force Data",
      time: 0.00093,
      force: 21.4233408,
    });

    const elements = await screen.findAllByTestId("current-step-time-left");

    elements.forEach((element) => {
      expect(element).toHaveStyle("border-color: green");
    });
  });

  test("Force Threshold Yellow Test", async () => {
    render(<App />);
    await server.connected;

    await server.send({
      message_type: "Force Data",
      time: 0.00093,
      force: 18.5,
    });

    const elements = await screen.findAllByTestId("current-step-time-left");

    elements.forEach((element) => {
      expect(element).toHaveStyle("border-color: yellow");
    });
  });

  test("Force Threshold Red Test", async () => {
    render(<App />);
    await server.connected;

    await server.send({
      message_type: "Force Data",
      time: 0.00093,
      force: 1.4233408,
    });

    const elements = await screen.findAllByTestId("current-step-time-left");

    elements.forEach((element) => {
      expect(element).toHaveStyle("border-color: red");
    });
  });
});

describe("View Swapping", () => {
  test("Navbar swap renders StepTimeChart view", () => {
    render(<App />);
    fireEvent.click(screen.getByTestId("step-time-chart-nav"));
    expect(screen.getByTestId("step-time-chart-view")).toBeInTheDocument();
  });

  test("Navbar swap renders StepTimeGraph view", () => {
    render(<App />);
    fireEvent.click(screen.getByTestId("step-time-graph-nav"));
    expect(screen.getByTestId("step-time-graph-view")).toBeInTheDocument();
  });

  test("Navbar swap renders StepTimeTreadmill view", () => {
    render(<App />);
    fireEvent.click(screen.getByTestId("step-time-treadmill-nav"));
    expect(screen.getByTestId("step-time-treadmill-view")).toBeInTheDocument();
  });

  test("Navbar swap renders StepTimeDigits view", () => {
    render(<App />);
    fireEvent.click(screen.getByTestId("step-time-graph-nav"));
    fireEvent.click(screen.getByTestId("step-time-digits-nav"));
    expect(screen.getByTestId("step-time-digits-view")).toBeInTheDocument();
  });
});

describe("WebSocket in App Component", () => {
  let server;

  beforeEach(async () => {
    server = new WS("ws://localhost:8000/ws", { jsonProtocol: true });
    await server.connected;
  });

  afterEach(() => {
    WS.clean();
  });

  test("WebSocket connection messages", async () => {
    const consoleLogSpy = jest.spyOn(console, "log");
    render(<App />);
    await server.connected;

    await server.send({
      message_type: "Force Data",
      time: 0.00093,
      force: 21.4233408,
    });

    await new Promise((resolve) => setTimeout(resolve, 100));

    expect(consoleLogSpy).toHaveBeenCalledWith("Data received from backend");

    consoleLogSpy.mockRestore();
  });

  test("Message on WebSocket connection open", async () => {
    render(<App />);
    await server.connected;
    await expect(server).toReceiveMessage("Websocket Connected to React");
  });

  test("User is notified on WS Close", async () => {
    const consoleLogSpy = jest.spyOn(console, "log");

    render(<App />);
    await server.connected;

    server.close();

    expect(consoleLogSpy).toHaveBeenCalledWith(
      "WebSocket connection closed: ",
      expect.any(Object)
    );

    consoleLogSpy.mockRestore();
  });
});
