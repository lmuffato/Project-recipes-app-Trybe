import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import FavoritesContext from './FavoritesContext';
import GetFavoritesDetails from '../services/GetFavoritesDetails';

export default function FavoritesProvider({ children }) {
  const [allFavorites, setAllFavorites] = useState([]);
  const [renderAll, setRenderAll] = useState(true);
  const [renderMeals, setRenderMeals] = useState(false);
  const [renderDrinks, setRenderDrinks] = useState(false);

  useEffect(() => {
    const request = async () => {
      const data = await GetFavoritesDetails();
      setAllFavorites(data);
    };
    request();
  }, [setAllFavorites]);

  const context = {
    allFavorites,
    setAllFavorites,
    renderAll,
    setRenderAll,
    renderMeals,
    setRenderMeals,
    renderDrinks,
    setRenderDrinks,
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
