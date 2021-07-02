import React, { useState } from 'react';
import PropTypes from 'prop-types';
import UserContext from './UserContext';
import MealsProvider from './MealsProvider';
import CocktailsProvider from './CocktailsProvider';

function UserProvider({ children }) {
  const [user, setUser] = useState({});
  const context = {
    user,
    setUser,
  };

  return (
    <CocktailsProvider>
      <MealsProvider>
        <UserContext.Provider value={ context }>
          {children}
        </UserContext.Provider>
      </MealsProvider>
    </CocktailsProvider>
  );
}

UserProvider.propTypes = {
  children: PropTypes.node,
}.isRequired;

export default UserProvider;
