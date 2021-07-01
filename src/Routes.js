import React from 'react';
// import { Route, Switch } from 'react-dom';
import { Switch, Route } from 'react-router-dom';
import ProfileScreen from './pages/ProfileScreen/ProfileScreen';
import InitPage from './pages/InitPage/InitPage';
import RecipesDone from './pages/RecipesDone/RecipesDone';
import RecipesFav from './pages/RecipesFav/RecipesFav';
import Explore from './pages/explore/Explore';
import ExploreFood from './pages/explore/ExploreFood';
import ExploreDrinks from './pages/explore/ExploreDrinks';
import ExploreFoodByIngredients from './pages/explore/ExploreFoodByIngredients';
import ExploreFoodByOrigin from './pages/explore/ExploreFoodByOrigin';
import ExploreDrinksByIngredients from './pages/explore/ExploreDrinksByIngredients';

function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={ InitPage } />
      <Route path="/perfil" component={ ProfileScreen } />
      <Route path="/receitas-feitas" component={ RecipesDone } />
      <Route path="/receitas-favoritas" component={ RecipesFav } />
      <Route
        exact
        path="/explorar/comidas/ingredientes"
        component={ ExploreFoodByIngredients }
      />
      <Route
        exact
        path="/explorar/comidas/origem"
        component={ ExploreFoodByOrigin }
      />
      <Route
        path="/explorar/bebidas/ingredientes"
        component={ ExploreDrinksByIngredients }
      />
      <Route exact path="/explorar/bebidas" component={ ExploreDrinks } />
      <Route exact path="/explorar/comidas" component={ ExploreFood } />
      <Route path="/explorar" component={ Explore } />
    </Switch>
  );
}

export default Routes;
