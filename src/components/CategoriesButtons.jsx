import React, { useState } from 'react';

export default function CategoriesButtons({ categories, toggleCategory }) {
  const maxLength = 4;
  const [checked, setChecked] = useState('');

  return (
    <form>
      <label
        htmlFor="category-button"
        onChange={ (ev) => {
          setChecked(ev.target.id);
          // console.log(ev.target.value);
          return toggleCategory(ev.target.value);
        } }
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
                onClick={ (ev) => {
                  if (checked === ev.target.id) {
                    ev.target.checked = false;
                    setChecked('');
                    toggleCategory('');
                  }
                } }
              />
              { category.strCategory }
            </label>
          )) }
      </label>
    </form>
  );
}
