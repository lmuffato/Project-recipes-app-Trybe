import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Explore from './pages/Explore';
import Login from './pages/Login';
import MainRecipes from './pages/MainRecipes';
import Perfil from './pages/Perfil';

function App() {
  return (
    <Switch>
      <Route exact path="/explorar" component={ Explore } />
      <Route exact path="/" component={ Login } />
      <Route path={ ['/comidas', '/bebidas'] } component={ MainRecipes } />
      <Route path="/perfil" component={ Perfil } />
    </Switch>
  );
}

export default App;
