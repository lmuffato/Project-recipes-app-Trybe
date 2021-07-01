import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import MealsContext from './MealsContext';
import { ApiByCategory, ApiFirstsResults } from '../services/theMealAPI';

function MealsProvider(props) {
  const [mealsObject, setMeals] = useState({});
  const [mealsCategories, setMealsCategories] = useState([]);

  // const setMealsByCategories = (category) => {

  // };

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
