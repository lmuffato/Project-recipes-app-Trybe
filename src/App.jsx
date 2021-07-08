import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Login from './pages/Login';
import Food from './pages/Food';
import Foods from './pages/Foods';
import Drink from './pages/Drink';
import Drinks from './pages/Drinks';
import RecipesDone from './pages/RecipesDone';
import RecipesFavorite from './pages/RecipesFavorite';
import Explorer from './pages/Explorer';
import ExplorerFoods from './pages/ExplorerFoods';
import ExplorerDrinks from './pages/ExplorerDrinks';
import ExplorerFoodsIngredients from './pages/ExplorerFoodsIngredients';
import ExplorerDrinksIngredients from './pages/ExplorerDrinksIngredients';
import ExplorerFoodsLocal from './pages/ExplorerFoodsLocal';
import Perfil from './pages/Perfil';
import NotFound from './pages/NotFound';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './styles/global.css';

import RecipesProvider from './context/recipesContext/recipesProvider';

function App() {
  return (
    <RecipesProvider>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/comidas/:id/in-progress" component={ NotFound } />
        <Route path="/comidas/:id" component={ Food } />
        <Route path="/comidas" component={ Foods } />
        <Route path="/bebidas/:id/in-progress" component={ NotFound } />
        <Route path="/bebidas/:id" component={ Drink } />
        <Route path="/bebidas" component={ Drinks } />
        <Route
          path="/explorar/comidas/ingredientes"
          component={ ExplorerFoodsIngredients }
        />
        <Route
          path="/explorar/bebidas/ingredientes"
          component={ ExplorerDrinksIngredients }
        />
        <Route path="/explorar/comidas/area" component={ ExplorerFoodsLocal } />
        <Route path="/explorar/comidas" component={ ExplorerFoods } />
        <Route path="/explorar/bebidas" component={ ExplorerDrinks } />
        <Route path="/explorar" component={ Explorer } />
        <Route path="/perfil" component={ Perfil } />
        <Route path="/receitas-feitas" component={ RecipesDone } />
        <Route path="/receitas-favoritas" component={ RecipesFavorite } />
        <Route component={ NotFound } />
      </Switch>
    </RecipesProvider>
  );
}

export default App;
