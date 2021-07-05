import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Route, Switch } from 'react-router';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProviderRecipes from './context/ProviderRecipes';
import ByIngredients from './screens/ByIngredients';
import ByOrigin from './screens/ByOrigin';
import Detail from './screens/Detail';
import Explore from './screens/Explore';
import ExploreFilters from './screens/ExploreFilters';
import Favorites from './screens/Favorites';
import InProcess from './screens/InProcess';
import Login from './screens/Login';
import MadeRecipes from './screens/MadeRecipes';
import Main from './screens/Main';
import NotFound from './screens/NotFound';
import Profile from './screens/Profile';

function App() {
  return (
    <BrowserRouter>
      <ProviderRecipes>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route path="/main" component={ Main } />
          <Route path="/detail" component={ Detail } />
          <Route path="/explore" component={ Explore } />
          <Route path="/explore/filters" component={ ExploreFilters } />
          <Route path="/explore/ingredients" component={ ByIngredients } />
          <Route path="/explore/origin" component={ ByOrigin } />
          <Route path="/made-recipes" component={ MadeRecipes } />
          <Route path="/in-process-recipes" component={ InProcess } />
          <Route path="/profile" component={ Profile } />
          <Route path="/favorites" component={ Favorites } />
          <Route component={ NotFound } />
        </Switch>
      </ProviderRecipes>
    </BrowserRouter>
  );
}

export default App;
