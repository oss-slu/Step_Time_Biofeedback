import sys
import os

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
import json
from fastapi.testclient import TestClient
from websocket_connect import biostepFeedback

client = TestClient(biostepFeedback)

def test_threshold_update():
    with client.websocket_connect("/ws") as websocket:
        test_threshold = 30.5
        websocket.send_text(json.dumps({"threshold": test_threshold}))

        response = websocket.receive_text()
        response_data = json.loads(response)

        assert response_data["threshold"] == test_threshold
