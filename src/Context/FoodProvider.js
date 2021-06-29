import React, { useState } from 'react';
import { node } from 'prop-types';
import LoginContext from './LoginContext';

function FoodProvider({ children }) {
  const [foods, setFoods] = useState([]);
  const contextValue = {
    foods,
    setFoods,
  };

  return (
    <FoodContext.Provider value={ contextValue }>
      {children}
    </FoodContext.Provider>
  );
}

FoodProvider.propTypes = {
  children: node,
}.isRequired;

export default FoodProvider;
