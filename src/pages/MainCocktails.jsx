import React from 'react';
import CocktailsCards from '../components/CocktailsCards';
import FilterCocktailsByCategories from '../components/FilterCocktailsByCategories';
import Header from '../components/Header';
import SearchButton from '../components/SearchButton';
import InferiorMenu from '../components/InferiorMenu';
import '../CSS/MainRecipes.css';

export default function MainCocktails() {
  return (
    <div>
      <Header className="header">
        <h1 data-testid="page-title">Bebidas</h1>
        <SearchButton page="/bebidas" />
      </Header>
      <FilterCocktailsByCategories />
      <CocktailsCards />
      <InferiorMenu />
    </div>
  );
}
