import React, { useState } from 'react';
import PropTypes from 'prop-types';
import UserContext from './UserContext';

function UserProvider({ children }) {
  const [userEmail, setUserEmail] = useState('');
  const [userPassw, setUserPassw] = useState('');

  const contextUser = {
    userEmail,
    setUserEmail,
    userPassw,
    setUserPassw,
  };

  return (
    <UserContext.Provider value={ contextUser }>
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;

UserProvider.propTypes = {
  children: PropTypes.arrayOf(PropTypes.object),
}.isRequired;
