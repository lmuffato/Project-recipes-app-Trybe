import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';
import CategoryButtons from '../components/Main/CategoryButtons';
import RecipeCard from '../components/Main/RecipeCard';
import Footer from '../components/Footer';
import FoodContext from '../contexts/FoodContext';

export default function Comidas() {
  const NUMBER_OF_RECIPES = 12;
  const { pathname } = useLocation();

  const { foods, categories } = useContext(FoodContext);

  return (
    <>
      <Header title="Comidas" />
      <CategoryButtons categories={ categories } />

      <ul>
        { foods && foods.slice(0, NUMBER_OF_RECIPES)
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
