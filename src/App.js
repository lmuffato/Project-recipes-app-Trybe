import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Explore from './pages/Explore';
import Home from './pages/Home';
import Login from './pages/Login';
import RecipeDetails from './pages/RecipeDetails';
import Profile from './pages/Profile';

function App() {
  return (
    <Switch>
      <Route path="/" exact component={ Login } />
      <Route
        exact
        path="/comidas"
        render={ (props) => <Home { ...props } type="meals" /> }
      />
      <Route
        exact
        path="/bebidas"
        render={ (props) => <Home { ...props } type="drinks" /> }
      />
      <Route path="/perfil" component={ Profile } />
      <Route path="/explorar" exact component={ Explore } />
      <Route
        exact
        path="/comidas/:id"
        render={ (props) => <RecipeDetails { ...props } type="meals" /> }
      />
      <Route
        exact
        path="/bebidas/:id"
        render={ (props) => <RecipeDetails { ...props } type="drinks" /> }
      />
    </Switch>
  );
}

export default App;
