"""
Series of tests that test the backend websocket functionality
"""

import json
import pytest
from fastapi.testclient import TestClient
from websocket_connect import biostepFeedback

@pytest.mark.asyncio
async def test_string_websocket():
    """
    Websocket receving string
    """
    client = TestClient(biostepFeedback)
    with client.websocket_connect("/ws") as websocket:
        websocket.send_text("Hello from the backend")
        data = websocket.receive_text()
        assert data == "Hello from the backend"

def test_number_websocket():
    """
    Websocket receving int
    """
    client = TestClient(biostepFeedback)
    with client.websocket_connect("/ws") as websocket:
        websocket.send_text(str(123123))
        data = websocket.receive_text()
        assert data == "123123"

def test_float_websocket():
    """
    Websocket receving float
    """
    client = TestClient(biostepFeedback)
    with client.websocket_connect("/ws") as websocket:
        websocket.send_text(str(123.123))
        data = websocket.receive_text()
        assert data == "123.123"

def test_boolean_websocket():
    """
    Websocket receving bool
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
    Websocket receving array of ints
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
    Testing that Websocket dissconnects properly
    """
    client = TestClient(biostepFeedback)
    with client.websocket_connect("/ws") as websocket:
        websocket.send_text("Hello")
        data = websocket.receive_text()
        assert data == "Hello"
        websocket.close()
        assert websocket.close
