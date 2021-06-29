import React from 'react';
import { FoodContext } from '../Context/FoodProvider';

function FoodList() {
  const { foods } = React.useContext(FoodContext);
  return (
    <h1>{ foods }</h1>
  );
}

export default FoodList;
