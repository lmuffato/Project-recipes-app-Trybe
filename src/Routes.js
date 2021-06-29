import React from 'react';
import { Route, Switch } from 'react-router';
import Login from './login/Login';
import Drinks from './recipes-main/Drinks';
import Foods from './recipes-main/Foods';

function Routes() {
  return (
    <Switch>
      <Route exact path="/">
        <Login />
      </Route>
      <Route path="/comidas">
        <Foods />
      </Route>
      <Route path="/bebidas">
        <Drinks />
      </Route>
    </Switch>
  );
}

export default Routes;
