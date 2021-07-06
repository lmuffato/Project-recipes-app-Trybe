import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Login from './Pages/Login';
import Details from './Pages/Details';
import InProcess from './Pages/InProcess';
import Explore from './Pages/Explore';
import ExploreFoodOpt from './Pages/ExploreFood';
import ExploreDrinkOpt from './Pages/ExploreDrink';
import ExploreIngredients from './Pages/ExploreIngredients';
import ExploreArea from './Pages/ExploreArea';
import Profile from './Pages/Profile';
import RecipeMainPage from './Pages/RecipeMainPage';
import ListofRecipes from './Pages/ListOfRecipes';

export default function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route
          exact
          path="/comidas"
          render={ (props) => <RecipeMainPage { ...props } header="Comidas" /> }
        />
        <Route
          exact
          path="/bebidas"
          render={ (props) => <RecipeMainPage { ...props } header="Bebidas" /> }
        />
        <Route exact path="/comidas/:id" component={ Details } />
        <Route exact path="/bebidas/:id" component={ Details } />
        <Route
          path="/comidas/:id/in-progress"
          component={ InProcess }
        />
        <Route
          path="/bebidas/:id/in-progress"
          component={ InProcess }
        />
        <Route
          exact
          path="/explorar"
          component={ Explore }
        />
        <Route
          exact
          path="/explorar/comidas"
          render={ (props) => <ExploreFoodOpt { ...props } header="Explorar Comidas" /> }
        />
        <Route
          exact
          path="/explorar/bebidas"
          render={ (props) => <ExploreDrinkOpt { ...props } header="Explorar Bebidas" /> }
        />
        <Route
          path="/explorar/comidas/ingredientes"
          component={ ExploreIngredients }
        />
        <Route
          path="/explorar/bebidas/ingredientes"
          component={ ExploreIngredients }
        />
        <Route
          path="/explorar/comidas/area"
          component={ ExploreArea }
        />
        <Route
          path="/perfil"
          component={ Profile }
        />
        <Route
          path="/receitas-feitas"
          render={ (props) => <ListofRecipes { ...props } header="Receitas Feitas" /> }
        />
        <Route
          path="/receitas-favoritas"
          render={ (props) => <ListofRecipes { ...props } header="Receitas Favoritas" /> }
        />
      </Switch>
    </BrowserRouter>
  );
}
