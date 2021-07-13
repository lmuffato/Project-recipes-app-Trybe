import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { setInitialMeals, requestInitialDrinks } from '../redux/actions';
import fetchDrinkByCategory from '../helpers/fetchDrinkByCategory';
import fetchFoodByCategory from '../helpers/fetchFoodByCategory';
import fetchInitialMeals from '../helpers/fetchInicialMeals';
import fetchDrinks from '../helpers/fetchInitialDrinks';

function FilterButtons({ props }) {
  const dispatch = useDispatch();
  const { drinksCategory } = useSelector((state) => state.searchReducer);
  const { mealsCategory } = useSelector((state) => state.searchReducer);
  const list = (props === 'Drinks') ? drinksCategory : mealsCategory;
  const FIVE = 5;
  const [selectedCategory, setSelectedCategory] = useState('');

  const HandleFilterByCategoryButton = (type, category) => {
    if (selectedCategory === category || category === 'all') {
      setSelectedCategory('');
      if (type === 'Drinks') {
        const fetchInitialDrinks = async () => {
          const { drinks } = await fetchDrinks();
          dispatch(requestInitialDrinks(drinks));
        };
        return fetchInitialDrinks();
      }
      const fetchMeals = async () => {
        const { meals } = await fetchInitialMeals();
        dispatch(setInitialMeals(meals));
      };
      return fetchMeals();
    }
    if (type === 'Drinks') {
      const fetchByCategory = async () => {
        const { drinks } = await fetchDrinkByCategory(category);
        dispatch(requestInitialDrinks(drinks));
      };
      fetchByCategory();
    }
    if (type === 'Meals') {
      const fecthByCategory = async () => {
        const { meals } = await fetchFoodByCategory(category);
        const showDetails = meals.length !== 1;
        dispatch(setInitialMeals(meals, showDetails));
      };
      fecthByCategory();
    }
    setSelectedCategory(category);
  };

  return (
    <div className="div-category-btn">
      {
        list && (
          list.map((e, index) => index < FIVE && (
            <button
              className="filter-btn"
              key={ index }
              type="button"
              data-testid={ `${e.strCategory}-category-filter` }
              onClick={ () => HandleFilterByCategoryButton(props, e.strCategory) }
            >
              {e.strCategory}
            </button>
          ))
        )
      }
      <button
        className="filter-btn"
        type="button"
        onClick={ () => HandleFilterByCategoryButton(props, 'all') }
        data-testid="All-category-filter"
      >
        All
      </button>
    </div>
  );
}

FilterButtons.propTypes = {
  props: PropTypes.string,
}.isRequired;

export default FilterButtons;
