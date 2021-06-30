import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Switch, Route } from 'react-router-dom';
import Login from './Pages/Login';
import MainFood from './Pages/MainFood';
import MainDrink from './Pages/MainDrink';
import MealInProgress from './Pages/MealInProgress';
import DrinkInProgress from './Pages/DrinkInProgress';
import MealDetails from './Pages/MealDetails';
import DrinkDetails from './Pages/DrinkDetails';
import Explore from './Pages/Explore';
import ExploreFoods from './Pages/ExploreFoods';
import ExploreDrinks from './Pages/ExploreDrinks';
import ExploreFoodsByIngredients from './Pages/ExploreFoodsByIngredients';
import ExploreDrinksByIngredients from './Pages/ExploreDrinksByIngredients';
import ExploreFoodByArea from './Pages/ExploreFoodByArea';
import UserProfile from './Pages/UserProfile';
import DoneRecepies from './Pages/DoneRecepies';
import FavoriteRecepies from './Pages/FavoriteRecepies';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/comidas/:idMeal/in-progress" component={ MealInProgress } />
      <Route path="/bebidas/:idDrink/in-progress" component={ DrinkInProgress } />
      <Route
        path="/explorar/comidas/ingredientes"
        component={ ExploreFoodsByIngredients }
      />
      <Route
        path="/explorar/bebidas/ingredientes"
        component={ ExploreDrinksByIngredients }
      />
      <Route
        path="/explorar/comidas/area"
        component={ ExploreFoodByArea }
      />
      <Route path="/comidas/:idMeal" component={ MealDetails } />
      <Route path="/bebidas/:idDrink" component={ DrinkDetails } />
      <Route path="/explorar/comidas" component={ ExploreFoods } />
      <Route path="/explorar/bebidas" component={ ExploreDrinks } />
      <Route path="/comidas" component={ MainFood } />
      <Route path="/bebidas" component={ MainDrink } />
      <Route path="/explorar" component={ Explore } />
      <Route path="/perfil" component={ UserProfile } />
      <Route path="/receitas-feitas" component={ DoneRecepies } />
      <Route path="/receitas-favoritas" component={ FavoriteRecepies } />
    </Switch>
  );
}

export default App;
