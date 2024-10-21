import unittest
from Step_Time_Calculation import calculate_step_time  

class TestCalculateStepTime(unittest.TestCase):

    def test_step_time_avgs_below_threshold(self):
        # All values below threshold should yield no step times
        force_data = [(0.0, 0), (0.1, 0), (0.2, 10), (0.3, 15)]
        step_time_moving_averages = calculate_step_time(force_data)
        self.assertEqual(step_time_moving_averages, [])  # Expected: []
    
    def test_step_time_avgs_at_or_above_threshold(self):
        force_data = [
            (0.0, 0), (0.1, 30), (0.2, 25), (0.3, 35),  
            (0.4, 40), (0.5, 20), (0.6, 10), (0.7, 0)   
        ]
        step_time_moving_averages = calculate_step_time(force_data, 30)
        self.assertAlmostEqual(step_time_moving_averages[0], 0.1, places=2)
        self.assertAlmostEqual(step_time_moving_averages[1], 0.15, places=2)
     
    def test_moving_avg_factor_below_two(self):
        force_data = [
            (0.0, 0), (0.1, 25), (0.2, 30), (0.3, 0),  
            (0.4, 0), (0.5, 25), (0.6, 30), (0.7, 0)   
        ]
        step_times = calculate_step_time(force_data, moving_avg_factor=1)
        self.assertAlmostEqual(step_times[0], 0.2, places = 2)
        self.assertAlmostEqual(step_times[1], 0.2, places = 2) 

    def test_moving_avg_factor_above_two(self):
        force_data = [
            (0.0, 0), (0.1, 25), (0.2, 30), (0.3, 0),  # 0.2 
            (0.4, 40), (0.5, 45), (0.6, 50), (0.7, 0), # 0.3
            (0.8, 20), (0.9, 25), (1.0, 0), (1.1, 0),  # 0.2
            (1.2, 40), (1.3, 45), (1.4, 50), (1.5, 0), # 0.2
        ]
        step_time_moving_averages = calculate_step_time(force_data, moving_avg_factor=3)
        self.assertAlmostEqual(step_time_moving_averages[0], 0.2, places=2)
        self.assertAlmostEqual(step_time_moving_averages[1], 0.3, places=2)
        self.assertAlmostEqual(step_time_moving_averages[2], 0.233, places=3)
        self.assertAlmostEqual(step_time_moving_averages[2], 0.233, places=3)
