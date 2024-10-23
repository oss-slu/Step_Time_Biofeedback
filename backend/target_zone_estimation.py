import json
import asyncio
from Step_Time_Calculation import calculate_step_time

real_force_data = [
    (0.00000, 159.548187),  
    (0.00093, 159.304047),  
    (0.01296, 10.327484),   
    (0.01620, 159.327484),  
    (0.02000, 5.106781),    
    (0.03000, 158.862640),  
    (0.04000, 4.862640),    
    (0.05000, 160.000000), 
    (0.06000, 6.000000),   
]

threshold = 20.0

async def handle_data_streaming(websocket):
    """Handle data streaming from sample data and print it for testing."""
    accumulated_data = []  # To accumulate force data over time

    for force_data in real_force_data:
        try:
            print(f"Force Data: {force_data}")  # Debug print to inspect the input data
            
            # Accumulate force data over time
            accumulated_data.append(force_data)

            # Only process once we have multiple data points
            if len(accumulated_data) > 1:
                step_times = calculate_step_time(accumulated_data, threshold)
                print(f"Calculated step times: {step_times}")
            
                # Estimate the target zone based on step times
                target_zone = estimate_target_zone(step_times)
                message = {
                    "step_times": step_times,
                    "target_zone": target_zone
                }
                await websocket.send_text(json.dumps(message))
                await asyncio.sleep(1)  
            await asyncio.sleep(1)
        except Exception as e:
            print(f"Error occurred during data handling: {e}")

def estimate_target_zone(step_times):
    """Estimate target zones based on step times."""
    if not step_times or len(step_times) < 2:
        return {"min": 0.0, "max": 0.0, "average": 0.0}
    return {
        "min": min(step_times),
        "max": max(step_times),
        "average": sum(step_times) / len(step_times),
    }
