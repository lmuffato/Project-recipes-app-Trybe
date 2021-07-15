import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Login from './pages/otherPages/Login';
import Profile from './pages/Profile/Profile';
import Foods from './pages/recipes/Foods';
import Drinks from './pages/recipes/Drinks';
import ExplorePage from './pages/explore/ExplorePage';
import DrinksExplore from './pages/explore/DrinkExplore';
import FoodIngredients from './pages/explore/ingredients/FoodIngredients';
import FoodsExplore from './pages/explore/FoodsExplore';
import DrinksIngredients from './pages/explore/ingredients/DrinksIngredients';
import CompletedRecipes from './pages/otherPages/CompletedRecipes';
import FavoriteRecipes from './pages/otherPages/FavoriteRecipes';
import ExploreFoodByArea from './pages/explore/ExploreFoodByArea';
import MealDetails from './pages/recipes/MealDetails';
import DrinksDetails from './pages/recipes/DrinksDetails';
import mealsProgress from './pages/recipes/in-progress/mealsProgress';
import drinksProgress from './pages/recipes/in-progress/drinksProgress';
import NotFound from './pages/otherPages/NotFound';

export default function Routes() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/perfil" component={ Profile } />
          <Route exact path="/comidas" component={ Foods } />
          <Route exact path="/bebidas" component={ Drinks } />
          <Route exact path="/comidas/:id" component={ MealDetails } />
          <Route exact path="/bebidas/:id" component={ DrinksDetails } />
          <Route exact path="/bebidas/:id/in-progress" component={ drinksProgress } />
          <Route exact path="/comidas/:id/in-progress" component={ mealsProgress } />
          <Route exact path="/explorar" component={ ExplorePage } />
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
            path="/explorar/comidas/area"
            component={ ExploreFoodByArea }
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
          <Route exact path="*" component={ NotFound } />
        </Switch>
      </BrowserRouter>
    </div>
  );
}
