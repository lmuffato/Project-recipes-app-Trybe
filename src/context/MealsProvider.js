import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import MealsContext from './MealsContext';
import { ApiFirstsResults } from '../services/theMealAPI';

function MealsProvider(props) {
  const [mealsObject, setMeals] = useState({});

  useEffect(() => {
    const load = async () => {
      const result = await ApiFirstsResults();
      setMeals(result);
    };

    load();
  }, []);

  const context = {
    mealsObject,
    setMeals,
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
