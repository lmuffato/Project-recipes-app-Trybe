import { Route } from 'react-router-dom';
import React from 'react';
import Food from './components/Food';
import Drink from './components/Drink';

function MainRecipes() {
  return (
    <>
      <Route path="/comidas" component={ Food } />
      <Route path="/bebidas" component={ Drink } />
    </>
  );
}

export default MainRecipes;
