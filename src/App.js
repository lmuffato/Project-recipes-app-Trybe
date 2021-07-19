import React from 'react';
import { Switch, Route } from 'react-router-dom';
import DoneRecipes from './pages/DoneRecipes';
import Explore from './pages/Explore';
import FavoriteRecipes from './pages/FavoriteRecipes';
import Login from './pages/Login';
import MainRecipes from './pages/MainRecipes';
import Perfil from './pages/Perfil';
import Recipe from './pages/Recipe';

function App() {
  return (
    <Switch>
      <Route
        path={ ['/explorar/:meal/:type',
          '/explorar/:meal', '/explorar'] }
        component={ Explore }
      />
      <Route path={ ['/comidas/:id', '/bebidas/:id'] } component={ Recipe } />
      <Route path={ ['/comidas', '/bebidas'] } component={ MainRecipes } />
      <Route path="/receitas-feitas" component={ DoneRecipes } />
      <Route path="/receitas-favoritas" component={ FavoriteRecipes } />
      <Route path="/perfil" component={ Perfil } />
      <Route path="/" component={ Login } />
    </Switch>
  );
}

export default App;
