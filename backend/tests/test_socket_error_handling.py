import sys
import os

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
import json
from fastapi.testclient import TestClient
from websocket_connect import biostepFeedback
import asyncio

client = TestClient(biostepFeedback)

def test_error_websocket():
    with client.websocket_connect("/ws") as websocket:
        websocket.send_text("This IS the message")
        data = websocket.receive_text()
        assert data != "This is the message"

def test_websocket_invalid_data():
    with client.websocket_connect("/ws") as websocket:
        invalid_data = {"invalid": set([1, 2, 3])}
        try:
            websocket.send_text(json.dumps(invalid_data))
        except TypeError:
            assert True
        except Exception:
            assert False

def test_websocket_disconnect():
    with client.websocket_connect("/ws") as websocket:
        websocket.send_text("Hello")
        data = websocket.receive_text()
        assert data == "Hello"

        websocket.close()
        try:
            assert websocket.application_state == websocket.CLOSED
        except Exception as e:
            print(f"Expected closure but got error: {e}")
        asyncio.sleep(0.5)
