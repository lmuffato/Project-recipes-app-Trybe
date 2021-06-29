import React from 'react';
import PropTypes from 'prop-types';
import RecipesContext from '../context/RecipesContext';

export default function RecipesProvider({ children }) {
  const handleApi = async ({ textInput, radioInput, place }) => {
    if (radioInput === ingredient) {
      const fetched = await fetch(`https://www.the${place}db.com/api/json/v1/1/filter.php?i=${textInput}`);
      const json = await fetched.json();
      console.log(json);
    } else if (radioInput === 'name') {
      const fetched = await fetch(`https://www.the${place}db.com/api/json/v1/1/search.php?s=${textInput}`);
      const json = await fetched.json();
      console.log(json);
    } else {
      const fetched = await fetch(`https://www.the${place}db.com/api/json/v1/1/search.php?f=${textInput}`);
      const json = await fetched.json();
      console.log(json);
    }
  };

  const context = {
    handleApi,
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
