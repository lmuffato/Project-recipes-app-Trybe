import React from 'react';
import Header from '../components/Header';
import SearchButton from '../components/SearchButton';

export default function MainCocktails() {
  return (
    <div>
      <Header>
        <h1 data-testid="page-title">Bebidas</h1>
        <SearchButton />
      </Header>
    </div>
  );
}
