import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeCategory } from '../redux/actions/mealsAction';

function MealsCategoryButtons() {
  const dispatch = useDispatch();
  const mealCategories = useSelector((state) => state.meals.categories);
  const selectedCategory = useSelector((state) => state.meals.selectedCategory);

  const categories = [{ strCategory: 'All' }, ...mealCategories];
  function setCategory(category) {
    if (selectedCategory === category) {
      dispatch(changeCategory('All'));
      return;
    }
    dispatch(changeCategory(category));
  }

  return (
    <div className="category-buttons">
      {categories.map(({ strCategory }) => (
        <button
          data-testid={ `${strCategory}-category-filter` }
          type="button"
          onClick={ () => setCategory(strCategory) }
          key={ strCategory }
        >
          {strCategory}
        </button>
      ))}
    </div>
  );
}

export default MealsCategoryButtons;
