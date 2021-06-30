import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Switch } from 'react-router-dom';
import MainRecipes from './pages/MainRecipes';

function App() {
  return (
    <Switch>
      <MainRecipes />
    </Switch>
  );
}

export default App;
