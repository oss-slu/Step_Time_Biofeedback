
# Step-Time Biofeedback Backend

## Description
This README provides instructions on how to install necessary dependencies, and run the tests for `Step_Time_Calculation.py`

## Prerequisites
Before running any code, make sure you have the following installed on your machine:

### Python Packages
1) You'll need the Python `pylsl` package to handle the LSL protocol. You can install it using `pip`:
```
pip install pylsl
```
2) You'll also need the Python `numpy` package that is required for performing calculations like the moving average for step times.

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

## Running Unit Tests

### How to run the test
Unit tests are provided to ensure the correctness of the step time calculations. Follow the steps below to run the tests successfully:

1) Navigate to the backend directory.
2)Run the test file using Python's unittest module:
```
python -m unittest test_step_time.py
```
### Test Cases
The tests from `test_step_time` cover:
Step time calculation for values below the threshold (20N).
Step time output as a moving average of 2 steps.
Step time output as a continuous number in the format 00.00.

### Sample Data for Testing
The function uses sample force data in the format (time, force) to calculate step times. 
