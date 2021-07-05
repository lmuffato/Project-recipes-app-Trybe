import React, { useContext } from 'react';
import { useLocation } from 'react-router';
import PropTypes from 'prop-types';
import FoodContext from '../../contexts/FoodContext';
import DrinkContext from '../../contexts/DrinkContext';
import { fetchFoodByCategoryName } from '../../services/mealAPI';
import { fetchDrinkByCategoryName } from '../../services/cocktailAPI';

const NUMBER_OF_CATEGORIES = 5;

export default function CategoryButtons({ categories }) {
  const { setFoods } = useContext(FoodContext);
  const { setDrinks } = useContext(DrinkContext);
  const { pathname } = useLocation();

  function handleFilterByCategoryName(categoryName) {
    if (pathname === '/comidas') {
      fetchFoodByCategoryName(categoryName).then((data) => setFoods(data.meals));
    }
    if (pathname === '/bebidas') {
      fetchDrinkByCategoryName(categoryName).then((data) => setDrinks(data.drinks));
    }
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
