import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import MealsContext from './MealsContext';
import { ApiByCategory,
  ApiFilterByCategory, ApiFirstsResults } from '../services/theMealAPI';

function MealsProvider(props) {
  const [mealsObject, setMeals] = useState({});
  const [mealsCategories, setMealsCategories] = useState([]);
  const [currCategory, setCurrCategory] = useState('');

  useEffect(() => {
    const setMealsByCategories = async () => {
      const results = await ApiFilterByCategory(currCategory);
      setMeals(results);
    };
    setMealsByCategories();
  }, [currCategory]);

  useEffect(() => {
    const load = async () => {
      const result = await ApiFirstsResults();
      const categoriesMealsResults = await ApiByCategory();
      const { meals } = categoriesMealsResults;
      setMeals(result);
      setMealsCategories(meals);
    };

    load();
  }, []);

  const context = {
    mealsObject,
    setMeals,
    mealsCategories,
    setCurrCategory,
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
