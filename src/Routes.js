import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/login/Login';
import Foods from './pages/recipes-main/Foods/Foods';
import DetailsOfFoods from './pages/recipes-main/Foods/DetailsOfFood';
import DetailsOfDrinks from './pages/recipes-main/Drinks/DetailsOfDrinks';
import Drinks from './pages/recipes-main/Drinks/Drinks';
import ProfileScreen from './pages/ProfileScreen/ProfileScreen';
import RecipesDone from './pages/RecipesDone/RecipesDone';
import RecipesFav from './pages/RecipesFav/RecipesFav';

function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/comidas/:id" component={ DetailsOfFoods } />
      <Route path="/comidas" component={ Foods } />
      <Route path="/bebidas/:id" component={ DetailsOfDrinks } />
      <Route path="/bebidas" component={ Drinks } />
      <Route path="/perfil" component={ ProfileScreen } />
      <Route path="/receitas-feitas" component={ RecipesDone } />
      <Route path="/receitas-favoritas" component={ RecipesFav } />
    </Switch>
  );
}

export default Routes;
