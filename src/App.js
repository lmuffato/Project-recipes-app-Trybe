import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Explore from './pages/Explore';
import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';

function App() {
  return (
    <Switch>
      <Route path="/" exact component={ Login } />
      <Route
        path="/comidas"
        exact
        render={ (props) => <Home { ...props } type="meals" /> }
      />
      <Route
        path="/bebidas"
        exact
        render={ (props) => <Home { ...props } type="drinks" /> }
      />
      <Route path="/perfil" component={ Profile } />
      <Route path="/explorar" exact component={ Explore } />
    </Switch>
  );
}

export default App;
