import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
// import { requestInitialDrinks } from '../redux/actions';
// import { useHistory } from 'react-router-dom';
// import fetchFoodCategories from '../helpers/fetchFoodCategories';
import fetchDrinkByCategory from '../helpers/fetchDrinkByCategory';
import fetchFoodByCategory from '../helpers/fetchFoodByCategory';

function FilterButtons({ props }) {
  const { drinksCategory } = useSelector((state) => state.searchReducer);
  const { mealsCategory } = useSelector((state) => state.searchReducer);
  // const history = useHistory();
  const tipe = (props === 'Drinks') ? drinksCategory : mealsCategory;
  const FIVE = 5;

  const HandleFilterByCategoryButton = (type, category) => {
    if (type === 'Drinks') {
      const fetchByCategory = async () => {
        const { drinks } = await fetchDrinkByCategory(category);
        // dispatch(requestInitialDrinks(drinks));
        console.log(drinks);
      };
      fetchByCategory();
    }
    if (type === 'Meals') {
      const fecthByCategory = async () => {
        const { meals } = await fetchFoodByCategory(category);
        // dispatch(requestInitialMeals(meals));
        console.log(meals);
      };
      fecthByCategory();
    }
  };

  return (
    <div>
      {
        tipe && (
          tipe.map((e, index) => index < FIVE && (
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
