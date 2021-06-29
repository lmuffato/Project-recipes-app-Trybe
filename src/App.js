import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import UserProvider from './context/UserProvider';
import RecipeProvider from './context/RecipeProvider';
import Login from './pages/Login';

function App() {
  return (
    <RecipeProvider>
      <UserProvider>
        <Login />
      </UserProvider>
    </RecipeProvider>
  );
}

export default App;
