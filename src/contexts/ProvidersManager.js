import React from 'react';
import { Route, Switch } from 'react-router-dom';
import RecipesProvider from './RecipesProvider';
import MainMealsRecipes from '../pages/MainRecipesPage';
import Explore from '../pages/Explore';
import Foods from '../pages/Foods';
import Drinks from '../pages/Drinks';
import DrinksIngredients from '../pages/DrinksIngredients';
import FoodsIngredients from '../pages/FoodsIngredients';
import FoodsArea from '../pages/FoodsArea';
import LoginPage from '../pages/LoginPage';

function ProvidersManager() {
  return (
    <RecipesProvider>
      <Switch>
        <Route exact path="/" component={ LoginPage } />
        <Route exact path="/comidas" component={ MainMealsRecipes } />
        <Route exact path="/bebidas" component={ MainMealsRecipes } />
        <Route exact path="/explorar" component={ Explore } />
        <Route exact path="/explorar/comidas" component={ Foods } />
        <Route exact path="/explorar/bebidas" component={ Drinks } />
        <Route
          path="/explorar/comidas/ingredientes"
          component={ FoodsIngredients }
        />
        <Route
          path="/explorar/bebidas/ingredientes"
          component={ DrinksIngredients }
        />
        <Route exact path="/explorar/comidas/area" component={ FoodsArea } />
      </Switch>
    </RecipesProvider>
  );
}

export default ProvidersManager;
