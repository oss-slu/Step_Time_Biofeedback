import json
import asyncio
import os
from Stance_Time_Calculation import calculate_stance_time

data_file_path = os.path.join(os.path.dirname(__file__), "tied_belt_OSS_f_1.tsv")

async def handle_data_streaming(websocket):
    """Handle data streaming from sample data and print it for testing."""
    accumulated_data = []
    threshold = 20

    async for force_data in load_data_from_file(data_file_path):
        try:
            try:
                data = await asyncio.wait_for(websocket.receive_text(), timeout=0.1)
                parsed_data = json.loads(data)
                threshold = list(parsed_data.values())[0]
                print(f"Received data: {str(parsed_data)}")
            except asyncio.TimeoutError:
                pass
            except json.JSONDecodeError:
                print("Received invalid JSON data")
            except Exception as e:
                print(f"Unexpected error: {e}")
                
            # Data manipulation to yield stance time (this part remains unchanged)
            time = force_data[0]
            force = force_data[1] * 2.4
            force_data = (time, force)
            force_message = {
                "message_type": "Force Data",
                "time": time,
                "force": force
            } 
            print(f"Force Data: {force_data}")  # Debug print to inspect the input data
            await websocket.send_text(json.dumps(force_message))

            # Accumulate force data over time
            accumulated_data.append(force_data)

            # Only process once we have multiple data points
            if len(accumulated_data) > 1:
                stance_times = calculate_stance_time(accumulated_data, threshold)
                print(f"Calculated stance times: {stance_times}")

                # Estimate the target zone based on stance times
                target_zone = estimate_target_zone(stance_times)
                message = {
                    "message_type": "Target Zone",
                    "stance_times": stance_times,
                    "target_zone": target_zone
                }
                await websocket.send_text(json.dumps(message))
                
                # Control message streaming rate
            await asyncio.sleep(1)  
        except Exception as e:
            print(f"Error occurred during data handling: {e}")
            break

async def load_data_from_file(file_path):
    """Load force data from a TSV file asynchronously."""
    try:
        with open(file_path, "r") as file:
            # Skip headers
            for line in file:
                if line.startswith("SAMPLE") or line.strip() == "":
                    continue
                parts = line.strip().split("\t")
                if len(parts) < 4:
                    continue

                try: 
                    time = float(parts[1])  # Time is in the second column
                    force_z = float(parts[3])  # Vertical force is in the fourth column
                    yield (time, force_z)
                except ValueError:
                    print(f"Skipping invalid line: {line.strip()}")
    except FileNotFoundError:
        print(f"File not found at path: {file_path}")

def estimate_target_zone(stance_times):
    """Estimate target zones based on stance times."""
    if not stance_times or len(stance_times) < 2:
        return {"min": 0.0, "max": 0.0, "average": 0.0}
    return {
        "min": min(stance_times),
        "max": max(stance_times),
        "average": sum(stance_times) / len(stance_times),
    }
