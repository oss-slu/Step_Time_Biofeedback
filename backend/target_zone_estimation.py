import asyncio
import json
import random
from Step_Time_Calculation import calculate_step_time  # Ensure you have this imported

def handle_threshold (threshold =20.0): 
    return threshold
    
async def handle_data(websocket, threshold=None):
    if threshold is None:
        threshold = handle_threshold() 
        
    # Simulate or fetch real-time force data
    force_data_stream = simulate_force_data()
    
    try:
        while True:
            # Collect force data
            force_data = [next(force_data_stream) for _ in range(100)]  # Simulate a batch of 100 data points

            # Check if all force values are below the threshold
            if all(force < threshold for _, force in force_data):
                step_times = [0.0]  # No movement detected
            else:
                # Calculate step times
                step_times = calculate_step_time(force_data, threshold)

            # Estimate target zones
            target_zone = estimate_target_zone(step_times)

            # Package the step times and target zone into a JSON response
            message = {
                "step_times": step_times,
                "target_zone": target_zone
            }

            # Send the data to the frontend through WebSocket
            await websocket.send_text(json.dumps(message))
            
            await asyncio.sleep(1)  # Simulate delay between data packets

    except Exception as e:
        print(f"Error occurred during data handling: {e}")

def simulate_force_data():
    """Simulate a generator function for force data."""
    time_step = 0
    while True:
        time_step += 0.1 
        force = random.uniform(0, 50) 
        yield (time_step, force)

def estimate_target_zone(step_times):
    """Estimate target zones based on step times."""
    if not step_times:
        return {"min": 0.0, "max": 0.0, "average": 0.0}

    return {
        "min": min(step_times),
        "max": max(step_times),
        "average": sum(step_times) / len(step_times),
    }
