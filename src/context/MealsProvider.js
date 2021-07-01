import React, { useState } from 'react';
import PropTypes from 'prop-types';
import MealsContext from './MealsContext';

function MealsProvider(props) {
  const [mealsObject, setMeals] = useState({});

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
