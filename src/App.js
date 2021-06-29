import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './Pages/Login';
import FoodPage from './Pages/FoodPage';
import './App.css';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/comidas" component={ FoodPage } />
    </Switch>
  );
}

export default App;
