import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import MainRecipes from './pages/MainRecipes';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/comidas" component={ MainRecipes } />
    </Switch>
  );
}

export default App;
