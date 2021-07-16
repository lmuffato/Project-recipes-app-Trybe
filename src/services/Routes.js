import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Login from '../pages/Login';
import FoodPage from '../pages/FoodPage';
import DrinkPage from '../pages/DrinkPage';
// import RecipeDetails from '../pages/RecipeDetails';
import ExplorePage from '../pages/ExplorePage';
import ExploreFoods from '../pages/ExploreFoods';
import ExploreDrinks from '../pages/ExploreDrinks';
import FoodIngredients from '../pages/FoodIngredients';
import DrinkIngredients from '../pages/DrinkIngredients';
import OriginLocation from '../pages/OriginLocation';
import ProfilePage from '../pages/ProfilePage';
import DoneRecipes from '../pages/DoneRecipes';
import FavoriteRecipes from '../pages/FavoriteRecipes';
import FoodInProgress from '../pages/FoodInProgress';

import DrinkInProgress from '../pages/DrinkInProgress';
import FoodDetails from '../pages/FoodDetails';
import DrinkDetails from '../pages/DrinkDetails';
import NotFoundPage from '../pages/NotFoundPage';

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/comidas" component={ FoodPage } />
      <Route exact path="/bebidas" component={ DrinkPage } />
      <Route exact path="/comidas/:idMeal" component={ FoodDetails } />
      <Route exact path="/bebidas/:idDrink" component={ DrinkDetails } />
      <Route exact path="/comidas/:idMeal/in-progress" component={ FoodInProgress } />
      <Route exact path="/bebidas/:idDrink/in-progress" component={ DrinkInProgress } />
      <Route exact path="/explorar" component={ ExplorePage } />
      <Route exact path="/explorar/comidas" component={ ExploreFoods } />
      <Route exact path="/explorar/bebidas" component={ ExploreDrinks } />
      <Route exact path="/explorar/comidas/ingredientes" component={ FoodIngredients } />
      <Route exact path="/explorar/bebidas/ingredientes" component={ DrinkIngredients } />
      <Route exact path="/explorar/comidas/area" component={ OriginLocation } />
      <Route exact path="/perfil" component={ ProfilePage } />
      <Route exact path="/receitas-feitas" component={ DoneRecipes } />
      <Route exact path="/receitas-favoritas" component={ FavoriteRecipes } />
      <Route path="/404" component={ NotFoundPage } />
      <Redirect from="*" to="/404" />
    </Switch>
  );
}
