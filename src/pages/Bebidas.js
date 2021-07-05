import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';
import { fetchCocktails, fetchCocktailCategories } from '../services/cocktailAPI';
import CategoryButtons from '../components/Main/CategoryButtons';
import RecipeCard from '../components/Main/RecipeCard';

export default function Bebidas() {
  const [drinks, setDrinks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const NUMBER_OF_RECIPES = 12;
  const { pathname } = useLocation();

  useEffect(() => {
    fetchCocktails().then((data) => {
      setDrinks(data.drinks);
    });
    fetchCocktailCategories().then((data) => {
      setCategories(data.drinks);
    });
    setIsLoaded(true);
  }, []);

  return (
    <>
      <Header title="Bebidas" />
      <CategoryButtons categories={ categories } />

      <ul>
        {isLoaded && drinks.slice(0, NUMBER_OF_RECIPES)
          .map((recipe, index) => (
            <RecipeCard
              key={ index }
              recipe={ recipe }
              index={ index }
              type={ pathname }
            />
          ))}
      </ul>
    </>
  );
}
