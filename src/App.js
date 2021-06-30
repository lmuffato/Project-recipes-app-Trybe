import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom';
import Routes from './Routes';
import RecipesProvider from './recipes-main/RecipesProvider';

function App() {
  return (
    <RecipesProvider>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </RecipesProvider>
  );
}

export default App;
