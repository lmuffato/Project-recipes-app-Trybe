import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import MealsContext from './MealsContext';
import { ApiByCategory, ApiByRandom,
  ApiFilterByCategory, ApiFirstsResults, ApiRecipeDetail } from '../services/theMealAPI';

function MealsProvider({ children }) {
  const [mealsObject, setMeals] = useState({});
  const [mealsCopyObject, setMealsCopy] = useState({});
  const [mealsCategories, setMealsCategories] = useState([]);
  const [currCategory, setCurrCategory] = useState('');
  const [currCategoryId, setCurrCategoryId] = useState('');
  const [currMeal, setCurrMeal] = useState({});
  const history = useHistory();

  useEffect(() => {
    if (!currCategoryId) return;
    const getCurrMeal = async () => {
      const recipe = await ApiRecipeDetail(currCategoryId);
      const { meals } = recipe;
      const [meal] = meals;
      setCurrMeal(meal);
    };
    getCurrMeal();
    history.push(`comidas/${currCategoryId}`);
  }, [currCategoryId]);

  const setMealsByCategories = async (string) => {
    if (currCategory === string || string === 'All') return setMeals(mealsCopyObject);
    const results = await ApiFilterByCategory(string);
    setMeals(results);
  };

  useEffect(() => {
    const load = async () => {
      const result = await ApiFirstsResults();
      const categoriesMealsResults = await ApiByCategory();
      const { meals } = categoriesMealsResults;
      setMeals(result);
      setMealsCopy(result);
      setMealsCategories(meals);
    };

    load();
  }, []);

  const handleRandomMealDetails = async () => {
    const result = await ApiByRandom();
    const { meals } = result;
    const [meal] = meals;
    const { idMeal } = meal;
    history.push(`/comidas/${idMeal}`);
  };

  const context = {
    mealsObject,
    setMeals,
    mealsCategories,
    setCurrCategory,
    setMealsByCategories,
    currMeal,
    setCurrCategoryId,
    handleRandomMealDetails,
  };

  return (
    <MealsContext.Provider value={ context }>
      {children}
    </MealsContext.Provider>
  );
}

MealsProvider.propTypes = {
  children: PropTypes.node,
}.isRequired;

export default MealsProvider;
