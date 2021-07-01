import React from 'react';
import Header from '../components/Header';
import MealsCards from '../components/MealsCards';
import SearchButton from '../components/SearchButton';

export default function MainRecipes(props) {
  return (
    <div>
      <Header>
        <h1 data-testid="page-title">Comidas</h1>
        <SearchButton props={ props } />
      </Header>
      <MealsCards />
    </div>
  );
}
