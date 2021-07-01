import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import rockGlass from './images/rockGlass.svg';
import UserProvider from './context/UserProvider';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login';
import Main from './pages/Main';
import Cocktails from './pages/Cocktails';
import MealDetails from './pages/MealDetails';
import CocktailDetails from './pages/CocktailDetails';

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
            <Route path="/comidas" component={ Main } />
            <Route path="/bebidas" component={ Cocktails } />
            <Route path="/comidas/:id" component={ MealDetails } />
            <Route path="/bebidas/:id" component={ CocktailDetails } />
          </Switch>
        </UserProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
