import React, { useState } from 'react';
import PropTypes from 'prop-types';
import MealsContext from './MealsContext';

function MealsProvider(props) {
  const [meals, setMeals] = useState([]);
  const context = {
    meals,
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
