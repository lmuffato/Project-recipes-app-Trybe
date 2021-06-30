import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import RecipesProvider from './provider/RecipesProvider';

import Login from './pages/Login';

function App() {
  return (
    <BrowserRouter>
      <RecipesProvider>
        <Switch>
          <Route exact path="/" component={ Login } />
        </Switch>
      </RecipesProvider>
    </BrowserRouter>
  );
}

export default App;
