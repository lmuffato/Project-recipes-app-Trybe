import React from 'react';
import { Route, Switch } from 'react-router-dom';
import MainRecipesPage from '../pages/MainRecipesPage';
import Explore from '../pages/Explore';
import Foods from '../pages/Foods';
import Drinks from '../pages/Drinks';
import DrinksIngredients from '../pages/DrinksIngredients';
import FoodsIngredients from '../pages/FoodsIngredients';
import FoodsArea from '../pages/FoodsArea';
import LoginPage from '../pages/LoginPage';
import Profile from '../pages/ProfilePage';
import DoneRecepies from '../pages/DoneRecepies';
import ReceitasFavoritas from '../pages/ReceitasFavoritas';
import MealDescription from './MealDescription';
import DrinkDescription from './DrinkDescription';
import NotFound from './NotFound';
import MealsRecepiesProgress from '../pages/MealsRecepiesProgress';

function Switcher() {
  return (
    <Switch>
      <Route exact path="/comidas/:id" component={ MealDescription } />
      <Route exact path="/bebidas/:id" component={ DrinkDescription } />
      <Route exact path="/" component={ LoginPage } />
      <Route exact path="/comidas" component={ MainRecipesPage } />
      <Route exact path="/bebidas" component={ MainRecipesPage } />
      <Route exact path="/explorar" component={ Explore } />
      <Route exact path="/explorar/comidas" component={ Foods } />
      <Route exact path="/explorar/bebidas" component={ Drinks } />
      <Route path="/perfil" component={ Profile } />
      <Route path="/receitas-feitas" component={ DoneRecepies } />
      <Route path="/receitas-favoritas" component={ ReceitasFavoritas } />
      <Route path="/explorar/bebidas/area" component={ NotFound } />
      <Route exact path="/comidas/:id/in-progress" component={ MealsRecepiesProgress } />
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
