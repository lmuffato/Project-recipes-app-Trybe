import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import FoodContext from '../../contexts/FoodContext';
import { fetchFoodByCategoryName } from '../../services/mealAPI';

const NUMBER_OF_CATEGORIES = 5;

export default function CategoryButtons({ categories }) {
  const { setFoods } = useContext(FoodContext);

  function handleFilterByCategoryName(categoryName) {
    fetchFoodByCategoryName(categoryName).then((data) => setFoods(data.meals));
  }

  return (
    <div>
      {categories.map((categoryName, index) => (
        index < NUMBER_OF_CATEGORIES ? (
          <button
            value={ categoryName.strCategory }
            type="submit"
            key={ index }
            data-testid={ `${categoryName.strCategory}-category-filter` }
            onClick={ () => handleFilterByCategoryName(categoryName.strCategory) }
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
