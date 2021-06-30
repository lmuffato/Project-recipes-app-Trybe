import React, { useState } from 'react';
import { node } from 'prop-types';
import Context from './Context';

function Provider({ children }) {
  // useStates...
  const [logout, setLogout] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dataValue = {
    logout,
    setLogout,
    email,
    setEmail,
    password,
    setPassword,
  };

  return (
    <Context.Provider value={ dataValue }>
      { children }
    </Context.Provider>
  );
}

Provider.propTypes = {
  children: node,
}.isRequired;

export default Provider;
