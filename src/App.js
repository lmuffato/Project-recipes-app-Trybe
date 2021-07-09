import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import store from './redux/store';
import Routes from './pages/Routes';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const progress = {
    meals: {},
    cocktails: {},
  };

  const storage = JSON.parse(localStorage.getItem('inProgressRecipes'));
  if (!storage) localStorage.setItem('inProgressRecipes', JSON.stringify(progress));

  return (
    <Provider store={ store }>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
