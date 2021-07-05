import React, { useState } from 'react';
import PropTypes from 'prop-types';

export default function CategoriesButtons({ categories, toggleCategory }) {
  const maxLength = 4;
  const [checked, setChecked] = useState('');

  function toggle(ev) {
    if (checked === ev.target.id) {
      ev.target.checked = false;
      setChecked('');
      toggleCategory('');
    }
  }

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
                onClick={ toggle }
              />
              { category.strCategory }
            </label>
          )) }
        <label htmlFor="5">
          <input
            id="5"
            type="radio"
            name="category-button"
            value=""
            data-testid="All-category-filter"
            onClick={ toggle }
          />
          All
        </label>
      </label>
    </form>
  );
}

CategoriesButtons.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.object),
  toggleCategory: PropTypes.func,
}.isRequired;
