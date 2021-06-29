import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import UserProvider from './context/UserProvider';
import RecipeProvider from './context/RecipeProvider';
import Login from './pages/Login';

function App() {
  return (
    <RecipeProvider>
      <UserProvider>
        <BrowserRouter>
          <Switch>
            <Route path="/" component={ Login } />
          </Switch>
        </BrowserRouter>
      </UserProvider>
    </RecipeProvider>
  );
}

export default App;
