import React from 'react';
import { Route, Switch } from 'react-router-dom';
import {
  Login,
  Foods,
  FoodId,
  DrinkId,
  Drinks,
  Profile,
  FavoriteRecipes,
  Explore,
  DrinkExplore,
  DrinksIngredientsExplore,
  ExploreFoodSource,
  FoodExplore,
  FoodIngredientsExplore,
  RecipesDone,
} from '../Pages';

function Routes() {
  return (
    <Switch>
      {/* LOGIN */}
      <Route exact path="/" component={ Login } />
      {/* COMIDAS */}
      <Route exact path="/comidas" component={ Foods } />
      <Route exact path="/comidas/:id" component={ FoodId } />
      <Route exact path="/comidas/:id/in-progress" component={ Foods } />
      {/* BEBIDAS */}
      <Route exact path="/bebidas" component={ Drinks } />
      <Route exact path="/bebidas/:id" component={ DrinkId } />
      <Route exact path="/bebidas/:id/in-progress" component={ Drinks } />
      {/* EXPLORAR */}
      <Route exact path="/explorar" component={ Explore } />
      {/* EXPLORAR BEBIDAS */}
      <Route exact path="/explorar/bebidas" component={ DrinkExplore } />
      <Route
        exact
        path="/explorar/bebidas/ingredientes"
        component={ DrinksIngredientsExplore }
      />
      {/* EXPLORAR COMIDAS */}
      <Route exact path="/explorar/comidas" component={ FoodExplore } />
      <Route exact path="/explorar/comidas/area" component={ ExploreFoodSource } />
      <Route
        exact
        path="/explorar/comidas/ingredientes"
        component={ FoodIngredientsExplore }
      />
      {/* PERFIL */}
      <Route path="/perfil" component={ Profile } />
      <Route exact path="/receitas-favoritas" component={ FavoriteRecipes } />
      <Route exact path="/receitas-feitas" component={ RecipesDone } />
    </Switch>
  );
}

export default Routes;
