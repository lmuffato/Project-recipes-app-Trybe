import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getItemFromLocalStorage } from '../services/localStorage';
import FavoritesContext from './FavoritesContext';

export default function FavoritesProvider({ children }) {
  const [allFavorites, setAllFavorites] = useState([]);

  useEffect(() => {
    const favStorageItems = getItemFromLocalStorage('favoriteRecipes');
    if (favStorageItems) {
      setAllFavorites(favStorageItems);
    }
  }, []);

  const context = {
    allFavorites,
  };

  return (
    <FavoritesContext.Provider value={ context }>
      {children}
    </FavoritesContext.Provider>
  );
}

FavoritesProvider.propTypes = {
  children: PropTypes.node,
}.isRequired;
