import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';

import { fetchFoods, fetchFoodCategories } from '../services/mealAPI';
import { fetchCocktails, fetchCocktailCategories } from '../services/cocktailAPI';

import CategoryButtons from '../components/Main/CategoryButtons';
import RecipeCard from '../components/Main/RecipeCard';

export default function Main() {
  const { pathname } = useLocation();
  const pageType = pathname[1].toUpperCase() + pathname.slice(2);

  const [recipes, setRecipes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const NUMBER_OF_RECIPES = 12;

  useEffect(() => {
    if (pageType === 'Comidas') {
      fetchFoods().then((data) => {
        setRecipes(data.meals);
      });
      fetchFoodCategories().then((data) => {
        setCategories(data.meals);
      });
    }
    if (pageType === 'Bebidas') {
      fetchCocktails().then((data) => {
        setRecipes(data.drinks);
      });
      fetchCocktailCategories().then((data) => {
        setCategories(data.drinks);
      });
    }
    setIsLoaded(true);
  }, [pageType]);

  return (
    <>
      <Header title={ pageType } />
      <CategoryButtons categories={ categories } />

      <ul>
        {isLoaded && recipes.slice(0, NUMBER_OF_RECIPES)
          .map((recipe, index) => (
            <RecipeCard
              key={ index }
              recipe={ recipe }
              index={ index }
              type={ pageType }
            />
          ))}
      </ul>
    </>
  );
}
