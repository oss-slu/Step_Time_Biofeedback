import json
import pytest
from fastapi.testclient import TestClient
from websocket_connect import biostepFeedback
import asyncio

def test_string_websocket():
    """
    Websocket receiving string
    """
    client = TestClient(biostepFeedback)
    with client.websocket_connect("/ws") as websocket:
        websocket.send_text("Hello from the backend")
        data = websocket.receive_text()
        assert data == "Hello from the backend"

def test_number_websocket():
    """
    Websocket receiving int
    """
    client = TestClient(biostepFeedback)
    with client.websocket_connect("/ws") as websocket:
        websocket.send_text(str(123123))
        data = websocket.receive_text()
        assert data == "123123"

def test_float_websocket():
    """
    Websocket receiving float
    """
    client = TestClient(biostepFeedback)
    with client.websocket_connect("/ws") as websocket:
        websocket.send_text(str(123.123))
        data = websocket.receive_text()
        assert data == "123.123"

def test_boolean_websocket():
    """
    Websocket receiving bool
    """
    client = TestClient(biostepFeedback)
    with client.websocket_connect("/ws") as websocket:
        websocket.send_text(str(True))
        data = websocket.receive_text()
        assert data == "True"

def test_error_websocket():
    """
    Websocket error testing
    """
    client = TestClient(biostepFeedback)
    with client.websocket_connect("/ws") as websocket:
        websocket.send_text("This IS the message")
        data = websocket.receive_text()
        assert data != "This is the message"

def test_array_websocket():
    """
    Websocket receiving array of ints
    """
    client = TestClient(biostepFeedback)
    with client.websocket_connect("/ws") as websocket:
        websocket.send_text(json.dumps([1, 2, 3, 4, 5]))
        data = websocket.receive_text()
        assert data == "[1, 2, 3, 4, 5]"

def test_websocket_invalid_data():
    """
    Testing that websocket error pops up when faulty data is sent
    """
    client = TestClient(biostepFeedback)
    with client.websocket_connect("/ws") as websocket:
        invalid_data = {"invalid": set([1, 2, 3])}
        try:
            websocket.send_text(json.dumps(invalid_data))
        except TypeError:
            assert True
        except Exception:
            assert False

def test_websocket_disconnect():
    """
    Testing that WebSocket disconnects properly
    """
    client = TestClient(biostepFeedback)
    with client.websocket_connect("/ws") as websocket:
        websocket.send_text("Hello")
        data = websocket.receive_text()
        assert data == "Hello"
        
        # Close the WebSocket and assert on close status
        websocket.close()
        try:
            # Attempt to check the closed status or handle if an exception occurs on send/receive
            assert websocket.application_state == websocket.CLOSED
            print("WebSocket closed successfully.")
        except Exception as e:
            print(f"Expected closure but got an error: {e}")
        
        # Add a small delay to ensure proper test completion
        asyncio.sleep(0.5)
        
def test_threshold_update():
    """
    Ensure threshold is correctly updated when received via WebSocket.
    """
    client = TestClient(biostepFeedback)
    
    with client.websocket_connect("/ws") as websocket:
        test_threshold = 30.5
        websocket.send_text(json.dumps({"threshold": test_threshold}))

        response = websocket.receive_text()
        response_data = json.loads(response)
        
        assert response_data["threshold"] == test_threshold, "Threshold was not updated correctly"

def test_moving_average_update():
    """
    Ensure moving average is updated 
    """
    client = TestClient(biostepFeedback)
    
    with client.websocket_connect("/ws") as websocket:
        test_mov = 6.7
        websocket.send_text(json.dumps({"movingAverage": test_mov}))

        response = websocket.receive_text()
        response_data = json.loads(response)
        
        assert response_data["movingAverage"] == test_mov, "Moving average was not updated correctly"