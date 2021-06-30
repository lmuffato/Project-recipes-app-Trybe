import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Switch, Route } from 'react-router-dom';
import Login from './Pages/Login';
import MainFood from './Pages/MainFood';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/comidas" component={ MainFood } />
    </Switch>
  );
}

export default App;
