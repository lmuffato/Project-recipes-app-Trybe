import React from 'react';
import PropTypes from 'prop-types';
import Context from './Context';

function MyProvider({ children }) {
  const contextValue = {
  };

  return (
    <Context.Provider value={ contextValue }>
      { children }
    </Context.Provider>
  );
}

MyProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MyProvider;
