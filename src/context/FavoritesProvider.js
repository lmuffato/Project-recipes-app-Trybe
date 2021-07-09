import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import FavoritesContext from './FavoritesContext';
import { getItemFromLocalStorage } from '../services/localStorage';
import { ApiRecipeDetail } from '../services/theMealAPI';
import { ApiDetailsById } from '../services/theCockTailAPI';

export default function FavoritesProvider({ children }) {
  const [allFavorites, setAllFavorites] = useState([]);

  const fetchItemsDetails = async () => {
    const storageItems = getItemFromLocalStorage('favoriteRecipes');
    let list = [];

    if (storageItems) {
      const promises = storageItems.map((item) => {
        if (item.type === 'comida') {
          return ApiRecipeDetail(item.id);
        }
        return ApiDetailsById(item.id);
      });
      // Fonte: https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Promise/all
      list = await Promise.all(promises);
    }

    const listItems = list.map((item) => {
      const keys = Object.keys(item);
      if (keys.includes('meals')) {
        return item.meals[0];
      }
      return item.drinks[0];
    });

    return listItems;
  };

  useEffect(() => {
    const request = async () => {
      const data = await fetchItemsDetails();
      setAllFavorites(data);
    };
    request();
  }, []);

  const context = {
    allFavorites,
    setAllFavorites,
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
