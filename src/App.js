import React from 'react';
import { Route, Switch } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './compenents/Footer';
// import MainRecepies from './compenents/MainRecepies';
import SearchbarProvider from './contexts/SeachbarProvider';
import UserProvider from './contexts/UserProvider';
import Explore from './pages/Explore';
import Foods from './pages/Foods';
import Drinks from './pages/Drinks';
import DrinksIngredients from './pages/DrinksIngredients';
import FoodsIngredients from './pages/FoodsIngredients';
import FoodsArea from './pages/FoodsArea';

function App() {
  return (
    <div className="meals">
      <UserProvider>
        <SearchbarProvider>
          <Switch>
            <Route exact path="/" component={ LoginPage } />
            <Route exact path="/explorar" component={ Explore } />
            <Route exact path="/explorar/comidas" component={ Foods } />
            <Route exact path="/explorar/bebidas" component={ Drinks } />
            <Route exact path="/explorar/comidas/ingredientes" component={ FoodsIngredients } />
            <Route exact path="/explorar/bebidas/ingredientes" component={ DrinksIngredients } />
            <Route exact path="/explorar/comidas/area" component={ FoodsArea } />

          </Switch>
          <Footer />
        </SearchbarProvider>
      </UserProvider>
    </div>
  );
}

export default App;
