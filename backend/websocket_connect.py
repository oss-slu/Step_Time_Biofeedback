import asyncio
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.websockets import WebSocketState

biostepFeedback = FastAPI()

@biostepFeedback.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    """
    Waits for the message from the frontend to ensure the connection is there.
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

            # Check if WebSocket is still connected before sending data
            if websocket.client_state == WebSocketState.CONNECTED:
                await websocket.send_text(data)
                print(f"Received and sent back: {data}")
            else:
                print("WebSocket is no longer connected, stopping data streaming.")
                break  # Stop streaming if not connected
        except WebSocketDisconnect:
            print("Client disconnected")
            break
        except asyncio.TimeoutError:
            print("Timeout during communication")
            break
        except OSError as error:
            print(f"Network error during communication: {error}")
            break
        except Exception as e:
            print(f"An unexpected error occurred: {e}")
            break

    # Additional cleanup
    print("Connection closed.")
