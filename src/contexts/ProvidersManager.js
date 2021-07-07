import React from 'react';
import RecipesProvider from './RecipesProvider';
import Switcher from '../compenents/Switcher';

function ProvidersManager() {
  return (
    <RecipesProvider>
      <Switcher />
    </RecipesProvider>
  );
}

export default ProvidersManager;
