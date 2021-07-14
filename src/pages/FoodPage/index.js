import React, { useContext, useEffect, useState } from 'react';
import RecipeContext from '../../context/RecipeContext';
import {
  initialFoods, getCategoriesFoods, foodsByCategory } from '../../services/apiRequests';

import Header from '../../components/Header';
import FooterMenu from '../../components/footerMenu';
import RecipeCardFood from '../../components/RecipeCardFood';
import CategoriesButtons from '../../components/CategoriesButtons';

function FoodPage() {
  document.title = 'Comidas';
  const { recipes, setRecipes, redirect } = useContext(RecipeContext);
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [choosedCategory, toggleCategory] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    getCategoriesFoods(setCategories);
    if (redirect !== 'from-explore') {
      initialFoods(setRecipes);
    }
    setIsLoading(false);
  }, [redirect, setRecipes]);
  useEffect(() => {
    if (choosedCategory) {
      setIsLoading(true);
      foodsByCategory(setRecipes, choosedCategory);
    } else if (choosedCategory === '') {
      setIsLoading(true);
      initialFoods(setRecipes);
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
      <Header searchBar="true" type="food" />
      { categories
        && <CategoriesButtons
          categories={ categories }
          toggleCategory={ toggleCategory }
        /> }
      { !isLoading && recipes
        .filter((_, index) => index <= maxLength)
        .map((meal, index) => (
          <RecipeCardFood
            key={ meal.idMeal }
            meal={ meal }
            index={ index }
          />
        ))}
      <FooterMenu />
      { redirect }
    </section>
  );
}

export default FoodPage;
