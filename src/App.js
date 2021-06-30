import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import rockGlass from './images/rockGlass.svg';
import UserProvider from './context/UserProvider';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login';
import MainRecipes from './pages/MainRecipes';
import MainCocktails from './pages/MainCocktails';
import Explore from './pages/Explore';
import Profile from './pages/Profile';

function App() {
  return (
    <div className="meals">
      <span className="logo">TRYBE</span>
      <object
        className="rocksGlass"
        type="image/svg+xml"
        data={ rockGlass }
      >
        Glass
      </object>
      <BrowserRouter>
        <UserProvider>
          <Switch>
            <Route exact path="/" component={ Login } />
            <Route path="/explorar" component={ Explore } />
            <Route path="/comidas" component={ MainRecipes } />
            <Route path="/bebidas" component={ MainCocktails } />
            <Route path="/profile" component={ Profile } />
          </Switch>
        </UserProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
