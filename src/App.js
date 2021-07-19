import React from 'react';
import './css/style.css';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import store from './redux/store';
import Routes from './pages/Routes';
import './css/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import StorageProvider from './context/StorageProvider';

function App() {
  const progress = {
    meals: {},
    cocktails: {},
  };

  const storage = JSON.parse(localStorage.getItem('inProgressRecipes'));
  if (!storage) localStorage.setItem('inProgressRecipes', JSON.stringify(progress));

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
