import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Login from './pages/otherPages/Login';
import recipesPage from './pages/recipes/recipesPage';

export default function Routes() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route path="/comidas" component={ recipesPage } />
        </Switch>
      </BrowserRouter>
    </div>
  );
}
