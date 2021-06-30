import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Login from '../pages/Login';
import Foods from '../pages/Foods';
import Drinks from '../pages/Drinks';
import Explore from '../pages/Explore';
import Profile from '../pages/Profile';
import RecipesDone from '../pages/RecipesDone';
import FoodExplore from '../pages/FoodExplore';
import FoodIngredientExplore from '../pages/FoodIngredientExplore';
import DrinkExplore from '../pages/DrinkExplore';
import DrinkIngredientExplore from '../pages/DrinkIngredientExplore';
import FoodArea from '../pages/FoodArea';
import FavoriteRecipes from '../pages/FavoriteRecipes';

function Routes() {
  return (
    <Switch>
      <Route exact path="/explorar/comidas/area" component={ FoodArea } />
      <Route
        exact
        path="/explorar/comidas/ingredientes"
        component={ FoodIngredientExplore }
      />
      <Route exact path="/explorar/comidas" component={ FoodExplore } />
      <Route
        exact
        path="/explorar/bebidas"
        component={ DrinkExplore }
      />
      <Route exact path="/explorar" component={ Explore } />
      <Route
        exact
        path="/explorar/bebidas/ingredientes"
        component={ DrinkIngredientExplore }
      />

      <Route exact path="/perfil" component={ Profile } />

      <Route exact path="/receitas-feitas" component={ RecipesDone } />
      <Route exact path="/receitas-favoritas" component={ FavoriteRecipes } />

      <Route exact path="/comidas" component={ Foods } />

      <Route exact path="/bebidas" component={ Drinks } />

      <Route exact path="/" component={ Login } />
    </Switch>
  );
}

export default Routes;
