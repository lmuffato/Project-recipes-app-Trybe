import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import store from './redux/store';
import Routes from './pages/Routes';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import StorageProvider from './context/StorageProvider';

function App() {
  return (
    <Provider store={ store }>
      <StorageProvider>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </StorageProvider>
    </Provider>
  );
}

export default App;
