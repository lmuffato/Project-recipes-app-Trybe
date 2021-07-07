import React, { useContext } from 'react';
import { useLocation } from 'react-router';
import PropTypes from 'prop-types';
import FoodContext from '../../contexts/FoodContext';
import DrinkContext from '../../contexts/DrinkContext';
import { fetchFoodByCategoryName, fetchFoods } from '../../services/mealAPI';
import { fetchDrinkByCategoryName, fetchCocktails } from '../../services/cocktailAPI';

const NUMBER_OF_CATEGORIES = 5;
let COUNTER_OF_CLICKS = 1;

export default function CategoryButtons({ categories }) {
  const { setFoods } = useContext(FoodContext);
  const { setDrinks } = useContext(DrinkContext);
  const { pathname } = useLocation();

  console.log('Clicado');

  function handleFilterByCategoryName(categoryName) {
    if (pathname === '/comidas' && COUNTER_OF_CLICKS % 2 === 0) {
      fetchFoodByCategoryName(categoryName).then((data) => setFoods(data.meals));
    } else if (pathname === '/comidas' && COUNTER_OF_CLICKS % 2 !== 0) {
      fetchFoods().then((data) => setFoods(data.meals));
    } else if (pathname === '/bebidas' && COUNTER_OF_CLICKS % 2 === 0) {
      fetchDrinkByCategoryName(categoryName).then((data) => setDrinks(data.drinks));
    } else if (pathname === '/bebidas' && COUNTER_OF_CLICKS % 2 !== 0) {
      fetchCocktails().then((data) => setDrinks(data.drinks));
    }
  }

  return (
    <div className="category-button">
      {categories.map((categoryName, index) => (
        index < NUMBER_OF_CATEGORIES ? (
          <label htmlFor="category-button">
            {categoryName.strCategory}
            <input
              id="checkbox-category"
              name="category-button"
              value={ categoryName.strCategory }
              type="checkbox"
              key={ index }
              data-testid={ `${categoryName.strCategory}-category-filter` }
              onClick={ () => {
                COUNTER_OF_CLICKS += 1;
                handleFilterByCategoryName(categoryName.strCategory);
              } }
            />
          </label>
        ) : ''
      ))}
    </div>
  );
}

CategoryButtons.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.shape({})),
}.isRequired;
