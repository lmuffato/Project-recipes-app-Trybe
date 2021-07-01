import React, { useContext } from 'react';
import MealsContext from '../context/MealsContext';

export default function FilterMealsByCategories() {
  const { mealsCategories } = useContext(MealsContext);

  const end = 5;
  const recipesArray = mealsCategories ? mealsCategories.slice(0, end) : [];

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
