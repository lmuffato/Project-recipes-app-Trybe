import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { setInitialMeals, requestInitialDrinks } from '../redux/actions';
import fetchDrinkByCategory from '../helpers/fetchDrinkByCategory';
import fetchFoodByCategory from '../helpers/fetchFoodByCategory';

function FilterButtons({ props }) {
  const dispatch = useDispatch();
  const { drinksCategory } = useSelector((state) => state.searchReducer);
  const { mealsCategory } = useSelector((state) => state.searchReducer);
  const list = (props === 'Drinks') ? drinksCategory : mealsCategory;
  const FIVE = 5;

  const HandleFilterByCategoryButton = (type, category) => {
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
        console.log(showDetails);
        dispatch(setInitialMeals(meals, showDetails));
      };
      fecthByCategory();
    }
  };

  return (
    <div>
      {
        list && (
          list.map((e, index) => index < FIVE && (
            <button
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
    </div>
  );
}

FilterButtons.propTypes = {
  props: PropTypes.string,
}.isRequired;

export default FilterButtons;
