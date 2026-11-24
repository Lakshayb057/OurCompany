import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import './styles/index.css';

// Auto-reload on Vite preload chunk mismatch during deployments
window.addEventListener('vite:preloadError', (event) => {
  console.warn('Vite preload chunk mismatch detected after deployment. Reloading latest bundle...', event);
  window.location.reload();
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

