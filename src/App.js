import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
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
          <Route
            path="/comidas/:id/in-progress"
            render={ (props) => <InProcess { ...props } /> }
          />
          <Route
            path="/bebidas/:id/in-progress"
            render={ (props) => <InProcess { ...props } /> }
          />
          <Route path="/comidas/:id" render={ (props) => <Detail { ...props } /> } />
          <Route path="/bebidas/:id" render={ (props) => <Detail { ...props } /> } />
          <Route path="/comidas" component={ Main } />
          <Route path="/bebidas" component={ Main } />
          <Route path="/explorar" component={ Explore } />
          <Route path="/explorar/comidas" component={ ExploreFilters } />
          <Route path="/explorar/bebidas" component={ ExploreFilters } />
          <Route path="/explorar/bebidas/ingredientes" component={ ByIngredients } />
          <Route path="/explorar/comidas/area" component={ ByOrigin } />
          <Route path="/receitas-feitas" component={ MadeRecipes } />
          <Route path="/perfil" component={ Profile } />
          <Route path="/receitas-favoritas" component={ Favorites } />
          <Route component={ NotFound } />
        </Switch>
      </ProviderRecipes>
    </BrowserRouter>
  );
}

export default App;
