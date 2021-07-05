import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './pages/login/index';
import RecipesMain from './pages/RecipesMain/index';
import FoodDetails from './pages/FoodDetails/index';
import DrinkDetails from './pages/DrinkDetails/index';
import AppProvider from './context/AppContext';
import RecipesProgress from './pages/RecipesProgress';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div>
      <AppProvider>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={ Login } />
            <Route exact path="/comidas" component={ RecipesMain } />
            <Route exact path="/bebidas" component={ RecipesMain } />
            <Route exact path="/comidas/:id" component={ FoodDetails } />
            <Route exact path="/bebidas/:id" component={ DrinkDetails } />
            <Route
              path="/comidas/:id/in-progress"
              component={ RecipesProgress }
            />
            <Route
              path="/bebidas/:id/in-progress"
              component={ RecipesProgress }
            />
            {/* <Route path="/explorar" component={ Explore } />
            <Route path="/explorar/comidas" component={ ExploreFoods } />
            <Route path="/explorar/bebidas" component={ ExploreDrinks } /> */}
          </Switch>
        </BrowserRouter>
      </AppProvider>
    </div>
  );
}

export default App;
