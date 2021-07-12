import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './pages/login/index';
import RecipesMain from './pages/RecipesMain/index';
import RecipeDetails from './pages/RecipeDetails';
import Explore from './pages/Explore/index';
import AppProvider from './context/AppContext';
import ExploreFoods from './pages/ExploreFoods/index';
import ExploreDrinks from './pages/ExploreDrinks/index';
import ExploreByIngredientFoods from './pages/ExploreByIngredientFoods';
import ExploreByIngredientDrinks from './pages/ExploreByIngredientDrinks';
import ExploreByAreaFoods from './pages/ExploreByAreaFoods';
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
            <Route exact path="/comidas/:id" component={ RecipeDetails } />
            <Route exact path="/bebidas/:id" component={ RecipeDetails } />
            <Route path="/explorar" component={ Explore } />
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
            <Route
              exact
              path="/explorar/comidas/ingredientes"
              component={ ExploreByIngredientFoods }
            />
            <Route
              exact
              path="/explorar/bebidas/ingredientes"
              component={ ExploreByIngredientDrinks }
            />
            <Route exact path="/explorar/comidas/area" component={ ExploreByAreaFoods } />
            <Route path="/receitas-favoritas" component={ RecipesFavorites } />
          </Switch>
        </BrowserRouter>
      </AppProvider>
    </div>
  );
}

export default App;
