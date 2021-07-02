import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { AppContext } from '../../context/AppContext';
import { fetchByCategoryApi } from '../../services/fetchApiMain';

export default function CategoryBtn({ category: { strCategory }, handleClickAll }) {
  const { context } = useContext(AppContext);
  const { setRecipesList, pageOrigin } = context;
  const [toggle, setToggle] = useState(false);
  const NUM_RECIPES_SHOWN = 12;

  function handleClick() {
    if (!toggle) {
      fetchByCategoryApi(pageOrigin, strCategory)
        .then((recipes) => {
          recipes.splice(NUM_RECIPES_SHOWN, recipes.length - 1);
          setRecipesList(recipes);
        });
      setToggle(!toggle);
    } else {
      handleClickAll();
    }
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
  handleClickAll: PropTypes.func,
}.isRequired;
