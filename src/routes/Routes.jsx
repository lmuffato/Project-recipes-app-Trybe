import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Login from '../pages/Login';
import Foods from '../pages/Foods';

function Routes() {
  return (
    <Switch>
      <Route path="/comidas" component={ Foods } />
      <Route path="/" component={ Login } />
    </Switch>
  );
}

export default Routes;
