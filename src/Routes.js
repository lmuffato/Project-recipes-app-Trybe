import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Foods from './pages/recipes-main/Foods/Foods';
import DetailsOfFoods from './pages/recipes-main/Foods/DetailsOfFood';
import DetailsOfDrinks from './pages/recipes-main/Drinks/DetailsOfDrinks';
import Drinks from './pages/recipes-main/Drinks/Drinks';
import ProfileScreen from './pages/ProfileScreen/ProfileScreen';
import Login from './pages/LoginPage/Login';
import RecipesDone from './pages/RecipesDone/RecipesDone';
import RecipesFav from './pages/RecipesFav/RecipesFav';
import Explore from './pages/explore/Explore';
import ExploreFood from './pages/explore/ExploreFood';
import ExploreDrinks from './pages/explore/ExploreDrinks';
import ExploreFoodByIngredients from './pages/explore/ExploreFoodByIngredients';
import ExploreFoodByOrigin from './pages/explore/ExploreFoodByOrigin';
import ExploreDrinksByIngredients from './pages/explore/ExploreDrinksByIngredients';

import FoodInProgress from './pages/recipes-main/Foods/FoodInProgess';
import DrinksInProgress from './pages/recipes-main/Drinks/DrinksInProgress';

function Routes() {
  return (
    <Switch>
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
      <Route exact path="/" component={ Login } />
      <Route exact path="/comidas/:id" component={ DetailsOfFoods } />
      <Route exact path="/comidas" component={ Foods } />
      <Route exact path="/bebidas/:id" component={ DetailsOfDrinks } />
      <Route exact path="/bebidas" component={ Drinks } />
      <Route exact path="/perfil" component={ ProfileScreen } />
      <Route exact path="/receitas-feitas" component={ RecipesDone } />
      <Route exact path="/receitas-favoritas" component={ RecipesFav } />
      <Route exact path="/comidas/:id/in-progress" component={ FoodInProgress } />
      <Route exact path="/bebidas/:id/in-progress" component={ DrinksInProgress } />
      <Route exact path="/perfil" component={ ProfileScreen } />
      <Route exact path="/receitas-feitas" component={ RecipesDone } />
      <Route exact path="/receitas-favoritas" component={ RecipesFav } />
    </Switch>
  );
}

export default Routes;
