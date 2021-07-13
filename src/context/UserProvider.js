import React, { useState } from 'react';
import PropTypes from 'prop-types';
import UserContext from './UserContext';
import { handleLocalProgress } from '../helpers';

function UserProvider({ children }) {
  const localDone = JSON.parse(localStorage.getItem('doneRecipes'));
  const INITIAL_DOINGS = JSON.parse(localStorage.getItem('inProgressRecipes'));

  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [doneRecipes, setDoneRecipes] = useState(localDone || []);
  const [doingRecipes, setDoingRecipes] = useState(
    INITIAL_DOINGS || handleLocalProgress(),
  );

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
