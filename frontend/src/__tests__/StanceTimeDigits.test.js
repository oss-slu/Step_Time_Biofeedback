import { render, screen } from "@testing-library/react";
import StanceTimeDigits from "../StanceTimeDigits";

describe("Stance Time View Structure", () => {
    const testStanceTime = {
        left: 0,
        right: 0, 
        targetZones: {
            left: {min: 0, max:0},
            right: {min: 0, max:0},
        },
    };

    test("Target Zone Structure Correctly Rendered", () => {
        render(<StanceTimeDigits stanceTime={testStanceTime} />);
        expect(screen.getByTestId('target-zones-values')).toBeInTheDocument();
        expect(screen.getByTestId('target-zones-title')).toBeInTheDocument();
        expect(screen.getByTestId('target-zones-left')).toBeInTheDocument();
        expect(screen.getByTestId('target-zones-right')).toBeInTheDocument();
    });

    test("Stance Time Value Structure Correctly Rendered", () => {
        render(<StanceTimeDigits stanceTime={testStanceTime} />);
        expect(screen.getByTestId('current-stance-time-values')).toBeInTheDocument();
        expect(screen.getByTestId('current-stance-time-left')).toBeInTheDocument();
        expect(screen.getByTestId('current-stance-time-right')).toBeInTheDocument();
    });
}); 

describe("Stance Time Data", () => {
    let testStanceTime;

    beforeEach(() => {
        testStanceTime = {
            left: 12,
            right: 27,
            targetZones: {
                left: {min: 5, max: 10},
                right: {min: 3, max: 20},
            },
        }; 
    });

    test("Initial Target Zones correctly rendered", () => {
        render(<StanceTimeDigits stanceTime={testStanceTime}/>);
        expect(screen.getByTestId('target-zones-left').textContent).toBe('5.0000-10.0000');
        expect(screen.getByTestId('target-zones-right').textContent).toBe('3.0000-20.0000');
    });

    test("Initial Current Stance Time Values correctly rendered", () => {
        render(<StanceTimeDigits stanceTime={testStanceTime}/>);
        expect(screen.getByTestId('current-stance-time-left').textContent).toBe('12');
        expect(screen.getByTestId('current-stance-time-right').textContent).toBe('27');
    });
}); 