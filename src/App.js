import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login';
import Foods from './pages/Foods';

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/comidas" component={ Foods } />
      </Switch>
    </div>
  );
}

export default App;
