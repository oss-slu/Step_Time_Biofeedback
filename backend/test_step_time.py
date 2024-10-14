import unittest
from Step_Time_Calculation import calculate_step_time  

class TestCalculateStepTime(unittest.TestCase):

    def test_step_time_below_threshold(self):
        # All values below threshold should yield no step times
        force_data = [(0.0, 0), (0.1, 0), (0.2, 10), (0.3, 15)]
        step_times = calculate_step_time(force_data)
        self.assertEqual(step_times, [])  # Expected: []
    
    def test_step_time_below_non_default_threshold(self):
        force_data = [(0.0, 0), (0.1, 10), (0.2, 20), (0.3, 25)]
        step_times = calculate_step_time(force_data, 30)
        self.assertEqual(step_times, [])
    
    def test_step_time_at_or_above_non_default_threshold(self):
        force_data = [
            (0.0, 0), (0.1, 25), (0.2, 30), (0.3, 25),  
            (0.4, 0), (0.5, 30), (0.6, 40), (0.7, 15)   
        ]
        step_times = calculate_step_time(force_data, 30)
        self.assertAlmostEqual(step_times[0], 0.1, places=2)
        self.assertAlmostEqual(step_times[1], 0.2, places=2)
     
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
    
    def test_non_default_moving_avg_factor(self):
        force_data = [
            (0.0, 0), (0.1, 25), (0.2, 30), (0.3, 25),  
            (0.4, 0), (0.5, 30), (0.6, 40), (0.7, 15)   
        ]
        step_times = calculate_step_time(force_data, 30)
        self.assertAlmostEqual(step_times[0], 0.1, places=2)
        self.assertAlmostEqual(step_times[1], 0.2, places=2)