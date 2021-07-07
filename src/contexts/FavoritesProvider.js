import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import FavoritesContext from './FavoritesContext';

export default function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    if (localStorage.getItem('favoriteRecipes')) {
      setFavorites(JSON.parse(localStorage.getItem('favoriteRecipes')));
    }
  }, []);

  function saveFavoritesToLS(favArray) {
    localStorage.setItem('favoriteRecipes', JSON.stringify(favArray));
  }

  return (
    <FavoritesContext.Provider value={ { favorites, setFavorites, saveFavoritesToLS } }>
      {children}
    </FavoritesContext.Provider>
  );
}

FavoritesProvider.propTypes = {
  children: PropTypes.node,
}.isRequired;
