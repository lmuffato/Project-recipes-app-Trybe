import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { FoodProvider } from './Context/FoodProvider';
import Login from './Pages/Login';
import FoodPage from './Pages/FoodPage';
import BeveragePage from './Pages/BeveragePage';
import ProfilePage from './Pages/ProfilePage';
import DetailsPage from './Pages/DetailsPage';
import ExplorePage from './Pages/ExplorePage';
import ProgressPage from './Pages/ProgressPage';
import './App.css';
import DoneRecipes from './Pages/DoneRecipes';
import ExploreDrinks from './Pages/ExploreDrinks';
import ExploreFood from './Pages/ExploreFood';
import Area from './Pages/Area';
import FavoriteRecipes from './Pages/FavoriteRecipes';

function App() {
  return (
    <FoodProvider>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/comidas" component={ FoodPage } />
        <Route exact path="/comidas/:id" component={ DetailsPage } />
        <Route exact path="/comidas/:id/in-progress" component={ ProgressPage } />
        <Route exact path="/bebidas" component={ BeveragePage } />
        <Route exact path="/bebidas/:id" component={ DetailsPage } />
        <Route exact path="/bebidas/:id/in-progress" component={ ProgressPage } />
        <Route exact path="/perfil" component={ ProfilePage } />
        <Route exact path="/explorar" component={ ExplorePage } />
        <Route exact path="/explorar/comidas" component={ ExploreFood } />
        <Route exact path="/explorar/bebidas" component={ ExploreDrinks } />
        <Route exact path="/receitas-feitas" component={ DoneRecipes } />
        <Route exact path="/receitas-favoritas" component={ FavoriteRecipes } />
        <Route exact path="/explorar/comidas/area" component={ Area } />
      </Switch>
    </FoodProvider>
  );
}

export default App;
