import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeCategory } from '../redux/actions/mealsAction';

function MealsCategoryButtons() {
  const dispatch = useDispatch();
  const mealCategories = useSelector((state) => state.meals.categories);

  const categories = [{ strCategory: 'All' }, ...mealCategories];

  return (
    <div>
      {categories.map(({ strCategory }) => (
        <button
          data-testid={ `${strCategory}-category-filter` }
          type="button"
          onClick={ () => dispatch(changeCategory(strCategory)) }
          key={ strCategory }
        >
          {strCategory}
        </button>
      ))}
    </div>
  );
}

export default MealsCategoryButtons;
