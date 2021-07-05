import React, { useContext, useEffect, useState } from 'react';
import RecipeContext from '../../context/RecipeContext';
import {
  initialFoods, getCategoriesFoods, foodsByCategory } from '../../services/apiRequests';

import SearchBar from '../../components/SearchBar';
import RecipeCardFood from '../../components/RecipeCardFood';
import CategoriesButtons from '../../components/CategoriesButtons';

function FoodPage() {
  document.title = 'Comidas';
  const { recipes, setRecipes } = useContext(RecipeContext);
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [choosedCategory, toggleCategory] = useState('');

  useEffect(() => {
    setIsLoading(true);
    getCategoriesFoods(setCategories);
    initialFoods(setRecipes);
    setIsLoading(false);
  }, [setRecipes]);
  useEffect(() => {
    if (choosedCategory) {
      setIsLoading(true);
      foodsByCategory(setRecipes, choosedCategory);
    }
    setIsLoading(false);
  }, [choosedCategory, setRecipes]);
  if (isLoading) {
    console.log('loading...');
    return <p>Loading...</p>;
  }
  const maxLength = 11;
  return (
    <section>
      <SearchBar />
      { categories
        && <CategoriesButtons
          categories={ categories }
          toggleCategory={ toggleCategory }
        /> }
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
