import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login';
import Foods from './pages/Foods';
import Profile from './pages/Profile';
import Drinks from './pages/Drinks';
import MealRecipeCard from './pages/MealRecipeCard';
import DrinkRecipeCard from './pages/DrinkRecipeCard';
import Search from './pages/Search';
import SearchMeals from './pages/SearchMeals';
import SearchDrinks from './pages/SearchDrinks';
import SearchMealsIngredients from './pages/SearchMealsIngredients';
import SearchDrinksIngredients from './pages/SearchDrinksIngredients';
import MealArea from './pages/MealArea';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/comidas/:id-da-receita" component={ MealRecipeCard } />
        <Route exact path="/comidas" component={ Foods } />
        <Route exact path="/perfil" component={ Profile } />
        <Route exact path="/bebidas/:id-da-receita" component={ DrinkRecipeCard } />
        <Route exact path="/bebidas" component={ Drinks } />
        <Route exact path="/explorar" component={ Search } />
        <Route exact path="/explorar/comidas" component={ SearchMeals } />
        <Route exact path="/explorar/bebidas" component={ SearchDrinks } />
        <Route
          path="/explorar/comidas/ingredientes"
          component={ SearchMealsIngredients }
        />
        <Route
          path="/explorar/bebidas/ingredientes"
          component={ SearchDrinksIngredients }
        />
        <Route exact path="/explorar/comidas/area" component={ MealArea } />
        <Route exact path="/receitas-feitas" component={ DoneRecipes } />
        <Route exact path="/receitas-favoritas" component={ FavoriteRecipes } />
      </Switch>
    </div>
  );
}

export default App;
