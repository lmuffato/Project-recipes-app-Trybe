import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from '../pages/Login';
import FoodPage from '../pages/FoodPage';
import DrinkPage from '../pages/DrinkPage';
import RecipeDetails from '../pages/RecipeDetails';

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/comidas" component={ FoodPage } />
      <Route path="/bebidas" component={ DrinkPage } />
      <Route path="/comidas/:idMeal" component={ RecipeDetails } />
      <Route path="/bebidas/:idDrink" component={ RecipeDetails } />
    </Switch>
  );
}
