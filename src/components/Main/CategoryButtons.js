import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import FoodContext from '../../contexts/FoodContext';

const NUMBER_OF_CATEGORIES = 5;

export default function CategoryButtons({ categories }) {

  const { filterFoodByCategory } = useContext(FoodContext);

  return (
    <div>
      {categories.map((categoryName, index) => (
        index < NUMBER_OF_CATEGORIES ? (
          <button
            type="submit"
            key={ index }
            data-testid={ `${categoryName.strCategory}-category-filter` }
            onClick={ (ev) => filterFoodByCategory(ev, categoryName.strCategory) }
          >
            {categoryName.strCategory}
          </button>) : ''
      ))}
    </div>
  );
}

CategoryButtons.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.shape({})),
}.isRequired;
