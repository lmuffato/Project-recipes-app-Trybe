import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from '../context/RecipesContext';

export default function RecipesProvider({ children }) {
  const [results, setResults] = useState([]);

  const handleApi = async ({ textInput, radioInput, place }) => {
    if (radioInput === 'ingredient') {
      const fetched = await fetch(`https://www.the${place}db.com/api/json/v1/1/filter.php?i=${textInput}`);
      const json = await fetched.json();
      setResults(Object.values(json)[0]);
    } else if (radioInput === 'name') {
      const fetched = await fetch(`https://www.the${place}db.com/api/json/v1/1/search.php?s=${textInput}`);
      const json = await fetched.json();
      setResults(Object.values(json)[0]);
    } else {
      const fetched = await fetch(`https://www.the${place}db.com/api/json/v1/1/search.php?f=${textInput}`);
      const json = await fetched.json();
      setResults(Object.values(json)[0]);
    }
  };

  const context = {
    handleApi,
    results,
  };

  return (
    <RecipesContext.Provider value={ context }>
      { children }
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
