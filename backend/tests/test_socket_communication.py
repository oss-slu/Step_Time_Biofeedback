import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
import json
from fastapi.testclient import TestClient
from websocket_connect import biostepFeedback

client = TestClient(biostepFeedback)

def test_string_websocket():
    with client.websocket_connect("/ws") as websocket:
        websocket.send_text("Hello from the backend")
        data = websocket.receive_text()
        assert data == "Hello from the backend"

def test_number_websocket():
    with client.websocket_connect("/ws") as websocket:
        websocket.send_text(str(123123))
        data = websocket.receive_text()
        assert data == "123123"

def test_float_websocket():
    with client.websocket_connect("/ws") as websocket:
        websocket.send_text(str(123.123))
        data = websocket.receive_text()
        assert data == "123.123"

def test_boolean_websocket():
    with client.websocket_connect("/ws") as websocket:
        websocket.send_text(str(True))
        data = websocket.receive_text()
        assert data == "True"

def test_array_websocket():
    with client.websocket_connect("/ws") as websocket:
        websocket.send_text(json.dumps([1, 2, 3, 4, 5]))
        data = websocket.receive_text()
        assert data == "[1, 2, 3, 4, 5]"
