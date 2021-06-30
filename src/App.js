import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';

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
    </Switch>
  );
}

export default App;
