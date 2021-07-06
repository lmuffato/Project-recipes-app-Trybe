import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from '../pages/Login';
import FoodPage from '../pages/FoodPage';
import DrinkPage from '../pages/DrinkPage';
import RecipeDetails from '../pages/RecipeDetails';
import ExplorePage from '../pages/ExplorePage';
import ExploreFoods from '../pages/ExploreFoods';
import ExploreDrinks from '../pages/ExploreDrinks';
import FoodIngredients from '../pages/FoodIngredients';
import DrinkIngredients from '../pages/DrinkIngredients';
import OriginLocation from '../pages/OriginLocation';
import ProfilePage from '../pages/ProfilePage';
import DoneRecipes from '../pages/DoneRecipes';
import FavoriteRecipes from '../pages/FavoriteRecipes';
import FoodInProcess from '../pages/FoodInProcess';
import DrinkInProcess from '../pages/DrinkInProcess';

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/comidas" component={ FoodPage } />
      <Route path="/bebidas" component={ DrinkPage } />
      <Route path="/comidas/:idMeal" component={ RecipeDetails } />
      <Route path="/bebidas/:idDrink" component={ RecipeDetails } />
      <Route path="/comidas/:idMeal/in-progress" component={ FoodInProcess } />
      <Route path="/comidas/:idDrink/in-progress" component={ DrinkInProcess } />
      <Route path="/explorar" component={ ExplorePage } />
      <Route path="/explorar/comidas" component={ ExploreFoods } />
      <Route path="/explorar/bebidas" component={ ExploreDrinks } />
      <Route path="/explorar/comidas/ingredientes" component={ FoodIngredients } />
      <Route path="/explorar/bebidas/ingredientes" component={ DrinkIngredients } />
      <Route path="/explorar/comidas/area" component={ OriginLocation } />
      <Route path="/perfil" component={ ProfilePage } />
      <Route path="/receitas-feitas" component={ DoneRecipes } />
      <Route path="/receitas-favoritas" component={ FavoriteRecipes } />
    </Switch>
  );
}
