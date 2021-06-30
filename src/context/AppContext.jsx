import React, { useState, createContext } from 'react';
import PropTypes from 'prop-types';

export const AppContext = createContext();

export default function AppProvider({ children }) {
  // header States
  const [displaySearchBar, setDisplaySearchBar] = useState(false);
  const displaySearchBarToggle = () => setDisplaySearchBar(!displaySearchBar);

  const context = {
    displaySearchBar,
    displaySearchBarToggle,
  };

  return (
    <AppContext.Provider value={ context }>
      {children}
    </AppContext.Provider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
