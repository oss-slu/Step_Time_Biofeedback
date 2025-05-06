import { render, screen, fireEvent } from "@testing-library/react";
import ResearcherToolbar from "../components/ResearcherToolbar";
import { useState } from "react";

function Wrapper({ sendDataToBackend }) {
    const [threshold, setThreshold] = useState(5);
    const [movingAverageFactor, setMovingAverageFactor] = useState(10);
  
    return (
      <ResearcherToolbar
        threshold={threshold}
        setThreshold={setThreshold}
        movingAverageFactor={movingAverageFactor}
        setMovingAverageFactor={setMovingAverageFactor}
        sendDataToBackend={sendDataToBackend}
      />
    );
  }

describe("ResearcherToolbar data submission", () => {
  let sendDataToBackend;

  beforeEach(() => sendDataToBackend = jest.fn());

  test("Submit sends only threshold when only threshold is changed", () => {
    render(<Wrapper sendDataToBackend={sendDataToBackend}/>);

    const thresholdInput = screen.getByTestId("threshold-input");
    fireEvent.change(thresholdInput, { target: { value: "15" } });

    const submitButton = screen.getByTestId("send-data-btn");
    fireEvent.click(submitButton);

    expect(sendDataToBackend).toHaveBeenCalledTimes(1);
    expect(sendDataToBackend).toHaveBeenCalledWith({ threshold: 15 });
  });

  test("Submit sends only movingAverageFactor when only MAF is changed", () => {
    render(<Wrapper sendDataToBackend={sendDataToBackend}/>);

    const mafInput = screen.getByTestId("moving-average-input");
    fireEvent.change(mafInput, { target: { value: "20" } });

    const submitButton = screen.getByTestId("send-data-btn");
    fireEvent.click(submitButton);

    expect(sendDataToBackend).toHaveBeenCalledTimes(1);
    expect(sendDataToBackend).toHaveBeenCalledWith({ movingAverageFactor: 20 });
  });

  test("Submit sends both values when both inputs are changed", () => {
    render(<Wrapper sendDataToBackend={sendDataToBackend}/>);

    const thresholdInput = screen.getByTestId("threshold-input");
    const mafInput = screen.getByTestId("moving-average-input");

    fireEvent.change(thresholdInput, { target: { value: "30" } });
    fireEvent.change(mafInput, { target: { value: "40" } });

    const submitButton = screen.getByTestId("send-data-btn");
    fireEvent.click(submitButton);

    expect(sendDataToBackend).toHaveBeenCalledTimes(1);
    expect(sendDataToBackend).toHaveBeenCalledWith({
      threshold: 30,
      movingAverageFactor: 40,
    });
  });

  test("Submit does not send data when nothing has changed", () => {
    render(<Wrapper sendDataToBackend={sendDataToBackend}/>);
    
    const submitButton = screen.getByTestId("send-data-btn");
    fireEvent.click(submitButton);

    expect(sendDataToBackend).not.toHaveBeenCalled();
  });
});
