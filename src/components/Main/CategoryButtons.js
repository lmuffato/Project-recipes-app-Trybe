import React, { useContext } from 'react';
import { useLocation } from 'react-router';
import PropTypes from 'prop-types';
import FoodContext from '../../contexts/FoodContext';
import DrinkContext from '../../contexts/DrinkContext';
import { fetchFoodByCategoryName, fetchFoods } from '../../services/mealAPI';
import { fetchDrinkByCategoryName, fetchCocktails } from '../../services/cocktailAPI';

const NUMBER_OF_CATEGORIES = 5;

export default function CategoryButtons({ categories }) {
  const { setFoods } = useContext(FoodContext);
  const { setDrinks } = useContext(DrinkContext);
  const { pathname } = useLocation();

  function handleFilterByCategoryName(ev, categoryName) {
    const buttons = document.querySelectorAll('.category-buttons');

    let NUMBER_OF_CLICKED_CATEGORIES = 0;
    console.log('NUMBER_OF_CLICKED_CATEGORIES', NUMBER_OF_CLICKED_CATEGORIES);
    for (let index = 0; index < buttons.length; index += 1) {
      if (buttons[index].checked) {
        NUMBER_OF_CLICKED_CATEGORIES += 1;
        console.log('existem ', NUMBER_OF_CLICKED_CATEGORIES);
      }
    }

    if (pathname === '/comidas' && NUMBER_OF_CLICKED_CATEGORIES === 1) {
      fetchFoodByCategoryName(categoryName).then((data) => setFoods(data.meals));
    } else if (pathname === '/comidas' && NUMBER_OF_CLICKED_CATEGORIES === 0) {
      fetchFoods().then((data) => setFoods(data.meals));
    } else if (pathname === '/bebidas' && NUMBER_OF_CLICKED_CATEGORIES === 1) {
      fetchDrinkByCategoryName(categoryName).then((data) => setDrinks(data.drinks));
    } else if (pathname === '/bebidas' && NUMBER_OF_CLICKED_CATEGORIES === 0) {
      fetchCocktails().then((data) => setDrinks(data.drinks));
    } else {
      global.alert('Não é possível marcar mais de 1 categoria');
      ev.target.checked = false;
      NUMBER_OF_CLICKED_CATEGORIES -= 1;
      console.log('existem ', NUMBER_OF_CLICKED_CATEGORIES);
    }
  }

  return (
    <div className="category-button">
      {categories.map((categoryName, index) => (
        index < NUMBER_OF_CATEGORIES ? (
          <label htmlFor="category-button">
            {categoryName.strCategory}
            <input
              className="category-buttons"
              name="category-button"
              value={ categoryName.strCategory }
              type="checkbox"
              key={ index }
              data-testid={ `${categoryName.strCategory}-category-filter` }
              onClick={ (ev) => {
                handleFilterByCategoryName(ev, categoryName.strCategory);
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
