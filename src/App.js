import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './pages/login/index';
import RecipesMain from './pages/RecipesMain/index';
import FoodDetails from './pages/FoodDetails/index';
import DrinkDetails from './pages/DrinkDetails/index';
import Explore from './pages/Explore/index';
import AppProvider from './context/AppContext';
import ExploreFoods from './pages/ExploreFoods/index';
import ExploreDrinks from './pages/ExploreDrinks/index';
import 'bootstrap/dist/css/bootstrap.min.css';
import RecipesFavorites from './pages/RecipesFavorite';

function App() {
  return (
    <div>
      <AppProvider>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={ Login } />
            <Route exact path="/comidas" component={ RecipesMain } />
            <Route exact path="/bebidas" component={ RecipesMain } />
            <Route path="/comidas/:id" component={ FoodDetails } />
            <Route path="/bebidas/:id" component={ DrinkDetails } />
            {/* <Route
              path="/comidas/{id-da-receita}/in-progress"
              component={ FoodInProgress }
            />
            <Route
              path="/bebidas/{id-da-receita}/in-progress"
              component={ DrinInProgress }
            /> */}
            <Route exact path="/explorar" component={ Explore } />
            <Route exact path="/explorar/comidas" component={ ExploreFoods } />
            <Route exact path="/explorar/bebidas" component={ ExploreDrinks } />
            <Route path="/receitas-favoritas" component={ RecipesFavorites } />
          </Switch>
        </BrowserRouter>
      </AppProvider>
    </div>
  );
}

export default App;
