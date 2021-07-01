import React, { useState } from 'react';
import PropTypes from 'prop-types';
import MealsContext from './MealsContext';

function MealsProvider(props) {
  const [mealsArray, setMeals] = useState([]);

  const context = {
    mealsArray,
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
