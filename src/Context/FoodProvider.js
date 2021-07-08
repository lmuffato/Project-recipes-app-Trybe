import React, { useState, useEffect, createContext } from 'react';
import { node } from 'prop-types';

const FoodContext = createContext();

function FoodProvider({ children }) {
  const [foods, setFoods] = useState([]);
  const [radioSelected, setRadioSelected] = useState('');
  const [searchText, setSearchText] = useState('');
  const [currentPage, setCurrentPage] = useState('');
  const [identifier, setIdentifier] = useState('');
  const [category, setCategory] = useState(false);
  const [checksDone, setChecksDone] = useState(0);
  const [currentProduct, setCurrentProduct] = useState([]);
  const [doneRecipesFilter, setDoneRecipesFilter] = useState(null);
  const [favoriteRecipesFilter, setFavoriteRecipesFilter] = useState(null);
  const contextValue = {
    foods,
    setFoods,
    searchText,
    setSearchText,
    radioSelected,
    setRadioSelected,
    currentPage,
    setCurrentPage,
    identifier,
    setIdentifier,
    category,
    setCategory,
    currentProduct,
    setCurrentProduct,
    checksDone,
    setChecksDone,
    doneRecipesFilter,
    setDoneRecipesFilter,
    favoriteRecipesFilter,
    setFavoriteRecipesFilter,
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
      if (currentPage === 'themealdb') {
        if (responseJson.meals === null) {
          alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
        } else {
          setIdentifier('Meal');
          setFoods(responseJson.meals);
        }
      } else if (currentPage === 'thecocktaildb') {
        if (responseJson.drinks === null) {
          alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
        } else {
          setIdentifier('Drink');
          setFoods(responseJson.drinks);
        }
      }
    };
    getFoods();
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
