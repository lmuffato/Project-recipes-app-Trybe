import React from 'react';
import { Route, Switch } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './compenents/Header';
import Footer from './compenents/Footer';
import Profile from './pages/ProfilePage';
import ReceitasFeitas from './pages/ReceitasFeitas';
import ReceitasFavoritas from './pages/ReceitasFavoritas';
import UserProvider from './contexts/UserProvider';
import SearchbarProvider from './contexts/SeachbarProvider';
import Explore from './pages/Explore';
import Foods from './pages/Foods';
import Drinks from './pages/Drinks';
import DrinksIngredients from './pages/DrinksIngredients';
import FoodsIngredients from './pages/FoodsIngredients';
import FoodsArea from './pages/FoodsArea';
import NotFound from './compenents/NotFound';
import MealDescription from './compenents/MealDescription';
import DrinkDescription from './compenents/DrinkDescription';

function App() {
  return (
    <div className="meals">
      <UserProvider>
        <SearchbarProvider>
          <Header />
          <Switch>
            <Route path="/comidas/:detalhes" component={ MealDescription } />
            <Route path="/bebidas/:detalhes" component={ DrinkDescription } />
            <Route exact path="/" component={ LoginPage } />
            <Route exact path="/explorar" component={ Explore } />
            <Route exact path="/explorar/comidas" component={ Foods } />
            <Route exact path="/explorar/bebidas" component={ Drinks } />
            <Route path="/perfil" component={ Profile } />
            <Route path="/receitas-feitas" component={ ReceitasFeitas } />
            <Route path="/receitas-favoritas" component={ ReceitasFavoritas } />
            <Route
              path="/explorar/comidas/ingredientes"
              component={ FoodsIngredients }
            />
            <Route
              path="/explorar/bebidas/ingredientes"
              component={ DrinksIngredients }
            />
            <Route exact path="/explorar/comidas/area" component={ FoodsArea } />
            <Route exact path="/explorar/bebidas/area" component={ NotFound } />
          </Switch>
          <Footer />
        </SearchbarProvider>
      </UserProvider>
    </div>
  );
}

export default App;
