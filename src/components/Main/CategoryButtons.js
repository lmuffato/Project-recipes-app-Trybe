import React, { useContext } from 'react';
import { useLocation } from 'react-router';
import PropTypes from 'prop-types';
import FoodContext from '../../contexts/FoodContext';
import DrinkContext from '../../contexts/DrinkContext';
import { fetchFoodByCategoryName, fetchFoods } from '../../services/mealAPI';
import { fetchDrinkByCategoryName, fetchCocktails } from '../../services/cocktailAPI';
import '../../style/CategoryButtons.css';

const NUMBER_OF_CATEGORIES = 5;

export default function CategoryButtons({ categories }) {
  const { setFoods } = useContext(FoodContext);
  const { setDrinks } = useContext(DrinkContext);
  const { pathname } = useLocation();
  const buttons = document.querySelectorAll('.category-buttons');
  const checked = false;
  const context = useContext(FoodContext);
  const { color: { colorDiv } } = context;
  const { color: { colorP } } = context;

  function resetAllCheckbox() {
    for (let index = 0; index < buttons.length; index += 1) {
      buttons[index].checked = false;
    }
  }

  function handleFilterByCategoryNameFOODS(ev, categoryName) {
    if (ev.target.checked) {
      fetchFoodByCategoryName(categoryName).then((data) => setFoods(data.meals));
      resetAllCheckbox();
      ev.target.checked = true;
    } else if (ev.target.checked === false) {
      fetchFoods().then((data) => setFoods(data.meals));
      resetAllCheckbox();
    } else if (ev.target.checked === !checked) {
      fetchFoods().then((data) => setFoods(data.meals));
      resetAllCheckbox();
      ev.target.checked = !checked;
    }
  }

  function handleFilterByCategoryNameDRINKS(ev, categoryName) {
    if (ev.target.checked) {
      fetchDrinkByCategoryName(categoryName).then((data) => setDrinks(data.drinks));
      resetAllCheckbox();
      ev.target.checked = true;
    } else if (ev.target.checked === false) {
      fetchCocktails().then((data) => setDrinks(data.drinks));
      resetAllCheckbox();
    } else if (ev.target.checked === !checked) {
      fetchCocktails().then((data) => setDrinks(data.drinks));
      resetAllCheckbox();
      ev.target.checked = !checked;
    }
  }

  function handleFilterAll(ev) {
    if (pathname === '/comidas' || pathname === '/comidas/') {
      fetchFoods().then((data) => setFoods(data.meals));
      resetAllCheckbox();
      ev.target.checked = !checked;
    }
    if (pathname === '/bebidas' || pathname === '/bebidas/') {
      fetchCocktails().then((data) => setDrinks(data.drinks));
      resetAllCheckbox();
      ev.target.checked = !checked;
    }
  }

  return (
    <div
      className="category-button"
      style={ {
        backgroundColor: colorDiv,
        display: 'flex',
        flexWrap: 'wrap',
        textAlign: 'center',
        alignItems: 'left' } }

    >
      {categories.map((categoryName, index) => (
        index < NUMBER_OF_CATEGORIES ? (
          <label
            htmlFor="category-button"
            key={ index }
            className="checkbox"
            style={ { color: colorP } }
          >
            <input
              className="category-buttons"
              name="category-buttons"
              value={ categoryName.strCategory }
              type="checkbox"
              key={ index }
              data-testid={ `${categoryName.strCategory}-category-filter` }
              onClick={ (ev) => {
                if (pathname === '/comidas' || pathname === '/comidas/') {
                  handleFilterByCategoryNameFOODS(ev, categoryName.strCategory);
                } else if (pathname === '/bebidas' || pathname === '/bebidas/') {
                  handleFilterByCategoryNameDRINKS(ev, categoryName.strCategory);
                }
              } }
            />
            {' '}

            {categoryName.strCategory}

          </label>
        ) : null
      ))}
      <label htmlFor="category-buttons" style={ { color: colorP } }>
        <input
          type="checkbox"
          name="category-buttons"
          className="category-buttons"
          data-testid="All-category-filter"
          onClick={ (ev) => handleFilterAll(ev) }
        />
        {' '}
        All
      </label>
    </div>
  );
}

CategoryButtons.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.shape({})),
}.isRequired;
