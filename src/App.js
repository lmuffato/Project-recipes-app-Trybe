import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import store from './redux/store';
import Routes from './pages/Routes';
import StorageProvider from './context/StorageProvider';

import './css/style.css';
import './css/App.css';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader

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
