import React, { useContext } from 'react';
import CategoryBtn from './CategoryBtn';
import { AppContext } from '../../context/AppContext';
import { fetchRecipesApi } from '../../services/fetchApiMain';

export default function Categories() {
  const { context } = useContext(AppContext);
  const { categoriesList, pageOrigin, setRecipesList } = context;
  const NUM_RECIPES_SHOWN = 12;

  function handleClickAll() {
    fetchRecipesApi(pageOrigin)
      .then((recipes) => {
        recipes.splice(NUM_RECIPES_SHOWN, recipes.length - 1);
        setRecipesList(recipes);
      });
  }

  return (
    <div className="categories">
      <button
        type="button"
        data-testid="All-category-filter"
        onClick={ () => handleClickAll() }
      >
        All
      </button>
      { categoriesList.map(
        (category, index) => (
          <CategoryBtn
            category={ category }
            key={ index }
            handleClickAll={ handleClickAll }
          />
        ),
      )}

    </div>
  );
}
