import React from 'react';

export default function CategoriesButtons({ categories, toggleCategory }) {
  const maxLength = 4;
  return (
    <form>
      <label
        htmlFor="category-button"
        onChange={ (ev) => toggleCategory(ev.target.value) }
      >
        { categories
          .filter((_, index) => index <= maxLength)
          .map((category, index) => (
            <label key={ index } htmlFor={ index }>
              <input
                id={ index }
                type="radio"
                name="category-button"
                value={ category.strCategory }
                data-testid={ `${category.strCategory}-category-filter` }
              />
              { category.strCategory }
            </label>
          )) }
      </label>
    </form>
  );
}
