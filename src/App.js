import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Switch, Route } from 'react-router-dom';
import Login from './Pages/Login';
import MainFood from './Pages/MainFood';
import MainDrink from './Pages/MainDrink';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/comidas" component={ MainFood } />
      <Route path="/bebidas" component={ MainDrink } />
    </Switch>
  );
}

export default App;
