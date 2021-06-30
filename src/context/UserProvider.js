import React, { useState } from 'react';
import PropTypes from 'prop-types';
import UserContext from './UserContext';

function UserProvider({ children }) {
  const [email, setEmail] = useState('');
  const [inputText, setInputText] = useState('');
  const [inputRadios, setInputRadios] = useState('');

  return (
    <UserContext.Provider
      value={ {
        email,
        setEmail,
        inputText,
        setInputText,
        inputRadios,
        setInputRadios,
      } }
    >
      {children}
    </UserContext.Provider>
  );
}

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default UserProvider;
