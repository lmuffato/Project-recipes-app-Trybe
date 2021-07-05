import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
// import { requestInitialDrinks } from '../redux/actions';
// import { useHistory } from 'react-router-dom';
import fetchFoodCategories from '../helpers/fetchFoodCategories';
import fetchDrinkCategories from '../helpers/fetchDrinkCategories';
import fetchDrinkByCategory from '../helpers/fetchDrinkByCategory';
import fetchFoodByCategory from '../helpers/fetchFoodByCategory';

function FilterButtons({ props }) {
  const [categoriesList, setCategoriesList] = useState([]);
  // const history = useHistory();
  const FIVE = 5;

  useEffect(() => {
    if (props === 'Drinks') {
      const fetchCategories = async () => {
        const { drinks } = await fetchDrinkCategories();
        setCategoriesList(drinks);
      };
      fetchCategories();
    }
    if (props === 'Food') {
      const fecthCategories = async () => {
        const { categories } = await fetchFoodCategories();
        setCategoriesList(categories);
      };
      fecthCategories();
    }
  }, [props]);

  const HandleFilterByCategoryButton = (type, category) => {
    if (type === 'Drinks') {
      const fetchByCategory = async () => {
        const { drinks } = await fetchDrinkByCategory(category);
        // dispatch(requestInitialDrinks(drinks));
        console.log(drinks);
      };
      fetchByCategory();
    }
    if (type === 'Food') {
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
        (categoriesList && categoriesList.length > 0 && (
          props === 'Food' ? categoriesList.map((e, index) => index < FIVE && (
            <button
              key={ e.idCategory }
              type="button"
              data-testid={ `${e.strCategory}-category-filter` }
              onClick={ () => HandleFilterByCategoryButton(props, e.strCategory) }
            >
              {e.strCategory}
            </button>
          )) : categoriesList.map((e, index) => index < FIVE && (
            <button
              key={ index }
              type="button"
              data-testid={ `${e.strCategory}-category-filter` }
              onClick={ () => HandleFilterByCategoryButton(props, e.strCategory) }
            >
              {e.strCategory}
            </button>
          ))))
      }
    </div>
  );
}

FilterButtons.propTypes = {
  props: PropTypes.string,
}.isRequired;

export default FilterButtons;
