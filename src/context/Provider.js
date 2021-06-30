import React, { useEffect, useState } from 'react';
import { node } from 'prop-types';
import Context from './Context';
import { fetchApiDrinks, fetchApiFoods } from '../services/fetchApi';

function Provider({ children }) {
  // useStates...
  const [logout, setLogout] = useState(false);
  const [foods, setFoods] = useState([]);
  const [drinks, setDrinks] = useState([]);
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

  const dataValue = {
    logout,
    setLogout,
    foods,
    drinks,
  };

  return (
    <Context.Provider value={ dataValue }>
      { children}
    </Context.Provider>
  );
}

Provider.propTypes = {
  children: node,
}.isRequired;

export default Provider;
