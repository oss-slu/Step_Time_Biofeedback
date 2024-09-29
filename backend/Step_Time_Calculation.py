import numpy as np

def calculate_step_time(force_data, threshold=20.0):
    """
    Calculate step time from force data collected from a Bertec treadmill.

    Parameters:
    force_data (list): A list of tuples where each tuple contains (time, force).
    threshold (float): The force threshold to determine heel strikes and toe-offs.

    Returns:
    list: A list of calculated step times in seconds and moving averages.
    """
    step_times = []
    step_start_time = None

    for time, force in force_data:
        # Detect heel strike
        if force > threshold and step_start_time is None:
            step_start_time = time  # Start timing for a step

        # Detect toe-off
        elif force < threshold and step_start_time is not None:
            step_time = time - step_start_time  # Calculate step duration
            step_times.append(step_time)
            step_start_time = None  # Reset for the next step

    # Calculate moving average of step times
    moving_averages = []
    if step_times:
        for i in range(len(step_times)):
            if i < 1:
                moving_averages.append(step_times[i])  # First time is not a moving average
            else:
                moving_average = np.mean(step_times[i-1:i+1])  # 2-moving average
                moving_averages.append(moving_average)

        # Format output to two decimal places
        formatted_step_times = [f"{time:.2f}" for time in step_times]
        formatted_moving_averages = [f"{avg:.2f}" for avg in moving_averages]
    else:
        formatted_step_times = []
        formatted_moving_averages = []

    return formatted_step_times, formatted_moving_averages

