"""
Main file responsable for connecting webscokets to backend
"""
import asyncio
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from target_zone_estimation import handle_data_streaming

app = FastAPI()
connectedClients = set()

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    """
    Function opens websocket and test situation and connectivity with frontend
    """
    print("Waiting for Connection")
    connectedClients.add(websocket)

    try:
        await websocket.accept()
        print("Connection accepted")

        while True:
            try:
                await handle_data_streaming(websocket)
                data = await websocket.receive_text()
                print(f"Received from client: {data}")
                for client in connectedClients:
                    await client.send_text(f"Message Received: {data}")
            except WebSocketDisconnect:
                print("Client disconnected")
                break
            except asyncio.TimeoutError:
                print("Timeout during communication")
                break
            except OSError as error_message:
                print(f"Network error during communication: {error_message}")
                break
            except ValueError as error_message:
                print(f"Error occurred during communication: {error_message}")
                break
    finally:
        connectedClients.remove(websocket)
        await websocket.close()
        print("Connection closed")
