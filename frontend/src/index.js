import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.js';

console.log('API base URL:', process.env.REACT_APP_API_BASE_URL || 'https://inventory-management-py4o.onrender.com/api');

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

