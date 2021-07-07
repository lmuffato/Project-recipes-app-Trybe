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
  let NUMBER_OF_CLICKED_CATEGORIES = 0;
  const buttons = document.querySelectorAll('.category-buttons');

  function countChecks() {
    for (let index = 0; index < buttons.length; index += 1) {
      if (buttons[index].checked) {
        NUMBER_OF_CLICKED_CATEGORIES += 1;
        console.log('existem ', NUMBER_OF_CLICKED_CATEGORIES);
      }
    }
    return NUMBER_OF_CLICKED_CATEGORIES;
  }

  function handleFilterByCategoryName(ev, categoryName) {
    countChecks();

    switch (NUMBER_OF_CLICKED_CATEGORIES) {
    case 0:
      if (pathname === '/comidas') {
        fetchFoods().then((data) => setFoods(data.meals));
      }
      if (pathname === '/bebidas') {
        fetchCocktails().then((data) => setDrinks(data.drinks));
      }
      break;
    case 1:
      if (pathname === '/comidas') {
        fetchFoodByCategoryName(categoryName).then((data) => setFoods(data.meals));
        console.log('(NUMBER_OF_CLICKED_CATEGORIES === 1 / comidas ');
      }
      if (pathname === '/bebidas') {
        fetchDrinkByCategoryName(categoryName).then((data) => setDrinks(data.drinks));
      }
      break;
    case 2:
      if (pathname === '/comidas') {
        fetchFoodByCategoryName(categoryName).then((data) => setFoods(data.meals));
        for (let index = 0; index < buttons.length; index += 1) {
          buttons[index].checked = false;
          ev.target.checked = true;
        }
      }
      if (pathname === '/bebidas') {
        fetchDrinkByCategoryName(categoryName).then((data) => setDrinks(data.drinks));
        for (let index = 0; index < buttons.length; index += 1) {
          buttons[index].checked = false;
          ev.target.checked = true;
        }
      }
      break;
    default: global.alert('Ocorreu um erro');
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
