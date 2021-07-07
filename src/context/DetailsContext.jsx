import React, { useState, createContext, useCallback } from 'react';
import PropTypes from 'prop-types';

export const DetailsContext = createContext({});
const MAX_LENGTH = 6;

function DetailsContextProvider({ children }) {
  const [recipeData, setRecipe] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [currentImage, setCurrentImage] = useState(0);
  const [recommendations, setRecomendations] = useState([]);

  const handleFetch = useCallback(async (url, tipo) => {
    try {
      const request = await fetch(url);
      const data = await request.json();
      setRecipe(data[tipo][0]);
      console.log(data[tipo][0]);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  }, []);

  const fetchMealRecipes = useCallback(async (endpoint, typeOfPage) => {
    const currRecomendation = typeOfPage === 'meals' ? 'drinks' : 'meals';
    try {
      const response = await fetch(endpoint);
      const data = await response.json();
      const formattingData = {
        ...data,
        [currRecomendation]: data[currRecomendation].slice(0, MAX_LENGTH),
      };
      if (formattingData[currRecomendation] !== null) {
        setRecomendations(formattingData[currRecomendation]);
        setCurrentImage(0);
      }
      console.log(formattingData[currRecomendation]);
    } catch (err) {
      console.log(err);
    }
  }, []);

  const contextValue = {
    handleFetch,
    isLoading,
    recipeData,
    currentImage,
    recommendations,
    fetchMealRecipes,
  };

  return (
    <DetailsContext.Provider value={ contextValue }>
      { children }
    </DetailsContext.Provider>
  );
}

export default DetailsContextProvider;

DetailsContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
