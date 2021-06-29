import React, { useState } from 'react';
import PropTypes from 'prop-types';
import UserContext from './UserContext';

function UserProvider(props) {
  const [user, setUser] = useState({});
  const context = {
    user,
    setUser,
  };
  const { children } = props;
  return (
    <UserContext.Provider value={ context }>
      {children}
    </UserContext.Provider>
  );
}

UserProvider.propTypes = {
  children: PropTypes.node,
}.isRequired;

export default UserProvider;
