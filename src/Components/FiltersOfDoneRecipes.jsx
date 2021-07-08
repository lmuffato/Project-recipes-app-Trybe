import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { FoodContext } from '../Context/FoodProvider';

const FiltersOfDoneRecipes = ({ page }) => {
  const { setDoneRecipesFilter } = useContext(FoodContext);
  const { setFavoriteRecipesFilter } = useContext(FoodContext);

  const hundleClick = ({ target }) => {
    console.log(page);
    const array = JSON.parse(localStorage.getItem('doneRecipes'));
    const array2 = JSON.parse(localStorage.getItem('favoriteRecipes'));
    let list = [];
    if (page === 'favorite') {
      if (target.id === 'btn-food') {
        list = array2.filter((elem) => elem.type === 'comida');
        setFavoriteRecipesFilter(list);
      } else if (target.id === 'btn-drink') {
        list = array2.filter((elem) => elem.type === 'bebida');
        setFavoriteRecipesFilter(list);
      } else {
        setFavoriteRecipesFilter(array2);
      }
    }
    if (page === 'done') {
      if (target.id === 'btn-food') {
        list = array.filter((elem) => elem.type === 'comida');
        setDoneRecipesFilter(list);
      } else if (target.id === 'btn-drink') {
        list = array.filter((elem) => elem.type === 'bebida');
        setDoneRecipesFilter(list);
      } else {
        setDoneRecipesFilter(array);
      }
    }
  };

  return (
    <section>
      <button
        id="btn-all"
        data-testid="filter-by-all-btn"
        type="button"
        onClick={ hundleClick }
      >
        All
      </button>
      <button
        id="btn-food"
        data-testid="filter-by-food-btn"
        type="button"
        onClick={ hundleClick }
      >
        Food
      </button>
      <button
        id="btn-drink"
        data-testid="filter-by-drink-btn"
        type="button"
        onClick={ hundleClick }
      >
        Drinks
      </button>
    </section>
  );
};

FiltersOfDoneRecipes.propTypes = {
  page: PropTypes.string.isRequired,
}.isRequired;

export default FiltersOfDoneRecipes;
