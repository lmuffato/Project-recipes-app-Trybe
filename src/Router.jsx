import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Login from './Pages/Login';
import Details from './Pages/Details';
import InProcess from './Pages/InProcess';
import Explore from './Pages/Explore';
import ExploreFoodOpt from './Pages/ExploreFood';
import ExploreDrinkOpt from './Pages/ExploreDrink';
import ExploreIngredientsDrink from './Pages/ExploreIngredientsDrink';
import ExploreIngredientsMeal from './Pages/ExploreIngredientsMeal';
import MealsByOrigin from './Pages/ExploreArea';
import Profile from './Pages/Profile';
import RecipeMainPage from './Pages/RecipeMainPage';
import ListofRecipes from './Pages/ListOfRecipes';
import NotFound from './Pages/NotFound';

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
          component={ ExploreIngredientsMeal }
        />
        <Route
          path="/explorar/bebidas/ingredientes"
          component={ ExploreIngredientsDrink }
        />
        <Route
          path="/explorar/comidas/area"
          component={ MealsByOrigin }
        />
        <Route
          path="/explorar/bebidas/area"
          component={ NotFound }
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
