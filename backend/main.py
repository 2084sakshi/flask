import json
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime
import asyncio
import random

# FastAPI instance
app = FastAPI()

# CORS middleware to allow cross-origin requests from your frontend
origins = [
    "http://localhost:3000",  # Allow frontend running on port 3000
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Allows requests from these origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all HTTP methods
    allow_headers=["*"],  # Allows all headers
)

# Load robot data from a dummy JSON file
def load_robot_data():
    with open("./fake_robot_data.json", "r") as file:
        return json.load(file)

robots = load_robot_data()  # Load the initial robot data

# Background task to periodically update robot data
async def update_robot_data():
    while True:
        for robot in robots:
            # Simulate random updates to battery, CPU, and RAM
            if robot["Online/Offline"]:
                robot["Battery Percentage"] = max(0, robot["Battery Percentage"] - random.randint(0, 5))
                robot["CPU Usage"] = random.randint(10, 100)
                robot["RAM Consumption"] = random.randint(1000, 8000)
                robot["Last Updated"] = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
                robot["Location Coordinates"] = [random.uniform(-90, 90), random.uniform(-180, 180)]
        await asyncio.sleep(20)  # Update every 5 seconds

# Start the background task on startup
@app.on_event("startup")
async def start_telemetry_update():
    asyncio.create_task(update_robot_data())

# WebSocket API endpoint for real-time updates
@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    try:
        while True:
            # Send updated robot data to the client
            await websocket.send_json(robots)
            await asyncio.sleep(5)  # Send updates every 5 seconds
    except WebSocketDisconnect:
        print("Client disconnected")
