import { object } from 'prop-types';
import React from 'react';
import ContextBebidas from './ContextBebida';

function ProviderBebidas({ children }) {
  const context = {};
  return (
    <ContextBebidas.Provider value={ context }>
      { children }
    </ContextBebidas.Provider>
  );
}

ProviderBebidas.propTypes = {
  children: object,
}.isRequired;

export default ProviderBebidas;
