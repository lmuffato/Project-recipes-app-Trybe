import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import useMainRecipe from '../hooks/useMainRecipe';

export default function Drinks() {
  const { renderCards, handleClickCategory, recipe } = useMainRecipe('drink');
  const { drinks } = recipe.list;

  return (
    <main>
      <Header title="Bebidas" searchIcon />

      <div>
        <button
          type="button"
          onClick={ handleClickCategory }
          data-testid="All-category-filter"
        >
          All
        </button>
        {drinks.map((category) => (
          <button
            key={ category }
            data-testid={ `${category}-category-filter` }
            type="button"
            onClick={ handleClickCategory }
          >
            {category.replace(category[0], category[0].toUpperCase())}
          </button>
        ))}
      </div>

      <div>{renderCards()}</div>

      <Footer />
    </main>
  );
}
