import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';
import { fetchFoods, fetchFoodCategories } from '../services/mealAPI';
import CategoryButtons from '../components/Main/CategoryButtons';
import RecipeCard from '../components/Main/RecipeCard';
import Footer from '../components/Footer';

export default function Comidas() {
  const [foods, setFoods] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const NUMBER_OF_RECIPES = 12;
  const { pathname } = useLocation();

  useEffect(() => {
    fetchFoods().then((data) => {
      setFoods(data.meals);
    });
    fetchFoodCategories().then((data) => {
      setCategories(data.meals);
    });
    setIsLoaded(true);
  }, []);

  return (
    <>
      <Header title="Comidas" />
      <CategoryButtons categories={ categories } />

      <ul>
        {isLoaded && foods.slice(0, NUMBER_OF_RECIPES)
          .map((recipe, index) => (
            <RecipeCard
              key={ index }
              recipe={ recipe }
              index={ index }
              type={ pathname }
            />
          ))}
      </ul>
      <Footer />
    </>
  );
}
