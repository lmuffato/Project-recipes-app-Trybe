import React, { useContext } from 'react';
import CocktailsContext from '../context/CocktailsContext';

export default function FilterCocktailsByCategories() {
  const { cocktailsCategories } = useContext(CocktailsContext);

  const end = 5;
  const recipesArray = cocktailsCategories ? cocktailsCategories.slice(0, end) : [];

  return (
    <div>
      {recipesArray.length > 1
      && recipesArray.map((category) => (
        <button
          type="button"
          key={ category.strCategory }
          data-testid={ `${category.strCategory}-category-filter` }
        >
          {category.strCategory}
        </button>
      ))}
    </div>
  );
}
