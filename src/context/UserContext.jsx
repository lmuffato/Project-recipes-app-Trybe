import React, { createContext } from 'react';
import PropTypes from 'prop-types';

export const UserContext = createContext({});

function UserContextProvider({ children }) {
  const contextValue = {};

  return (
    <UserContext.Provider value={ contextValue }>
      { children }
    </UserContext.Provider>
  );
}

UserContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default UserContextProvider;
