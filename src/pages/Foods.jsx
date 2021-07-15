import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import useMainRecipe from '../hooks/useMainRecipe';

export default function Foods() {
  const { renderCards, handleClickCategory, recipe } = useMainRecipe('meal');
  const { meals } = recipe.list;

  return (
    <main>
      <Header title="Comidas" searchIcon />

      <div>
        <button
          data-testid="All-category-filter"
          type="button"
          onClick={ handleClickCategory }
        >
          All
        </button>
        {meals.map((category) => (
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
