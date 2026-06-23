import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from "react-router-dom";
import App from './App.jsx';
import { ProblemProvider } from './context/ProblemContext.jsx';
// import './styles.scss';
import "./styles/main.scss";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
      <ProblemProvider>
        <App />
      </ProblemProvider>
    </HashRouter>
  </React.StrictMode>
);
