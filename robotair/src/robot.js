import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import './style.css';

// Fix for default marker icon issue in Leaflet
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerIconShadow,
});
L.Marker.prototype.options.icon = DefaultIcon;

const RobotMap = () => {
  const [robots, setRobots] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const socket = new WebSocket('ws://127.0.0.1:8000/ws');
    
    socket.onopen = () => {
      console.log('Connected to WebSocket');
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setRobots(data);
    };

    socket.onclose = () => {
      console.log('Disconnected from WebSocket');
    };
    return () => {
      socket.close();
    };
  }, []);

  // Apply filtering based on the user selection
  const filteredRobots = robots.filter((robot) => {
    if (filter === 'all') return true;
    if (filter === 'active') return robot['Online/Offline'];
    if (filter === 'offline') return !robot['Online/Offline'];
    if (filter === 'lowBattery') return robot['Battery Percentage'] < 20;
    return true;
  });

  return (
    <div className="robot-map">
      <h1>Robot Map View</h1>

      <div className="filters">
        <label>Filter Robots: </label>
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="offline">Offline</option>
          <option value="lowBattery">Low Battery</option>
        </select>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Robot ID</th>
              <th>Status</th>
              <th>Battery (%)</th>
              <th>CPU Usage (%)</th>
              <th>RAM (MB)</th>
              <th>Last Updated</th>
            </tr>
          </thead>
          <tbody>
            {filteredRobots.map((robot) => (
              <tr
                key={robot['Robot ID']}
                className={
                  robot['Battery Percentage'] < 20 ? 'low-battery' : ''
                }
              >
                <td>{robot['Robot ID']}</td>
                <td>{robot['Online/Offline'] ? 'Online' : 'Offline'}</td>
                <td>{robot['Battery Percentage']}</td>
                <td>{robot['CPU Usage']}</td>
                <td>{robot['RAM Consumption']}</td>
                <td>{new Date(robot['Last Updated']).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <MapContainer center={[0, 0]} zoom={2} style={{ height: '500px', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
        />
        {filteredRobots.map((robot) => (
          <Marker
            key={robot['Robot ID']}
            position={[
              robot['Location Coordinates'][0],
              robot['Location Coordinates'][1],
            ]}
          >
            <Popup>
              <div>
                <strong>Robot ID:</strong> {robot['Robot ID']}<br />
                <strong>Status:</strong> {robot['Online/Offline'] ? 'Online' : 'Offline'}<br />
                <strong>Battery:</strong> {robot['Battery Percentage']}%<br />
                <strong>CPU:</strong> {robot['CPU Usage']}%<br />
                <strong>RAM:</strong> {robot['RAM Consumption']} MB<br />
                <strong>Last Updated:</strong> {new Date(robot['Last Updated']).toLocaleString()}<br />
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default RobotMap;
