from fastapi import FastAPI, WebSocket, WebSocketDisconnect

biostepFeedback = FastAPI()

@biostepFeedback.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    print("Waiting for Connection")
    
    try:
        await websocket.accept()
        print("Connection accepted")
    except Exception as e:
        print(f"Error Occurred: {e}")
        return 

    while True:
        try:
            data = await websocket.receive_text()
            await websocket.send_text(data)
            print(f"Received and sent back: {data}")
        except WebSocketDisconnect:
            print("Client disconnected")
            break
        except Exception as e:
            print(f"Error occurred during communication: {e}")
            break
