import React, { useState } from 'react';
import PropTypes from 'prop-types';
import UserContext from './UserContext';

function UserProvider({ children }) {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  // const [mealsToken, setMealsToken] = useState(1);
  // const [cocktailsToken, setCocktailsToken] = useState(1);

  function successLogin(loginText, passwordText) {
    setUser(loginText);
    setPassword(passwordText);
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    localStorage.setItem('user', JSON.stringify({ email: loginText }));
  }
  const context = { successLogin, user, password };
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
