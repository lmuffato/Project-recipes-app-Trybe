import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeCategory } from '../redux/actions/drinksAction';

function DrinksCategoryButtons() {
  const dispatch = useDispatch();
  const drinkCategories = useSelector((state) => state.drinks.categories);
  const selectedCategory = useSelector((state) => state.drinks.selectedCategory);

  const categories = [{ strCategory: 'All' }, ...drinkCategories];
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

export default DrinksCategoryButtons;
