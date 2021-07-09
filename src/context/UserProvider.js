import React, { useState } from 'react';
import PropTypes from 'prop-types';
import UserContext from './UserContext';

function UserProvider({ children }) {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [doingRecipes, setDoingRecipes] = useState([]);
  // cada receita deve ser um objeto dentro do array, deve ter uma chave 'id' que
  // armazena o id da receita;
  // Caso uma receita tenha sido feita, não esquecer de retirar de doing.

  function successLogin(loginText, passwordText) {
    setUser(loginText);
    setPassword(passwordText);
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    localStorage.setItem('user', JSON.stringify({ email: loginText }));
  }
  const context = {
    successLogin,
    user,
    password,
    doneRecipes,
    setDoneRecipes,
    doingRecipes,
    setDoingRecipes,
  };

  return (
    <UserContext.Provider value={ context }>
      {children}
    </UserContext.Provider>
  );
}

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default UserProvider;
