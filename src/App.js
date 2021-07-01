import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Rotas from './services/Routes';

import UserProvider from './context/UserProvider';
import RecipeProvider from './context/RecipeProvider';

function App() {
  return (
    <RecipeProvider>
      <UserProvider>
        <BrowserRouter>
          <Rotas />
        </BrowserRouter>
      </UserProvider>
    </RecipeProvider>
  );
}

export default App;
