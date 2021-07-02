import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import useMainRecipe from '../hooks/useMainRecipe';

export default function Foods() {
  const { renderCards, recipe } = useMainRecipe('meal');
  const { meals } = recipe.list;

  return (
    <main>
      <Header title="Comidas" searchIcon />
      <div>
        {meals.map((category) => (
          <label htmlFor={ category } key={ category }>
            {category.replace(category[0], category[0].toUpperCase())}
            <input
              data-testid={ `${category}-category-filter` }
              type="radio"
              name="category-radio"
              id={ category }
            />
          </label>
        ))}
      </div>
      <div>{renderCards()}</div>
      <Footer />
    </main>
  );
}
