py
# Stance-Time Biofeedback Backend

## Description
This README provides instructions on how to install necessary dependencies, and run the STB backend tests. 

## Prerequisites
Before running any code, make sure you're in your Python virtual environment. Once activated, you can install the required dependencies by running:
```
pip install -r requirements.txt
```
This will install all the required Python libraries listed in the requirements.txt file.

### Python Packages
1) You'll need the Python `pylsl` package to handle the LSL protocol. You can install it using `pip`:
```
pip install pylsl
```
2) You'll also need the Python `numpy` package that is required for performing calculations like the moving average for stance times.

Install it using:
```
pip install numpy
```
### System Requirements

**For Windows:**
Download and install the Lab Streaming Layer (LSL) library from the official GitHub releases page.
After downloading, follow the installation instructions specific to Windows. 

After successfully downloading it, you should be able to run: 
```
pip install numpy
```
This command will automatically download and install the latest version of NumPy from the Python Package Index (PyPI)

**For Mac:**
To install the LSL library on Mac using Homebrew:

```
brew install labstreaminglayer/tap/lsl
```
**For Linux:**
To install LSL on Linux, use the following steps:

```
sudo apt update
sudo apt install build-essential libboost-all-dev cmake git
git clone https://github.com/labstreaminglayer/liblsl.git
cd liblsl
mkdir build && cd build
cmake ..
make
sudo make install
pip install pylsl
```

**For WSL (Windows Subsystem for Linux):**
If you're using WSL, follow the Linux installation steps:

```
sudo apt update
sudo apt install build-essential libboost-all-dev cmake git
git clone https://github.com/labstreaminglayer/liblsl.git
cd liblsl
mkdir build && cd build
cmake ..
make
sudo make install
pip install pylsl
```
**To install `numpy` on Linux and WSL, just run the following command:**
```
pip install numpy
```
**For Mac, run:**
```
brew install numpy
```

## Running Tests

### To run all tests
The unit tests verify the accuracy of the stance time calculations and target zone estimations. Follow these steps to run the tests successfully:

1) Navigate to the backend directory.
2) Run the the following:
```
pytest -s tests
```
#### To run a specific test file:
```
pytest -s tests/test_stance_time.py
pytest -s tests/test_threshold_update.py
pytest -s tests/test_socket_communication.py
pytest -s tests/test_socket_error_handling.py
```
### Test Cases
`test_stance_time.py`

- Stance time calculation when values are below the threshold (20N).
- Stance time output as a moving average of two steps.
- Target zone estimation based on calculated stance times.
- Real data validation using sample data provided in tied_belt_OSS_f_1.tsv.

`test_threshold_update.py`

- Tests threshold updates received via websocket.
- Ensures correct internal state update upon receiving new threshold values.

`test_socket_communication.py`

- Validates basic websocket communication between client and server.
- Tests connection, message send/receive functionality using FastAPI's websocket.

`test_socket_error_handling.py`

- Simulates malformed or invalid websocket messages.
- Verifies graceful error handling and system robustness.

### Sample Data for Testing
Sample data should be in the format `(time, force)`, where `time` is the time point, and `force` represents the force measurement. The `calculate_stance_time` function calculates stance times from this data.
