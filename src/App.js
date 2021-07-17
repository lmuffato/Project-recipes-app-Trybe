import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './pages/login/index';
import RecipesMain from './pages/RecipesMain/index';
import RecipeDetails from './pages/RecipeDetails';
import Explore from './pages/Explore/index';
import AppProvider from './context/AppContext';
import RecipesProgress from './pages/RecipesProgress';
import ExploreFoods from './pages/ExploreFoods/index';
import ExploreDrinks from './pages/ExploreDrinks/index';
import ExploreByIngredient from './pages/ExploreByIngredient';
import ExploreByAreaFoods from './pages/ExploreByAreaFoods';
import 'bootstrap/dist/css/bootstrap.min.css';
import RecipesFavorites from './pages/RecipesFavorite';
import RecipesDone from './pages/RecipesDone';
import ProfileScreen from './pages/ProfileScreen';
import './App.css';

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/comidas" component={ RecipesMain } />
          <Route exact path="/bebidas" component={ RecipesMain } />
          <Route exact path="/comidas/:id" component={ RecipeDetails } />
          <Route exact path="/bebidas/:id" component={ RecipeDetails } />
          <Route path="/comidas/:id/in-progress" component={ RecipesProgress } />
          <Route
            path="/bebidas/:id/in-progress"
            component={ RecipesProgress }
          />
          <Route exact path="/explorar" component={ Explore } />
          <Route exact path="/explorar/comidas" component={ ExploreFoods } />
          <Route exact path="/explorar/bebidas" component={ ExploreDrinks } />
          <Route
            exact
            path="/explorar/comidas/ingredientes"
            component={ ExploreByIngredient }
          />
          <Route
            exact
            path="/explorar/bebidas/ingredientes"
            component={ ExploreByIngredient }
          />
          <Route exact path="/explorar/comidas/area" component={ ExploreByAreaFoods } />
          <Route path="/receitas-favoritas" component={ RecipesFavorites } />
          <Route exact path="/receitas-feitas" component={ RecipesDone } />
          <Route exact path="/perfil" component={ ProfileScreen } />
        </Switch>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
