import numpy as np

def calculate_step_time(force_data, threshold=20.0, moving_avg_factor=2):
    """
    Calculate step time from force data collected from a Bertec treadmill.

    Parameters:
    force_data (list): A list of tuples where each tuple contains (time, force).
    threshold (float): The force threshold to determine heel strikes and toe-offs.
    moving_avg_factor (int): The moving average factor.

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

    if moving_avg_factor < 2:
        return step_times

    for i in range(len(step_times)):
        if i < moving_avg_factor - 1:
            step_time_moving_averages.append(step_times[i])
        else:
            moving_average = np.mean(step_times[i - moving_avg_factor + 1:i+1])
            step_time_moving_averages.append(moving_average)

    return step_time_moving_averages
