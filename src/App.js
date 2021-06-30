import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Switch, Route } from 'react-router-dom';
import MainFood from './pages/MainFood';

function App() {
  return (
    <Switch>
      <Route path="/comidas" component={ MainFood } />
    </Switch>
  );
}

export default App;
