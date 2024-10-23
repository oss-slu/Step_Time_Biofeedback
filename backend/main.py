from fastapi import FastAPI, WebSocket, WebSocketDisconnect
import asyncio
from target_zone_estimation import handle_data_streaming

app = FastAPI()
connectedClients = set()

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    print("Waiting for Connection")
    connectedClients.add(websocket)

    try:
        await websocket.accept()
        print("Connection accepted")
        
        while True:
            try:
                await handle_data_streaming(websocket)
                # data = await websocket.receive_text()
                # print(f"Received from client: {data}")
                # for client in connectedClients:
                #     await client.send_text(f"Message Received: {data}")
            except WebSocketDisconnect:
                print("Client disconnected")
                break
            except asyncio.TimeoutError:
                print("Timeout during communication")
                break
            except OSError as e:
                print(f"Network error during communication: {e}")
                break
            except Exception as e:
                print(f"Error occurred during communication: {e}")
                break
    finally:
        connectedClients.remove(websocket)
        await websocket.close()
        print("Connection closed")