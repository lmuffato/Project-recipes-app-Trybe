import React from 'react';
import { FoodContext } from '../Context/FoodProvider';

const useRenderList = async (page) => {
  const { setFoods, setIdentifier, category } = React.useContext(FoodContext);
  if (!category) {
    const endpoint = `https://www.${page}.com/api/json/v1/1/search.php?s=`;
    const response = await fetch(endpoint);
    const responseJson = await response.json();
    if (page === 'thecocktaildb') {
      setIdentifier('Drink');
      setFoods(responseJson.drinks);
    } else {
      setIdentifier('Meal');
      setFoods(responseJson.meals);
    }
  }
};

export default useRenderList;
