import React from 'react';
import { Route, Switch } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './compenents/Footer';
// import MainRecepies from './compenents/MainRecepies';
import SearchbarProvider from './contexts/SeachbarProvider';
import UserProvider from './contexts/UserProvider';
import MealDescription from './compenents/MealDescription';
import DrinkDescription from './compenents/DrinkDescription';
// import SearchBar from './compenents/SearchBar';

function App() {
  return (
    <div className="meals">
      <UserProvider>
        <SearchbarProvider>
          <Switch>
            <Route path="/comidas/:detalhes" component={ MealDescription } />
            <Route path="/bebidas/:detalhes" component={ DrinkDescription } />
            <Route exact path="/" component={ LoginPage } />
          </Switch>
          {/* <SearchBar /> */}
          <Footer />
        </SearchbarProvider>
      </UserProvider>
    </div>
  );
}

export default App;
