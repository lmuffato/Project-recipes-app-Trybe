import React from 'react';
import UserProvider from './context/UserProvider';
import RecipesProvider from './context/RecipesProvider';
import 'bootstrap/dist/css/bootstrap.min.css';
import Router from './Router';

function App() {
  return (
    <UserProvider>
      <RecipesProvider>
        <Router />
      </RecipesProvider>
    </UserProvider>
  );
}

export default App;
