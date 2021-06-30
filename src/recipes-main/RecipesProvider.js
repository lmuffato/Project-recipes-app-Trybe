import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from './RecipesContext';
import { fetchApiDrinks, fetchApiFoods } from '../services/fetchApi';

function RecipeProvider({ children }) {
  const [foods, setFoods] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [loading, setLoagind] = useState(false);

  function getFoods() {
    const fetchApis = async () => {
      const dataFoods = await fetchApiFoods();
      const dataDrinks = await fetchApiDrinks();
      setFoods(dataFoods);
      setDrinks(dataDrinks);
    };
    fetchApis();
  }
  // ComponentDidMount
  useEffect(getFoods, []);
  const context = {
    loading,
    setLoagind,
    foods,
    drinks,
  };
  return (
    <RecipesContext.Provider value={ context }>
      {children}
    </RecipesContext.Provider>
  );
}

RecipeProvider.propTypes = {
  children: PropTypes.element,
}.isRequired;
export default RecipeProvider;
