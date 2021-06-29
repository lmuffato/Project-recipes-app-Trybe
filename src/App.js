import React from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Provider from './store/Provider';
import Routes from './components/Routes';

function App() {
  return (
    <BrowserRouter>
      <Provider>
        <Routes />
      </Provider>
    </BrowserRouter>
  );
}

export default App;
