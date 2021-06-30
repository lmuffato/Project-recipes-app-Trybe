import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Login from './pages/otherPages/Login';
import perfil from './pages/otherPages/perfil';
import doneRecipes from './pages/otherPages/doneRecipes';
import favoriteRecipes from './pages/otherPages/favoriteRecipes';
import mainFood from './pages/recipes/mainFoodRecipes';
import mainDrink from './pages/recipes/mainDrinkRecipes';
import explorePage from './pages/explore/explorePage';
import exploreFoodPage from './pages/explore/exploreFoodPage';
import exploreDrinkPage from './pages/explore/exploreDrinkPage';
import exploreFoodIngredientsPage from './pages/explore/exploreFoodIngredientsPage';
import exploreDrinkIngredientsPage from './pages/explore/exploreDrinkIngredientsPage';

export default function Routes() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route path="/comidas" component={ mainFood } />
          <Route path="/bebidas" component={ mainDrink } />
          <Route path="/explorar" component={ explorePage } />
          <Route path="/explorar/comidas" component={ exploreFoodPage } />
          <Route path="/explorar/bebidas" component={ exploreDrinkPage } />
          <Route path="/explorar/comidas/ingredientes" component={ exploreFoodIngredientsPage } />
          <Route path="/explorar/bebidas/ingredientes" component={ exploreDrinkIngredientsPage } />
          <Route path="/perfil" component={ perfil } />
          <Route path="/receitas-feitas" component={ doneRecipes } />
          <Route path="/receitas-favoritas" component={ favoriteRecipes } />
        </Switch>
      </BrowserRouter>
    </div>
  );
}
