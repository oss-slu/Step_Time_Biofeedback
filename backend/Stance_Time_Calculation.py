import numpy as np

def calculate_stance_time(force_data, threshold, moving_avg_factor=2):
    """
    Calculate stance time from force data collected from a Bertec treadmill.

    Parameters:
    force_data (list): A list of tuples where each tuple contains (time, force).
    threshold (float): The force threshold to determine heel strikes and toe-offs.
    moving_avg_factor (int): The moving average factor.

    Returns:
    list: A list of calculated stance times in seconds
    """
    stance_times = []
    stance_time_moving_averages = []
    stance_start_time = None

    for time, force in force_data:
        # Detect heel strike
        if force >= threshold and stance_start_time is None:
            stance_start_time = time  # Start timing for a stance

        # Detect toe-off
        elif force < threshold and stance_start_time is not None:
            stance_time = time - stance_start_time  # Calculate stance duration
            stance_times.append(stance_time)
            stance_start_time = None  # Reset for the next stance

    if moving_avg_factor < 2:
        return stance_times

    for i in range(len(stance_times)):
        if i < moving_avg_factor - 1:
            stance_time_moving_averages.append(stance_times[i])
        else:
            moving_average = np.mean(stance_times[i - moving_avg_factor + 1:i+1])
            stance_time_moving_averages.append(moving_average)

    return stance_time_moving_averages
