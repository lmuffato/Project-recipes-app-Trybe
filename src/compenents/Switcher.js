import React from 'react';
import { Route, Switch } from 'react-router-dom';
import MainMealsRecipes from '../pages/MainRecipesPage';
import Explore from '../pages/Explore';
import Foods from '../pages/Foods';
import Drinks from '../pages/Drinks';
import DrinksIngredients from '../pages/DrinksIngredients';
import FoodsIngredients from '../pages/FoodsIngredients';
import FoodsArea from '../pages/FoodsArea';
import LoginPage from '../pages/LoginPage';
import Profile from '../pages/ProfilePage';
import FavoriteRecipes from '../pages/FavoriteRecipes';
import DoneRecepies from '../pages/DoneRecepies';
import MealDescription from './MealDescription';
import DrinkDescription from './DrinkDescription';
import NotFound from './NotFound';

function Switcher() {
  return (
    <Switch>
      <Route path="/comidas/:detalhes" component={ MealDescription } />
      <Route path="/bebidas/:detalhes" component={ DrinkDescription } />
      <Route exact path="/" component={ LoginPage } />
      <Route exact path="/comidas" component={ MainMealsRecipes } />
      <Route exact path="/bebidas" component={ MainMealsRecipes } />
      <Route exact path="/explorar" component={ Explore } />
      <Route exact path="/explorar/comidas" component={ Foods } />
      <Route exact path="/explorar/bebidas" component={ Drinks } />
      <Route path="/perfil" component={ Profile } />
      <Route path="/receitas-favoritas" component={ FavoriteRecipes } />
      <Route path="/receitas-feitas" component={ DoneRecepies } />
      <Route path="/explorar/bebidas/area" component={ NotFound } />
      <Route
        path="/explorar/comidas/ingredientes"
        component={ FoodsIngredients }
      />
      <Route
        path="/explorar/bebidas/ingredientes"
        component={ DrinksIngredients }
      />
      <Route exact path="/explorar/comidas/area" component={ FoodsArea } />
    </Switch>
  );
}

export default Switcher;
