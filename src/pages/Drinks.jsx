import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import useMainRecipe from '../hooks/useMainRecipe';

export default function Drinks() {
  const { renderCards, setCategory, recipe } = useMainRecipe('drink');
  const { drinks } = recipe.list;

  return (
    <main>
      <Header title="Bebidas" searchIcon />
      <div>
        {drinks.map((category) => (
          <label htmlFor={ category } key={ category }>
            {category.replace(category[0], category[0].toUpperCase())}
            <input
              data-testid={ `${category}-category-filter` }
              type="radio"
              name="category-radio"
              value={ category }
              id={ category }
              onChange={ ({ target }) => setCategory(target.value) }
            />
          </label>
        ))}
      </div>
      <div>{renderCards()}</div>
      <Footer />
    </main>
  );
}
