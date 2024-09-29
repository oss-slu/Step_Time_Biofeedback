import pytest
from fastapi.testclient import TestClient
from websocketConnect import biostepFeedback
import json

@pytest.mark.asyncio
async def test_string_websocket():
    client = TestClient(biostepFeedback)
    with client.websocket_connect("/ws") as websocket:
        websocket.send_text("Hello from the backend")
        data = websocket.receive_text()
        assert data == "Hello from the backend"


def test_number_websocket():
    client = TestClient(biostepFeedback)
    with client.websocket_connect("/ws") as websocket:
        websocket.send_text(str(123123))
        data = websocket.receive_text()
        assert data == "123123"


def test_float_websocket():
    client = TestClient(biostepFeedback)
    with client.websocket_connect("/ws") as websocket:
        websocket.send_text(str(123.123))
        data = websocket.receive_text()
        assert data == "123.123"


def test_boolean_websocket():
    client = TestClient(biostepFeedback)
    with client.websocket_connect("/ws") as websocket:
        websocket.send_text(str(True))
        data = websocket.receive_text()
        assert data == "True"


def test_error_websocket():
    client = TestClient(biostepFeedback)
    with client.websocket_connect("/ws") as websocket:
        websocket.send_text("This IS the message")
        data = websocket.receive_text()
        assert data != "This is the message"


def test_array_websocket():
    client = TestClient(biostepFeedback)
    with client.websocket_connect("/ws") as websocket:
        websocket.send_text(json.dumps([1, 2, 3, 4, 5]))
        data = websocket.receive_text()
        assert data == "[1, 2, 3, 4, 5]"