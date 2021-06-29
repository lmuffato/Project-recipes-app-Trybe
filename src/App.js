import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { FoodProvider } from './Context/FoodProvider';
import Login from './Pages/Login';
import FoodPage from './Pages/FoodPage';
import BeveragePage from './Pages/BeveragePage';
import ProfilePage from './Pages/ProfilePage';
import './App.css';

function App() {
  return (
    <FoodProvider>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/comidas" component={ FoodPage } />
        <Route exact path="/bebidas" component={ BeveragePage } />
        <Route exact path="/perfil" component={ ProfilePage } />
      </Switch>
    </FoodProvider>
  );
}

export default App;
