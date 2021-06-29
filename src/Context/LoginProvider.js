import React, { useState } from 'react';
import { node } from 'prop-types';
import LoginContext from './LoginContext';

function LoginProvider({ children }) {
  const [stateA, setStateA] = useState('');
  const [stateB, setStateB] = useState('');
  const contextValue = {
    stateA,
    setStateA,
    stateB,
    setStateB,
  };

  return (
    <LoginContext.Provider value={ contextValue }>
      {children}
    </LoginContext.Provider>
  );
}

LoginProvider.propTypes = {
  children: node,
}.isRequired;

export default LoginProvider;
