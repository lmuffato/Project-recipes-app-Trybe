import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import UserProvider from './context/UserProvider';
import RecipeProvider from './context/RecipeProvider';
import Routes from './services/Routes';

function App() {
  return (
    <RecipeProvider>
      <UserProvider>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </UserProvider>
    </RecipeProvider>
  );
}

export default App;
