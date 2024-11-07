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
            if websocket.client_state == WebSocket.OPEN:
                await websocket.send_text(data)
                print(f"Received and sent back: {data}")
            else:
                print("WebSocket is not in a connected state; stopping data streaming.")
                
        except WebSocketDisconnect:
            print("Client disconnected")
            try:
                # Try sending a disconnection message to the client
                await websocket.send_text("Disconnected: Connection closed")
            except Exception:
                # Handle any issues with sending the disconnection message
                print("Failed to send disconnection message to the client.")
            finally:
                # Ensure the connection is cleaned up
                print("Closing connection and cleaning up.")
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
<<<<<<< HEAD
    print("Connection closed.")
=======
    print("Connection closed.")
>>>>>>> b3dc15d (Fix WebSocket tests and prevent infinite loop on disconnect)
