import React from 'react';
import Header from '../components/Header';
import MealsCards from '../components/MealsCards';
import SearchButton from '../components/SearchButton';

const MainRecipes = () => (
  <div>
    <Header>
      <h1 data-testid="page-title">Comidas</h1>
      <SearchButton page="/comidas" />
    </Header>
    <MealsCards />
  </div>
);

export default MainRecipes;
