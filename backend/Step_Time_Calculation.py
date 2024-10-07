import numpy as np

def calculate_step_time(force_data, threshold=20.0):
    """
    Calculate step time from force data collected from a Bertec treadmill.

    Parameters:
    force_data (list): A list of tuples where each tuple contains (time, force).
    threshold (float): The force threshold to determine heel strikes and toe-offs.

    Returns:
    list: A list of calculated step times in seconds
    """
    step_times = []
    step_time_moving_averages = []
    step_start_time = None

    for time, force in force_data:
        # Detect heel strike
        if force >= threshold and step_start_time is None:
            step_start_time = time  # Start timing for a step

        # Detect toe-off
        elif force < threshold and step_start_time is not None:
            step_time = time - step_start_time  # Calculate step duration
            step_times.append(step_time)
            step_start_time = None  # Reset for the next step
            
    
    for i in range(len(step_times)):
        if i == 0:
            step_time_moving_averages.append(step_times[i])  # First step time stays the same
        else:
            moving_average = np.mean(step_times[i-1:i+1])  # 2-point moving average
            step_time_moving_averages.append(moving_average)  
            
    return step_times

