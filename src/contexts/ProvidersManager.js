import React from 'react';
import RecipesProvider from './RecipesProvider';
import Switcher from '../compenents/Switcher';
import UserProvider from './UserProvider';
import SearchbarProvider from './SearchbarProvider';

function ProvidersManager() {
  return (
    <UserProvider>
      <SearchbarProvider>
        <RecipesProvider>
          <Switcher />
        </RecipesProvider>
      </SearchbarProvider>
    </UserProvider>
  );
}

export default ProvidersManager;
