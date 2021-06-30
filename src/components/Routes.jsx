import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from '../Pages/Login';
import Foods from '../Pages/Foods';
import Drinks from '../Pages/Drinks';
import Profile from '../Pages/Profile';
import FavoriteRecipes from '../Pages/FavoriteRecipes';
import Explore from '../Pages/Explore/Explore';
import DrinkExplore from '../Pages/Explore/DrinkExplore';
import DrinksIngredientsExplore from '../Pages/Explore/DrinksIngredientsExplore';
import ExploreFoodSource from '../Pages/Explore/ExploreFoodSource';
import FoodExplore from '../Pages/Explore/FoodExplore';
import FoodIngredientsExplore from '../Pages/Explore/FoodIngredientsExplore';
import RecipesDone from '../Pages/RecipesDone';

function Routes() {
  return (
    <Switch>
      <Route exact path="/comidas" component={ Foods } />
      <Route exact path="/bebidas" component={ Drinks } />
      <Route path="/perfil" component={ Profile } />
      <Route exact path="/receitas-favoritas" component={ FavoriteRecipes } />
      <Route exact path="/explorar/bebidas" component={ DrinkExplore } />
      <Route exact path="/explorar" component={ Explore } />
      <Route
        exact
        path="/explorar/bebidas/ingredientes"
        component={ DrinksIngredientsExplore }
      />
      <Route exact path="/explorar/comidas/area" component={ ExploreFoodSource } />
      <Route exact path="/explorar/comidas" component={ FoodExplore } />
      <Route exact path="/receitas-feitas" component={ RecipesDone } />
      <Route
        exact
        path="/explorar/comidas/ingredientes"
        component={ FoodIngredientsExplore }
      />
      <Route exact path="/" component={ Login } />
    </Switch>
  );
}

export default Routes;
