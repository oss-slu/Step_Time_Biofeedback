from fastapi import FastAPI, WebSocket, WebSocketDisconnect
import asyncio

app = FastAPI()

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    print("Waiting for Connection")
    
    try:
        await websocket.accept()
        print("Connection accepted")
    except asyncio.TimeoutError:
        print("Connection timed out")
        return
    except OSError as e:
        print(f"Network error occurred: {e}")
        return
    except Exception as e:
        print(f"Error Occurred: {e}")
        return 

    while True:
        try:
            data = await websocket.receive_text()
            await websocket.send_text(f"Message Received: {data}")
            print(f"Received from client: {data}")
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
