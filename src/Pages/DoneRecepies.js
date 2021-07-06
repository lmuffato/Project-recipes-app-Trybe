import React from 'react';
import Header from '../components/Header';

function DoneRecepies() {
  const filterButtons = () => (
    <section>
      <button type="button" data-testid="filter-by-all-btn">
        All
      </button>
      <button type="button" data-testid="filter-by-food-btn">
        Food
      </button>
      <button type="button" data-testid="filter-by-drink-btn">
        Drinks
      </button>
    </section>
  );

  return (
    <>
      <Header props={ { search: false, title: 'Receitas Feitas' } } />
      {filterButtons()}
    </>
  );
}

export default DoneRecepies;
