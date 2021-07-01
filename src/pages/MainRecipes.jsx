import React from 'react';
import FilterMealsByCategories from '../components/FilterMealsByCategories';
import Header from '../components/Header';
import MealsCards from '../components/MealsCards';
import SearchButton from '../components/SearchButton';

export default function MainRecipes(props) {
  return (
    <div>
      <Header>
        <SearchButton props={ props } />
      </Header>
      <h1 data-testid="page-title">Comidas</h1>
      <FilterMealsByCategories />
      <MealsCards />
    </div>
  );
}
