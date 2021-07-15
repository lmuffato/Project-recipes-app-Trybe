import React, { useContext } from 'react';
import CocktailsContext from '../context/CocktailsContext';

export default function FilterCocktailsByCategories() {
  const { cocktailsCategories, setCurrCategory,
    setCocktailsByCategories } = useContext(CocktailsContext);
  const end = 5;
  const recipesArray = cocktailsCategories ? cocktailsCategories.slice(0, end) : [];

  return (
    <div className="categoriesButtonsDiv">
      <button
        className="categoriesButtons"
        value="All"
        type="button"
        data-testid="All-category-filter"
        onClick={ (e) => {
          setCocktailsByCategories(e.target.value);
          setCurrCategory(e.target.value);
        } }
      >
        All
      </button>
      {recipesArray.length > 1
      && recipesArray.map((category) => (
        <button
          className="categoriesButtons"
          type="button"
          key={ category.strCategory }
          value={ category.strCategory }
          onClick={ (e) => {
            setCocktailsByCategories(e.target.value);
            setCurrCategory(e.target.value);
          } }
          data-testid={ `${category.strCategory}-category-filter` }
        >
          {category.strCategory}
        </button>
      ))}
    </div>
  );
}
