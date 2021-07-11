import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Login from '../pages/Login';
import Foods from '../pages/Foods';
import Drinks from '../pages/Drinks';
import FoodDetails from '../pages/FoodDetails';
import DrinkDetails from '../pages/DrinkDetails';
import Explore from '../pages/Explore';
import Profile from '../pages/Profile';
import RecipesDone from '../pages/RecipesDone';
import FoodExplore from '../pages/FoodExplore';
import FoodIngredientExplore from '../pages/FoodIngredientExplore';
import DrinkExplore from '../pages/DrinkExplore';
import DrinkIngredientExplore from '../pages/DrinkIngredientExplore';
import FoodArea from '../pages/FoodArea';
import FavoriteRecipes from '../pages/FavoriteRecipes';
import FoodProgress from '../pages/FoodProgress';
import DrinkProgress from '../pages/DrinkProgress';
import NotFound from '../pages/NotFound';

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
        path="/explorar/bebidas/ingredientes"
        component={ DrinkIngredientExplore }
      />
      <Route exact path="/explorar/bebidas" component={ DrinkExplore } />
      <Route exact path="/explorar" component={ Explore } />
      <Route exact path="/perfil" component={ Profile } />
      <Route exact path="/receitas-feitas" component={ RecipesDone } />
      <Route exact path="/receitas-favoritas" component={ FavoriteRecipes } />

      <Route
        exact
        path="/comidas/:id/in-progress"
        component={ FoodProgress }
      />
      <Route path="/comidas/:id" component={ FoodDetails } />
      <Route exact path="/comidas" component={ Foods } />

      <Route
        exact
        path="/bebidas/:id/in-progress"
        component={ DrinkProgress }
      />
      <Route path="/bebidas/:id" component={ DrinkDetails } />
      <Route exact path="/bebidas" component={ Drinks } />

      <Route exact path="/" component={ Login } />

      <Route component={ NotFound } />
    </Switch>
  );
}

export default Routes;
