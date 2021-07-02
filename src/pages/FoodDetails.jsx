import React from 'react';
import { useParams } from 'react-router-dom';
import useRecipe from '../hooks/useRecipe';

export default function FoodDetails() {
  const { id } = useParams();
  const { recipe } = useRecipe();
  const { strMeal } = recipe.meals.find((foods) => foods.idMeal === id);

  return (
    <>
      <h1>FoodDetails</h1>
      <h2>{strMeal}</h2>
    </>
  );
}
