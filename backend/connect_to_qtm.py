# Import the pylsl library
from pylsl import StreamInlet, resolve_stream

# Step 1: Resolve a stream of type 'Force'
print("Looking for a stream of type 'Force'...")
streams = resolve_stream('type', 'Force')

# Create an inlet to read from the stream
inlet = StreamInlet(streams[0])

print("Stream found. Pulling and logging data...")

# Step 2: Create a loop to pull and log samples
while True:
    # Step 3: Pull sample from the inlet
    sample, timestamp = inlet.pull_sample()

    # Print the incoming data
    print(f"Timestamp: {timestamp}, Sample: {sample}")
