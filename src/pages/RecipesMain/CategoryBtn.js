import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { AppContext } from '../../context/AppContext';
import { fetchByCategoryApi } from '../../services/fetchApiMain';

export default function CategoryBtn({ category: { strCategory } }) {
  const { context } = useContext(AppContext);
  const { setRecipesList, pageOrigin } = context;
  const NUM_RECIPES_SHOWN = 12;

  function handleClick() {
    fetchByCategoryApi(pageOrigin, strCategory)
      .then((recipes) => {
        recipes.splice(NUM_RECIPES_SHOWN, recipes.length - 1);
        setRecipesList(recipes);
      });
  }

  return (
    <div>
      <button
        type="button"
        data-testid={ `${strCategory}-category-filter` }
        onClick={ () => handleClick() }
      >
        { strCategory }
      </button>
    </div>
  );
}

CategoryBtn.propTypes = {
  strCategory: PropTypes.string,
}.isRequired;
