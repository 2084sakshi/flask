# Robot Monitoring Dashboard

This project is a **Robot Fleet Monitoring Dashboard** that displays real-time data of robots in the fleet. It provides an interface for monitoring robot health, including battery, CPU usage, RAM consumption, and location coordinates. The dashboard uses **React.js** for the frontend, **FastAPI** for the backend, and **WebSocket** for real-time communication.

## Table of Contents
- [Features](#features)
- [Tools Used](#tools-used)
- [Setup Instructions](#setup-instructions)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
  - [Running the Application](#running-the-application)
- [Folder Structure](#folder-structure)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)

---

## Features
- **Real-time Updates**: The dashboard updates robot data (battery, CPU, RAM, location) every 5 seconds using WebSocket.
- **Robot Fleet Status**: Displays a list of all robots with their health and operational status.
- **Low Battery Notification**: Robots with low battery are highlighted on the dashboard for quick identification.
- **Simulated Robot Data**: The backend simulates real-time updates to robot metrics (battery percentage, CPU usage, RAM consumption).
- **Customizable Data**: The robot data can be easily updated to reflect real-world metrics or connected to an actual robot fleet.

---

## Tools Used

- **Frontend**: 
  - **React.js**: A JavaScript library for building the user interface.
  - **Leaflet.js**: A JavaScript library for displaying interactive maps.
  
- **Backend**:
  - **FastAPI**: A modern web framework for building APIs.
  - **WebSocket**: For real-time communication between the frontend and backend.
  
- **Others**:
  - **Uvicorn**: ASGI server to run the FastAPI backend.
  - **Python 3.8+**: The programming language for the backend.

---

## Setup Instructions

### Backend Setup
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/yourusername/robot-fleet-monitoring-dashboard.git
   cd robot-fleet-monitoring-dashboard
   ```

2. **Create a Virtual Environment**:
   It's recommended to use a virtual environment to avoid conflicts with system dependencies.
   ```bash
   python3 -m venv venv
   ```

3. **Activate the Virtual Environment**:
   - On Windows:
     ```bash
     .\venv\Scripts\activate
     ```
   - On macOS/Linux:
     ```bash
     source venv/bin/activate
     ```

4. **Install Dependencies**:
   Install the required Python packages using `pip`:
   ```bash
   pip install -r requirements.txt
   ```

5. **Create the `fake_robot_data.json` File**:
   In the root directory, create a `fake_robot_data.json` file to simulate robot data. Here’s an example of its structure:

   ```json
   [
     {
       "Robot ID": "1",
       "Online/Offline": true,
       "Battery Percentage": 100,
       "CPU Usage": 45,
       "RAM Consumption": 2048,
       "Last Updated": "2024-12-11 10:00:00",
       "Location Coordinates": [34.052235, -118.243683]
     },
     {
       "Robot ID": "2",
       "Online/Offline": true,
       "Battery Percentage": 85,
       "CPU Usage": 50,
       "RAM Consumption": 3072,
       "Last Updated": "2024-12-11 10:05:00",
       "Location Coordinates": [40.712776, -74.005974]
     }
   ]
   ```

6. **Run the Backend**:
   Start the FastAPI backend with Uvicorn:
   ```bash
   uvicorn main:app --reload
   ```

   The backend will now be running at `http://127.0.0.1:8000`.

---

### Frontend Setup
1. **Navigate to the `frontend` directory**:
   In your project directory, move to the frontend folder:
   ```bash
   cd frontend
   ```

2. **Install Frontend Dependencies**:
   Install the necessary dependencies using `npm` or `yarn`:
   ```bash
   npm install
   ```

3. **Start the Frontend**:
   Run the React app:
   ```bash
   npm start
   ```

   This will start the React app on `http://localhost:3000`.

---

## Running the Application
Once both the backend and frontend are running, the dashboard will be accessible at:

- **Frontend**: `http://localhost:3000`
- **Backend (API)**: `http://localhost:8000`

The frontend will display the robot fleet data and receive real-time updates over WebSocket.

---

## Folder Structure

```
robot-fleet-monitoring-dashboard/
│
├── backend/
│   ├── main.py             # FastAPI backend code
│   ├── requirements.txt    # Python dependencies
│   └── fake_robot_data.json # Simulated robot data
│
├── frontend/
│   ├── src/
│   │   ├── App.js          # Main React component
│   │   └── ...             # Other React components and files
│   ├── package.json        # Node.js dependencies
│   └── public/
│       └── index.html      # HTML entry point
│
└── README.md               # Project documentation
```

---

## API Documentation

### WebSocket Endpoint

**URL**: `ws://localhost:8000/ws`

- **Description**: Sends real-time robot data updates every 5 seconds.
- **Response**: A JSON object containing robot data.

Example:
```json
{
  "Robot ID": "1",
  "Online/Offline": true,
  "Battery Percentage": 98,
  "CPU Usage": 55,
  "RAM Consumption": 3072,
  "Last Updated": "2024-12-11 10:10:00",
  "Location Coordinates": [34.052235, -118.243683]
}
```

---

## Contributing
We welcome contributions to this project! To contribute, follow these steps:

1. Fork this repository.
2. Clone your fork locally.
3. Create a new branch for your feature or bugfix.
4. Make your changes and commit them.
5. Push to your fork and create a pull request.

