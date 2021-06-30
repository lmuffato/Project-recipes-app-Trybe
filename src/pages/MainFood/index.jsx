import React, { useEffect, useState } from 'react';
import getMeals from '../../services/MealApi';
import MealCard from './components/MealCard';

function MainFood() {
  const [meals, setMeals] = useState([]);

  async function getAllMeals() {
    const mealsArrayLimit = 12;
    const res = await getMeals();
    setMeals(res.meals.slice(0, mealsArrayLimit));
  }

  useEffect(() => {
    getAllMeals();
  }, []);

  return (
    <>
      <h1>Comidas</h1>
      <MealCard meals={ meals } />
    </>
  );
}

export default MainFood;
