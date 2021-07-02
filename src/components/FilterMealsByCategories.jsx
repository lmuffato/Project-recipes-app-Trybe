import React, { useContext } from 'react';
import MealsContext from '../context/MealsContext';

export default function FilterMealsByCategories() {
  const { mealsCategories, setCurrCategory,
    setMealsByCategories } = useContext(MealsContext);

  const end = 5;
  const recipesArray = mealsCategories ? mealsCategories.slice(0, end) : [];

  return (
    <div>
      <button
        value="All"
        type="button"
        data-testid="All-category-filter"
        onClick={ (e) => {
          setMealsByCategories(e.target.value);
          setCurrCategory(e.target.value);
        } }
      >
        All
      </button>
      {recipesArray.length > 1
      && recipesArray.map((category) => (
        <button
          type="button"
          key={ category.strCategory }
          value={ category.strCategory }
          onClick={ (e) => {
            setMealsByCategories(e.target.value);
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
