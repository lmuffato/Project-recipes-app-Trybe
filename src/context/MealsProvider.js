import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';
import MealsContext from './MealsContext';
import { ApiByRandom } from '../services/theMealAPI';

function MealsProvider({ children }) {
  const [mealsObject, setMeals] = useState({});

  const history = useHistory();
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
