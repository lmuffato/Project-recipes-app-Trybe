import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from '../pages/Login';
import FoodPage from '../pages/FoodPage';
import DrinkPage from '../pages/DrinkPage';
import ExplorePage from '../pages/ExplorePage';
import ExploreFoods from '../pages/ExploreFoods';
import ExploreDrinks from '../pages/ExploreDrinks';
import FoodIngredients from '../pages/FoodIngredients';
import DrinkIngredients from '../pages/DrinkIngredients';
import OriginLocation from '../pages/OriginLocation';
import ProfilePage from '../pages/ProfilePage';
import FoodDetails from '../pages/FoodDetails';
import DrinkDetails from '../pages/DrinkDetails';
import DoneRecipes from '../pages/DoneRecipes';
import FavoriteRecipes from '../pages/FavoriteRecipes';
import FoodInProgress from '../pages/FoodInProgress';
import DrinkInProgress from '../pages/DrinkInProgress';

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/comidas" component={ FoodPage } />
      <Route path="/bebidas" component={ DrinkPage } />
      <Route path="/comidas/{id-da-receita}" component={ FoodDetails } />
      <Route path="/bebidas/{id-da-receita}" component={ DrinkDetails } />
      <Route path="/comidas/{id-da-receita}/in-progress" component={ FoodInProgress } />
      <Route path="/bebidas/{id-da-receita}/in-progress" component={ DrinkInProgress } />
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
