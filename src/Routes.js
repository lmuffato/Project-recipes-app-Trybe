import React from 'react';
// import { Route, Switch } from 'react-dom';
import { Switch, Route } from 'react-router-dom';
import ProfileScreen from './pages/ProfileScreen/ProfileScreen';
// import InitPage from './pages/InitPage/InitPage';
import Login from './pages/LoginPage/Login';
import RecipesDone from './pages/RecipesDone/RecipesDone';
import RecipesFav from './pages/RecipesFav/RecipesFav';
import Food from './pages/FoodPage/Food';

function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/comidas" component={ Food } />
      <Route path="/perfil" component={ ProfileScreen } />
      <Route path="/receitas-feitas" component={ RecipesDone } />
      <Route path="/receitas-favoritas" component={ RecipesFav } />
    </Switch>
  );
}

export default Routes;
