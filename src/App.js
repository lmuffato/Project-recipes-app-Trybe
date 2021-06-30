import React from 'react';
import { BrowserRouter, Switch, Route, useLocation } from 'react-router-dom';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Rotas from './rotas/index';

import UserProvider from './context/UserProvider';
import RecipeProvider from './context/RecipeProvider';

function App() {
  return (
    <BrowserRouter>
      <RecipeProvider>
        <UserProvider>

          <Rotas />
        </UserProvider>
      </RecipeProvider>

    </BrowserRouter>
  );
}

export default App;
