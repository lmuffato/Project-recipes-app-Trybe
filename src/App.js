import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Provider from './context/Provider';
import Routes from './Routes';

function App() {
  return (
    <div>
      <Provider>
        <Routes />
      </Provider>
    </div>
  );
}

export default App;
