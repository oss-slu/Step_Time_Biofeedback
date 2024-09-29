<<<<<<< HEAD
Connect_to_qtm
=======
# Project Name
>>>>>>> b4c3b857534470dae660a57b723892af41b488d8

## Description
This code streams data from a device using the Lab Streaming Layer (LSL) protocol. It demonstrates how to connect to a data stream, pull samples, and print the output using Python.

## Requirements

Before running this code, make sure you have the following installed on your machine:

### Python Packages
You'll need the Python `pylsl` package to handle the LSL protocol. You can install it using `pip`:
```bash
pip install pylsl

System Requirements
For Windows:
Download and install the Lab Streaming Layer (LSL) library from the official GitHub releases page.
After downloading, follow the installation instructions specific to Windows.

For Mac:
To install the LSL library on Mac using Homebrew:

bash

brew install labstreaminglayer/tap/lsl

For Linux:
To install LSL on Linux, use the following steps:

bash
sudo apt update
sudo apt install build-essential libboost-all-dev cmake git
git clone https://github.com/labstreaminglayer/liblsl.git
cd liblsl
mkdir build && cd build
cmake ..
make
sudo make install
pip install pylsl

For WSL (Windows Subsystem for Linux):
If you're using WSL, follow the Linux installation steps:

bash
sudo apt update
sudo apt install build-essential libboost-all-dev cmake git
git clone https://github.com/labstreaminglayer/liblsl.git
cd liblsl
mkdir build && cd build
cmake ..
make
sudo make install
pip install pylsl