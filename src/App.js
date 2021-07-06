import React from 'react';
import { Route, Switch } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './compenents/Footer';
// import MainRecepies from './compenents/MainRecepies';
import SearchbarProvider from './contexts/SeachbarProvider';
// import UserProvider from './contexts/UserProvider';
import MainMealsRecipes from './pages/MainRecipesPage';
import RecipesProvider from './contexts/RecipesProvider';

function App() {
  return (
    <div className="meals">
      {/* <UserProvider> */}
      <SearchbarProvider>
        <RecipesProvider>
          <Switch>
            <Route exact path="/" component={ LoginPage } />
            <Route exact path="/comidas" component={ MainMealsRecipes } />
            <Route exact path="/bebidas" component={ MainMealsRecipes } />
          </Switch>
          <Footer />
        </RecipesProvider>
      </SearchbarProvider>
      {/* </UserProvider> */}
    </div>
  );
}

export default App;
