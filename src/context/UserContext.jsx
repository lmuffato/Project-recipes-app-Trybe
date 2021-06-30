import React, { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

export const UserContext = createContext({});

function UserContextProvider({ children }) {
  const [emailData, setEmail] = useState('');
  const [passwordData, setPassword] = useState('');
  const [disabledData, setDisabled] = useState(true);

  useEffect(() => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const lengthSix = 6;
    if (re.test(emailData) && passwordData.length > lengthSix) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [emailData, passwordData]);

  const handleClick = () => {
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
  };

  const contextValue = {
    disabledData,
    setEmail,
    setPassword,
    handleClick,
  };

  return (
    <UserContext.Provider value={ contextValue }>
      { children }
    </UserContext.Provider>
  );
}

UserContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default UserContextProvider;
