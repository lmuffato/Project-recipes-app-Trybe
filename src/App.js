import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom';
import UserProvider from './contexts/UserProvider';
import RecipesProvider from './contexts/RecipesProvider';
import Routes from './components/Routes';

function App() {
  return (
    <UserProvider>
      <RecipesProvider>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </RecipesProvider>
    </UserProvider>
  );
}

export default App;
