import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from '../Pages/Login';
import Foods from '../Pages/Foods';
import Drinks from '../Pages/Drinks';
import Profile from '../Pages/Profile';

function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/comidas" component={ Foods } />
      <Route exact path="/bebidas" component={ Drinks } />
      <Route path="/perfil" component={ Profile } />
    </Switch>
  );
}

export default Routes;
