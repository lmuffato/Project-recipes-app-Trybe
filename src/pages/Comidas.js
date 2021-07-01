import React, { useEffect, useState } from 'react';

export default function Comidas() {
  const [foods, setComidas] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const NUMBER_OF_RECIPES = 12;
  const NUMBER_OF_CATEGORIES = 5;
  const FOOD_API_URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  const CATEGORIES_API_URL = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
  const DRINKS_API_URL = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';

  async function fetchFoods() {
    const fetchURL = await fetch(FOOD_API_URL);
    const response = await fetchURL.json();
    const { meals } = await response;
    setIsLoaded(true);
    setComidas(meals);
  }

  async function fetchCategories() {
    const fetchURL = await fetch(CATEGORIES_API_URL);
    const response = await fetchURL.json();
    const { meals } = await response;

    setCategories(meals);
  }

  async function fetchDrinks() {
    const fetchURL = await fetch(DRINKS_API_URL);
    const response = await fetchURL.json();
    const { drinks: drinksFromApi } = await response;
    setDrinks(drinksFromApi);
  }

  useEffect(() => {
    fetchFoods();
    fetchCategories();
    fetchDrinks();
  }, []);

  return (
    <>
      <h1>Comidas</h1>
      {categories.map((categoryName, index) => (
        index < NUMBER_OF_CATEGORIES ? (
          <button
            type="submit"
            key={ index }
            data-testid={ `${categoryName.strCategory}-category-filter` }
          >
            {categoryName.strCategory}
          </button>) : ''
      ))}

      <ul>
        {isLoaded && foods.map((food, index) => (
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
      <h1>Bebidas</h1>
      {drinks.map((drinkName, index) => (
        index < NUMBER_OF_CATEGORIES ? (
          <button
            type="submit"
            key={ index }
            data-testid={ `${drinkName.strCategory}-category-filter` }
          >
            {drinkName.strCategory}
          </button>) : ''
      ))}
    </>
  );
}
