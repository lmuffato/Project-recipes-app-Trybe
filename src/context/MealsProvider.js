import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import MealsContext from './MealsContext';
import { ApiByCategory,
  ApiFilterByCategory, ApiFirstsResults, ApiRecipeDetail } from '../services/theMealAPI';

function MealsProvider(props) {
  const [mealsObject, setMeals] = useState({});
  const [mealsCopyObject, setMealsCopy] = useState({});
  const [mealsCategories, setMealsCategories] = useState([]);
  const [currCategory, setCurrCategory] = useState('');
  const [currMeal, setCurrMeal] = useState({});
  const history = useHistory();

  const getCurrMeal = async (id) => {
    const recipe = await ApiRecipeDetail(id);
    const { meals } = recipe;
    const [meal] = meals;
    setCurrMeal(meal);
    history.push(`/comidas/${id}`);
  };

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

  const context = {
    mealsObject,
    setMeals,
    mealsCategories,
    setCurrCategory,
    setMealsByCategories,
    currMeal,
    getCurrMeal,
  };

  const { children } = props;
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
