import React, { useState, useEffect, createContext } from 'react';
import { node } from 'prop-types';

const FoodContext = createContext();

function FoodProvider({ children }) {
  const [foods, setFoods] = useState([]);
  const [radioSelected, setRadioSelected] = useState('');
  const [searchText, setSearchText] = useState('');
  const [currentPage, setCurrentPage] = useState('');
  const contextValue = {
    foods,
    setFoods,
    searchText,
    setSearchText,
    radioSelected,
    setRadioSelected,
    currentPage,
    setCurrentPage,
  };

  useEffect(() => {
    let endpoint = '';
    const getFoods = async () => {
      if (radioSelected === 'Ingrediente') {
        endpoint = `https://www.${currentPage}.com/api/json/v1/1/filter.php?i=${searchText}`;
      } else if (radioSelected === 'Nome') {
        endpoint = `https://www.${currentPage}.com/api/json/v1/1/search.php?s=${searchText}`;
      } else if (radioSelected === 'Primeira letra') {
        endpoint = `https://www.${currentPage}.com/api/json/v1/1/search.php?f=${searchText}`;
      }
      const response = await fetch(endpoint);
      const responseJson = await response.json();
      setFoods(responseJson);
    };
    getFoods();
    console.log(foods);
  }, [radioSelected, currentPage, searchText, currentPage]);

  return (
    <FoodContext.Provider value={ contextValue }>
      {children}
    </FoodContext.Provider>
  );
}

FoodProvider.propTypes = {
  children: node,
}.isRequired;

export { FoodProvider, FoodContext };
