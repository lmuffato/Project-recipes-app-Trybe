import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import RecipesProvider from './provider/RecipesProvider';

import { Login, MainFoods, MainDrinks, Profile, Explore } from './pages';

const App = () => (
  <BrowserRouter>
    <RecipesProvider>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/comidas" component={ MainFoods } />
        <Route path="/bebidas" component={ MainDrinks } />
        <Route path="/perfil" component={ Profile } />
        <Route path="/explorar" component={ Explore } />
      </Switch>
    </RecipesProvider>
  </BrowserRouter>
);

export default App;
