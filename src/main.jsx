import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import { ProblemProvider } from './context/ProblemContext.jsx';
import './styles.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ProblemProvider>
        <App />
      </ProblemProvider>
    </BrowserRouter>
  </React.StrictMode>
);
