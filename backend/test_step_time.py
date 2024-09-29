import unittest
from Step_Time_Calculation import calculate_step_time 

class TestCalculateStepTime(unittest.TestCase):

    def test_step_time_below_threshold(self):
        # All values below threshold should yield no step times
        force_data = [(0.0, 0), (0.1, 0), (0.2, 10), (0.3, 15)]
        step_times, _ = calculate_step_time(force_data)
        self.assertEqual(step_times, [])  # Expected: []

    def test_step_time_calculation(self):
        # Expecting first step time to be 0.20s and second to be 0.20s
        force_data = [
            (0.0, 0), (0.1, 25), (0.2, 30), (0.3, 0),  # First step
            (0.4, 0), (0.5, 25), (0.6, 30), (0.7, 0)   # Second step
        ]
        step_times, _ = calculate_step_time(force_data)
        self.assertEqual(step_times, ['0.20', '0.20'])  # Expected: ['0.20', '0.20']

    def test_moving_average(self):
        force_data = [
            (0.0, 0), (0.1, 25), (0.2, 30), (0.3, 0),
            (0.4, 0), (0.5, 25), (0.6, 30), (0.7, 0)
        ]
        _, moving_averages = calculate_step_time(force_data)
        self.assertEqual(moving_averages, ['0.20', '0.20'])  # Adjust expected as per data

if __name__ == '__main__':
    unittest.main()
