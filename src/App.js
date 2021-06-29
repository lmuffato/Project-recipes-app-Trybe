import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';

function App() {
  return (
    <Switch>
      <Route path="/" exact component={ Login } />
      <Route path="/comidas" exact component={ Home } />
    </Switch>
  );
}

export default App;
