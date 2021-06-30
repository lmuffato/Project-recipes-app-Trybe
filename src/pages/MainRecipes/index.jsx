import { Route } from 'react-router-dom';
import React from 'react';
import Drink from './components/Drink';
import Food from './components/Food';

function MainRecipes() {
  return (
    <>
      <Route path="/comidas" component={ Food } />
      <Route path="/bebidas" component={ Drink } />
    </>
  );
}

export default MainRecipes;
