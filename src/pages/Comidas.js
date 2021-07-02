import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';

import { fetchFoods, fetchFoodCategories } from '../services/mealAPI';
import { fetchCocktails, fetchCocktailCategories } from '../services/cocktailAPI';

import CategoryButtons from '../components/Main/CategoryButtons';

export default function Comidas() {
  const { pathname } = useLocation();

  const [recipes, setRecipes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const NUMBER_OF_RECIPES = 12;

  useEffect(() => {
    if (pathname === '/comidas') {
      fetchFoods().then((data) => {
        setRecipes(data.meals);
      });
      fetchFoodCategories().then((data) => {
        setCategories(data.meals);
      });
    }
    if (pathname === '/bebidas') {
      fetchCocktails().then((data) => {
        setRecipes(data.meals);
      });
      fetchCocktailCategories().then((data) => {
        setCategories(data.meals);
      });
    }
    setIsLoaded(true);
  }, [pathname]);

  return (
    <>
      <Header title="Comidas" />
      <CategoryButtons categories={ categories } />

      <ul>
        {isLoaded && recipes.map((food, index) => (
          index < NUMBER_OF_RECIPES ? (
            <div data-testid={ `${index}-recipe-card` }>
              <li key={ index }>
                <img
                  data-testid={ `${index}-card-img` }
                  src={ food.strMealThumb }
                  alt="thumbnail food"
                  width="100"
                />
                <p data-testid={ `${index}-card-name` }>
                  {food.strMeal}
                </p>
              </li>
            </div>) : ''))}
      </ul>
    </>
  );
}
