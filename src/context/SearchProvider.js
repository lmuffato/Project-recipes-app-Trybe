import React, { useState } from 'react';
import PropTypes from 'prop-types';
import SearchContext from './SearchContext';

function SearchProvider({ children }) {
  const [inputText, setInputText] = useState('');
  const [inputRadios, setInputRadios] = useState('');

  return (
    <SearchContext.Provider
      value={ {
        inputText,
        setInputText,
        inputRadios,
        setInputRadios,
      } }
    >
      {children}
    </SearchContext.Provider>
  );
}

SearchProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SearchProvider;
