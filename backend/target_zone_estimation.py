import json
import asyncio
<<<<<<< HEAD
import os
from Step_Time_Calculation import calculate_step_time
=======
from Step_Time_Calculation import calculate_step_time
<<<<<<< HEAD

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
>>>>>>> origin/main
=======
import os
>>>>>>> d734243782d49b7addb01e6caa5917d13e6d7434

threshold = 20.0
data_file_path = os.path.join(os.path.dirname(__file__), "tied_belt_OSS_f_1.tsv")

async def handle_data_streaming(websocket):
<<<<<<< HEAD
    """Handle data streaming from file and send calculated step times and target zones."""
    accumulated_data = [] 

    async for force_data in load_data_from_file(data_file_path):
        try:
            print(f"Force Data: {force_data}")  # Debug print to inspect the input data
            
            accumulated_data.append(force_data)

            if len(accumulated_data) > 1:
                if force_data[1] < threshold:
                    step_times = [0.0, 0.0]
                else:
                    step_times = calculate_step_time(accumulated_data)

                print(f"Calculated step times: {step_times}")  # Debug print for calculated step times
                
=======
    """Handle data streaming from sample data and print it for testing."""
    accumulated_data = [] # To accumulate force data over time

    for force_data in real_force_data:
        try:
<<<<<<< HEAD
            print(f"Force Data: {force_data}")  # Debug print to inspect the input data

=======
            print(f"Force Data: {force_data}") # Debug print to inspect the input data
            
>>>>>>> d734243782d49b7addb01e6caa5917d13e6d7434
            # Accumulate force data over time
            accumulated_data.append(force_data)

            # Only process once we have multiple data points
            if len(accumulated_data) > 1:
                step_times = calculate_step_time(accumulated_data, threshold)
                print(f"Calculated step times: {step_times}")
<<<<<<< HEAD

=======
>>>>>>> d734243782d49b7addb01e6caa5917d13e6d7434
                # Estimate the target zone based on step times
>>>>>>> origin/main
                target_zone = estimate_target_zone(step_times)
                message = {
                    "step_times": step_times,
                    "target_zone": target_zone
                }
                await websocket.send_text(json.dumps(message))
<<<<<<< HEAD
                await asyncio.sleep(1)
=======
                await asyncio.sleep(1) 
>>>>>>> d734243782d49b7addb01e6caa5917d13e6d7434
            await asyncio.sleep(1)
<<<<<<< HEAD

        except Exception as e:
            print(f"Error occurred during data handling: {e}")
<<<<<<< HEAD
            break  
    
=======
            break
            
>>>>>>> d734243782d49b7addb01e6caa5917d13e6d7434
async def load_data_from_file(file_path):
    """Load force data from a TSV file."""
    with open(file_path, "r") as file:
        # Skip headers
        for line in file:
            if line.startswith("SAMPLE") or line.strip() == "":
                continue
            parts = line.strip().split("\t")
            if len(parts) < 4: 
                continue
<<<<<<< HEAD
            try:
=======
            try: 
>>>>>>> d734243782d49b7addb01e6caa5917d13e6d7434
                time = float(parts[1])  # Time is in the second column
                force_z = float(parts[3])  # Vertical force is in the fourth column
                yield (time, force_z)
            except ValueError:
                print(f"Skipping invalid line: {line.strip()}")
<<<<<<< HEAD
=======
        except Exception as error:
            print(f"Error occurred during data handling: {error}")
>>>>>>> origin/main

=======
                
>>>>>>> d734243782d49b7addb01e6caa5917d13e6d7434
def estimate_target_zone(step_times):
    """Estimate target zones based on step times."""
    if not step_times or len(step_times) < 2:
        return {"min": 0.0, "max": 0.0, "average": 0.0}
    return {
        "min": min(step_times),
        "max": max(step_times),
        "average": sum(step_times) / len(step_times),
    }
