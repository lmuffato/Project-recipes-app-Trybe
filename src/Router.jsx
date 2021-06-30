import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './Pages/Login';
import Details from './Pages/Details';
import InProcess from './Pages/InProcess';
import Explore from './Pages/Explore';
import ExploreByType from './Pages/ExploreByType';
import ExploreIngredients from './Pages/ExploreIngredients';
import ExploreArea from './Pages/ExploreArea';
import Profile from './Pages/Profile';
import RecipeMainPage from './Pages/RecipeMainPage';
import ListofRecipes from './Pages/ListofRecipes';

export default function Router() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/comidas" component={ RecipeMainPage } />
      <Route exact path="/bebidas" component={ RecipeMainPage } />
      <Route exact path="/comidas/:id" component={ Details } />
      <Route exact path="/bebidas/:id" component={ Details } />
      <Route
        exact
        path="/comidas/:id/in-progress"
        component={ InProcess }
      />
      <Route
        exact
        path="/bebidas/:id/in-progress"
        component={ InProcess }
      />
      <Route exact path="/explorar" component={ Explore } />
      <Route exact path="/explorar/comidas" component={ ExploreByType } />
      <Route exact path="/explorar/bebidas" component={ ExploreByType } />
      <Route
        exact
        path="/explorar/comidas/ingredientes"
        component={ ExploreIngredients }
      />
      <Route
        exact
        path="/explorar/bebidas/ingredientes"
        component={ ExploreIngredients }
      />
      <Route exact path="/explorar/comidas/area" component={ ExploreArea } />
      <Route exact path="/perfil" component={ Profile } />
      <Route exact path="/receitas-feitas" component={ ListofRecipes } />
      <Route exact path="/receitas-favoritas" component={ ListofRecipes } />
    </Switch>
  );
}
