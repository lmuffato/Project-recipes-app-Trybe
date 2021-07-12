import React, { useState } from 'react';
import PropTypes from 'prop-types';
import UserContext from './UserContext';

function UserProvider({ children }) {
  const localDone = JSON.parse(localStorage.getItem('doneRecipes'));
  const localDoing = JSON.parse(localStorage.getItem('inProgressRecipes'));
  console.log(localDoing);

  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [doneRecipes, setDoneRecipes] = useState(localDone || []);
  const [doingRecipes, setDoingRecipes] = useState(
    localDoing || { meals: {}, cocktails: {} },
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
