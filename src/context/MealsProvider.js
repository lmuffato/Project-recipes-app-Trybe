import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import MealsContext from './MealsContext';
import { ApiByCategory,
  ApiFilterByCategory, ApiFirstsResults } from '../services/theMealAPI';

function MealsProvider(props) {
  const [mealsObject, setMeals] = useState({});
  const [mealsCopyObject, setMealsCopy] = useState({});
  const [mealsCategories, setMealsCategories] = useState([]);
  const [currCategory, setCurrCategory] = useState('');

  const setMealsByCategories = async (string) => {
    if (currCategory === string) return setMeals(mealsCopyObject);
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
