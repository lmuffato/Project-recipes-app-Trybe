import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Explore from './pages/Explore';
import Home from './pages/Home';
import Login from './pages/Login';
import RecipeDetails from './pages/RecipeDetails';
import Profile from './pages/Profile';
import ExploreFoods from './pages/ExploreFoods';
import ExploreDrinks from './pages/ExploreDrinks';
import DetailsContextProvider from './context/DetailsContext';
import FavoriteRecipes from './pages/FavoriteRecipes';

function App() {
  return (
    <DetailsContextProvider>
      <Switch>
        <Route path="/" exact component={ Login } />
        <Route
          exact
          path="/comidas"
          render={ (props) => <Home { ...props } type="meals" /> }
        />
        <Route
          exact
          path="/bebidas"
          render={ (props) => <Home { ...props } type="drinks" /> }
        />
        <Route path="/perfil" component={ Profile } />
        <Route path="/explorar" exact component={ Explore } />
        <Route path="/explorar/comidas" component={ ExploreFoods } />
        <Route path="/explorar/bebidas" component={ ExploreDrinks } />
        <Route
          exact
          path="/comidas/:id"
          render={ (props) => <RecipeDetails { ...props } type="meals" /> }
        />
        <Route
          exact
          path="/bebidas/:id"
          render={ (props) => <RecipeDetails { ...props } type="drinks" /> }
        />
        <Route path="/receitas-favoritas" component={ FavoriteRecipes } />
      </Switch>
    </DetailsContextProvider>
  );
}
export default App;
