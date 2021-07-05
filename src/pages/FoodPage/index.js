import React, { useContext, useEffect, useState } from 'react';
import RecipeContext from '../../context/RecipeContext';
import { initialFoods, getCategoriesFoods } from '../../services/apiRequests';

import SearchBar from '../../components/SearchBar';
import RecipeCardFood from '../../components/RecipeCardFood';
import CategoriesButtons from '../../components/CategoriesButtons';

function FoodPage() {
  document.title = 'Comidas';
  const { recipes, setRecipes } = useContext(RecipeContext);
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    getCategoriesFoods(setCategories);
    initialFoods(setRecipes);
    setIsLoading(false);
  }, [setRecipes]);
  if (isLoading) {
    console.log('loading...');
    return <p>Loading...</p>;
  }
  const maxLength = 11;
  return (
    <section>
      <SearchBar />
      { categories && <CategoriesButtons categories={ categories } /> }
      <ul>
        { !isLoading && recipes
          .filter((_, index) => index <= maxLength)
          .map((meal, index) => (
            <RecipeCardFood
              key={ meal.idMeal }
              meal={ meal }
              index={ index }
            />
          ))}
      </ul>
    </section>
  );
}

export default FoodPage;
