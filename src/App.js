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

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/comidas/:idMeal/in-progress" component={ MealInProgress } />
      <Route path="/bebidas/:idDrink/in-progress" component={ DrinkInProgress } />
      <Route path="/comidas/:idMeal" component={ MealDetails } />
      <Route path="/bebidas/:idDrink" component={ DrinkDetails } />
      <Route path="/comidas" component={ MainFood } />
      <Route path="/bebidas" component={ MainDrink } />
      <Route path="/explorar" component={ Explore } />
    </Switch>
  );
}

export default App;
