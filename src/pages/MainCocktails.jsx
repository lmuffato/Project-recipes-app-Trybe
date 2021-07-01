import React from 'react';
import CocktailsCards from '../components/CocktailsCards';
import Header from '../components/Header';
// import SearchBar from '../components/SearchBar';
import SearchButton from '../components/SearchButton';

export default function MainCocktails(props) {
  return (
    <div>
      <Header>
        <h1 data-testid="page-title">Bebidas</h1>
        <SearchButton props={ props } />
      </Header>
      <CocktailsCards />
    </div>
  );
}
