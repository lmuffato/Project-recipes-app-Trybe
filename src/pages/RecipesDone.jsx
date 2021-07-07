import React from 'react';
import Header from '../components/Header';

export default function RecipesDone() {
  return (
    <>
      <Header title="Receitas Feitas" />
      <button type="button" data-testis="filter-by-all-button">All</button>
      <button type="button" data-testis="filter-by-food-button">Foods</button>
      <button type="button" data-testis="filter-by-drink-button">Drinks</button>
    </>
  );
}
