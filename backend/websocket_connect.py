"""
This modual is for testing how the websockets connect from the frontend to backend
"""

import asyncio
from fastapi import FastAPI, WebSocket, WebSocketDisconnect

biostepFeedback = FastAPI()

@biostepFeedback.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    """
    Awaits for the message from the frontend to unsure connection is there
    """
    print("Waiting for Connection")

    try:
        await websocket.accept()
        print("Connection accepted")
    except asyncio.TimeoutError:
        print("Connection timed out")
        return
    except OSError as error:
        print(f"Network error occurred: {error}")
        return
    except ValueError as error:
        print(f"Value error occurred: {error}")
        return

    while True:
        try:
            data = await websocket.receive_text()
            await websocket.send_text()
            print(f"Received and sent back: {data}")
        except WebSocketDisconnect:
            print("Client disconnected")
            break
        except asyncio.TimeoutError:
            print("Timeout during communication")
            break
        except OSError as error:
            print(f"Network error during communication: {error}")
            break
