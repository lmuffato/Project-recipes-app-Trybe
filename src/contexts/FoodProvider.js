import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import FoodContext from './FoodContext';
import {
  fetchFoods,
  fetchFoodCategories,
} from '../services/mealAPI';

export default function FoodProvider({ children }) {
  const [foods, setFoods] = useState([]);
  const [categories, setCategories] = useState([]);
  const [color, setColor] = useState({
    colorDiv: 'white',
    colorP: 'black',
    colorH1: 'black',
    colorH2: 'black',
    colorH3: 'black',
    colorLi: 'black',
  });

  useEffect(() => {
    fetchFoods().then((data) => {
      setFoods(data.meals);
    });
    fetchFoodCategories().then((data) => {
      setCategories(data.meals);
    });
  }, []);

  return (
    <FoodContext.Provider
      value={ {
        foods,
        setFoods,
        categories,
        setCategories,
        color,
        setColor } }
    >
      {children}
    </FoodContext.Provider>
  );
}

FoodProvider.propTypes = {
  children: PropTypes.node,
}.isRequired;
