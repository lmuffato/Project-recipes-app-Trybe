import React from 'react';
import './App.css';
// import rockGlass from './images/rockGlass.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Switch, Route } from 'react-router-dom';
import Provider from './context/Provider';
import ProfileScreen from './pages/ProfileScreen/ProfileScreen';
import InitPage from './pages/InitPage/InitPage';
import RecipesDone from './pages/RecipesDone/RecipesDone';
import RecipesFav from './pages/RecipesFav/RecipesFav';

function App() {
  return (
    <Provider>
      <Switch>
        <Route exact path="/" component={ InitPage } />
        <Route path="/perfil" component={ ProfileScreen } />
        <Route path="/receitas-feitas" component={ RecipesDone } />
        <Route path="/receitas-favoritas" component={ RecipesFav } />
      </Switch>
    </Provider>
  );
}

export default App;
