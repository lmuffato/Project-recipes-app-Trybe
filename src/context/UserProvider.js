import React, { useState } from 'react';
import PropTypes from 'prop-types';

import UserContext from './UserContext';

function UserProvider({ children }) {
  const [email, token] = useState({ email: '', token: 1 });
  return (
    <UserContext.Provider value={ { email, token } }>
      { children }
    </UserContext.Provider>
  );
}

UserProvider.propTypes = {
  children: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default UserProvider;
