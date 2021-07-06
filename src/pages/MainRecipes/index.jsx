import { Route } from 'react-router-dom';
import React from 'react';
import Food from './components/Food';
import Drink from './components/Drink';
import Header from '../../components/Header';

function MainRecipes() {
  return (
    <>
      <Header title="Comidas" />
      <Route path="/comidas" component={ Food } />
      <Route path="/bebidas" component={ Drink } />
    </>
  );
}

export default MainRecipes;
