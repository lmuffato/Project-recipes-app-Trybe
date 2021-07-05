import React, { useContext, useEffect, useState } from 'react';
import RecipeContext from '../../context/RecipeContext';
import { initialFoods } from '../../services/apiRequests';

import SearchBar from '../../components/SearchBar';
import RecipeCardFood from '../../components/RecipeCardFood';

function FoodPage() {
  document.title = 'Comidas';
  const { recipes, setRecipes } = useContext(RecipeContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
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
      { console.log(recipes) }
      <SearchBar />
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
