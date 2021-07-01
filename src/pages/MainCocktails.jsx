import React from 'react';
import CocktailsCards from '../components/CocktailsCards';
import FilterCocktailsByCategories from '../components/FilterCocktailsByCategories';
import Header from '../components/Header';
import SearchButton from '../components/SearchButton';

export default function MainCocktails(props) {
  return (
    <div>
      <Header>
        <SearchButton props={ props } />
      </Header>
      <h1 data-testid="page-title">Bebidas</h1>
      <FilterCocktailsByCategories />
      <CocktailsCards />
    </div>
  );
}
