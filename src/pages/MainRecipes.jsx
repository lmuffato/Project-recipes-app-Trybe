import React from 'react';
import Header from '../components/Header';
import SearchButton from '../components/SearchButton';

export default function MainRecipes() {
  return (
    <div>
      <Header>
        <h1 data-testid="page-title">Comidas</h1>
        <SearchButton />
      </Header>
    </div>
  );
}
