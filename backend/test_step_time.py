import unittest
from Step_Time_Calculation import calculate_step_time  
from target_zone_estimation import estimate_target_zone


class TestCalculateStepTime(unittest.TestCase):

    def test_step_time_below_threshold(self):
        # All values below threshold should yield no step times
        force_data = [(0.0, 0), (0.1, 0), (0.2, 10), (0.3, 15)]
        step_times = calculate_step_time(force_data)
        self.assertEqual(step_times, [])  # Expected: []
     
    def test_step_time_calculation(self):
        # Adjusted force data
        force_data = [
            (0.0, 0), (0.1, 25), (0.2, 30), (0.3, 0),  # First step
            (0.4, 0), (0.5, 25), (0.6, 30), (0.7, 0)   # Second step
        ]
        step_times = calculate_step_time(force_data)
        # Check if the step times are approximately equal to expected values
        self.assertAlmostEqual(step_times[0], 0.2, places = 2)
        self.assertAlmostEqual(step_times[1], 0.2, places = 2) 

    def test_moving_average(self):
        force_data = [
            (0.0, 0), (0.1, 25), (0.2, 30), (0.3, 0),
            (0.4, 0), (0.5, 25), (0.6, 30), (0.7, 0)
        ]
        step_times = calculate_step_time(force_data)
        # Check if the step times are approximately equal to expected values
        self.assertAlmostEqual(step_times[0], 0.2, places = 2)
        self.assertAlmostEqual(step_times[1], 0.2, places = 2) 


    def test_estimate_target_zone(self):
        # Test target zone estimation
        step_times = [0.2, 0.3, 0.4]
        target_zone = estimate_target_zone(step_times)

        self.assertEqual(target_zone['min'], min(step_times))
        self.assertEqual(target_zone['max'], max(step_times))
        self.assertEqual(target_zone['average'], sum(step_times) / len(step_times))

    def test_no_movement_target_zone(self):
        # Test when no step times
        step_times = []
        target_zone = estimate_target_zone(step_times)

        self.assertEqual(target_zone, {"min": 0.0, "max": 0.0, "average": 0.0})

if __name__ == '__main__':
    unittest.main()
