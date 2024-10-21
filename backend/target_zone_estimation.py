import json
import asyncio
from Step_Time_Calculation import calculate_step_time


real_force_data = [
    (0.00000, 159.548187),  
    (0.00093, 159.304047),  
    (0.01296, 158.327484),  
    (0.01620, 158.327484), 
    (0.05370, 157.106781),
    (0.05972, 156.862640)   
]

threshold = 20.0

async def handle_data_streaming(websocket):
    """Handle data streaming from sample data to the WebSocket."""
    for force_data in real_force_data:
        try:
            # Check if all force values are below the threshold
            if all(force < threshold for _, force in [force_data]):
                step_times = [0.0]
            else:
                step_times = calculate_step_time([force_data], threshold)
            
            # Estimate the target zone based on step times
            target_zone = estimate_target_zone(step_times)
            message = {
                "step_times": step_times,
                "target_zone": target_zone
            }
            # Send the data to the frontend through WebSocket
            await websocket.send_text(json.dumps(message))
            await asyncio.sleep(1)  
        except Exception as e:
            print(f"Error occurred during data handling: {e}")

def estimate_target_zone(step_times):
    """Estimate target zones based on step times."""
    if not step_times:
        return {"min": 0.0, "max": 0.0, "average": 0.0}
    return {
        "min": min(step_times),
        "max": max(step_times),
        "average": sum(step_times) / len(step_times),
    }
