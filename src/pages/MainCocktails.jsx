import React from 'react';
import CocktailsCards from '../components/CocktailsCards';
import Header from '../components/Header';
import SearchButton from '../components/SearchButton';

const MainCocktails = () => (
  <div>
    <Header>
      <h1 data-testid="page-title">Bebidas</h1>
      <SearchButton page="/bebidas" />
    </Header>
    <CocktailsCards />
  </div>

);

export default MainCocktails;
