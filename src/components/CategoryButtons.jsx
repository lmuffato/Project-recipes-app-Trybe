import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import fetchFoodCategories from '../helpers/fetchFoodCategories';
import fetchDrinkCategories from '../helpers/fetchDrinkCategories';

function FilterButtons({ props }) {
  const [categoriesList, setCategoriesList] = useState([]);
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

  return (
    <div>
      {
        props === 'Food' ? categoriesList.map((e, index) => index < FIVE && (
          <button
            key={ e.idCategory }
            type="button"
            data-testid={ `${e.strCategory}-category-filter` }
          >
            {e.strCategory}
          </button>
        )) : categoriesList.map((e, index) => index < FIVE && (
          <button
            key={ index }
            type="button"
            data-testid={ `${e.strCategory}-category-filter` }
          >
            {e.strCategory}
          </button>
        ))
      }
    </div>
  );
}

FilterButtons.propTypes = {
  props: PropTypes.string,
}.isRequired;

export default FilterButtons;
