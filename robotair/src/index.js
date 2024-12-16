
import React from 'react';
import ReactDOM from 'react-dom/client'; // Use 'react-dom/client' instead of 'react-dom'
import App from './App'; // Ensure this path points correctly to your App component

// Create a root and render the App
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
