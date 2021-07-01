import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Login from './pages/otherPages/Login';
import recipesPage from './pages/recipes/recipesPage';
import Profile from './pages/Profile/Profile';
import Drinks from './pages/recipes/Drinks';
import explorePage from './pages/explore/explorePage';
import DrinksExplore from './pages/explore/DrinkExplore';
import FoodIngredients from './pages/explore/ingredients/FoodIngredients';
import FoodsExplore from './pages/explore/FoodsExplore';
import DrinksIngredients from './pages/explore/ingredients/DrinksIngredients';
import CompletedRecipes from './pages/recipes/CompletedRecipes';
import FavoriteRecipes from './pages/recipes/FavoriteRecipes';
import ExploreFoodByArea from './pages/explore/ExploreFoodByArea';

export default function Routes() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/comidas" component={ recipesPage } />
          <Route exact path="/perfil" component={ Profile } />
          <Route exact path="/bebidas" component={ Drinks } />
          <Route exact path="/explorar" component={ explorePage } />
          <Route exact path="/explorar/bebidas" component={ DrinksExplore } />
          <Route exact path="/explorar/comidas" component={ FoodsExplore } />
          <Route
            exact
            path="/explorar/comidas/ingredientes"
            component={ FoodIngredients }
          />
          <Route
            exact
            path="/explorar/bebidas/ingredientes"
            component={ DrinksIngredients }
          />
          <Route
            exact
            path="/receitas-feitas"
            component={ CompletedRecipes }
          />
          <Route
            exact
            path="/receitas-favoritas"
            component={ FavoriteRecipes }
          />
          <Route
            exact
            path="/explorar/comidas/area"
            component={ ExploreFoodByArea }
          />
        </Switch>
      </BrowserRouter>
    </div>
  );
}
