import React, { useState } from 'react';
import { shape } from 'prop-types';

import StorageContext from './StorageContext';

function StorageProvider({ children }) {
  const [favoriteRecipes, setFavoriteRecipes] = useState(
    JSON.parse(localStorage.getItem('favoriteRecipes')),
  );

  function syncFavoriteRecipes() {
    setFavoriteRecipes(JSON.parse(localStorage.getItem('favoriteRecipes')));
  }
  return (
    <StorageContext.Provider value={ { favoriteRecipes, syncFavoriteRecipes } }>
      {children}
    </StorageContext.Provider>
  );
}

StorageProvider.propTypes = {
  children: shape({}).isRequired,
};

export default StorageProvider;
