import React, { useState } from 'react';
import PropTypes from 'prop-types';

import UserContext from './UserContext';

function UserProvider({ children }) {
  const [email, setEmail] = useState('');

  return (
    <UserContext.Provider value={ { email, setEmail } }>
      { children }
    </UserContext.Provider>
  );
}

UserProvider.propTypes = {
  children: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default UserProvider;
