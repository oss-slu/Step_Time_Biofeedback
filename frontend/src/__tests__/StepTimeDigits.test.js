import { render, screen } from "@testing-library/react";
import StepTimeDigits from "../StepTimeDigits";

describe("Step Time View Structure", () => {
    const testStepTime = {
        left: 0,
        right: 0, 
        targetZones: {
            left: {min: 0, max:0},
            right: {min: 0, max:0},
        },
    };

    test("Target Zone Structure Correctly Rendered", () => {
        render(<StepTimeDigits stepTime={testStepTime} />);
        expect(screen.getByTestId('target-zones-values')).toBeInTheDocument();
        expect(screen.getByTestId('target-zones-title')).toBeInTheDocument();
        expect(screen.getByTestId('target-zones-left')).toBeInTheDocument();
        expect(screen.getByTestId('target-zones-right')).toBeInTheDocument();
    });

    test("Step Time Value Structure Correctly Rendered", () => {
        render(<StepTimeDigits stepTime={testStepTime} />);
        expect(screen.getByTestId('current-step-time-values')).toBeInTheDocument();
        expect(screen.getByTestId('current-step-time-left')).toBeInTheDocument();
        expect(screen.getByTestId('current-step-time-right')).toBeInTheDocument();
    });
}); 

describe("Step Time Data", () => {
    let testStepTime;

    beforeEach(() => {
        testStepTime = {
            left: 12,
            right: 27,
            targetZones: {
                left: {min: 5, max: 10},
                right: {min: 3, max: 20},
            },
        }; 
    });

    test("Initial Target Zones correctly rendered", () => {
        render(<StepTimeDigits stepTime={testStepTime}/>);
        expect(screen.getByTestId('target-zones-left').textContent).toBe('5.0000-10.0000');
        expect(screen.getByTestId('target-zones-right').textContent).toBe('3.0000-20.0000');
    });

    test("Initial Current Step Time Values correctly rendered", () => {
        render(<StepTimeDigits stepTime={testStepTime}/>);
        expect(screen.getByTestId('current-step-time-left').textContent).toBe('12');
        expect(screen.getByTestId('current-step-time-right').textContent).toBe('27');
    });
}); 