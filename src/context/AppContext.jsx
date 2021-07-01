import React, { useState, createContext } from 'react';
import PropTypes from 'prop-types';

export const AppContext = createContext();

export default function AppProvider({ children }) {
  // header States
  const [displaySearchBar, setDisplaySearchBar] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [pageOrigin, setPageOrigin] = useState('');
  const context = {
    displaySearchBar,
    setDisplaySearchBar,
    searchValue,
    setSearchValue,
    inputValue,
    setInputValue,
    pageOrigin,
    setPageOrigin,
  };

  return (
    <AppContext.Provider value={ { context } }>
      {children}
    </AppContext.Provider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
