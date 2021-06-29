import { object } from 'prop-types';
import React from 'react';
import ContextComidas from './ContextComida';

function ProviderComidas({ children }) {
  const context = {};
  return (
    <ContextComidas.Provider value={ context }>
      { children }
    </ContextComidas.Provider>
  );
}

ProviderComidas.propTypes = {
  children: object,
}.isRequired;

export default ProviderComidas;
