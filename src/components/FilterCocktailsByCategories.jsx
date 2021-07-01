import React, { useContext } from 'react';
import CocktailsContext from '../context/CocktailsContext';

export default function FilterCocktailsByCategories() {
  const { cocktailsCategories, setCurrCategory } = useContext(CocktailsContext);
  const end = 5;
  const recipesArray = cocktailsCategories ? cocktailsCategories.slice(0, end) : [];

  return (
    <div>
      {recipesArray.length > 1
      && recipesArray.map((category) => (
        <button
          type="button"
          key={ category.strCategory }
          value={ category.strCategory }
          onClick={ (e) => setCurrCategory(e.target.value) }
          data-testid={ `${category.strCategory}-category-filter` }
        >
          {category.strCategory}
        </button>
      ))}
    </div>
  );
}
