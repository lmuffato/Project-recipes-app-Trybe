import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './routes/Routes';

function App() {
  return (
    <Router>
      <Routes />
    </Router>
  );
}

export default App;
