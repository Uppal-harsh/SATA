import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

// Import CSS design systems
import '../css/design-system.css';
import '../css/components.css';
import '../css/animations.css';
import '../css/responsive.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
