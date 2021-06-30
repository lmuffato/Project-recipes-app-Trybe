import React, { useReducer } from 'react';

import loginReducer from '../../reducer/index';
import LoginContext from '../../contexts/loginContext';

import EmailInput from './EmailInput';
import PasswordInput from './PasswordInput';
import ButtonLogin from './ButtonLogin';

export default function FormLogin() {
  const [stateLogin, dispatch] = useReducer(loginReducer, {
    email: '',
    password: '',
  });

  return (
    <LoginContext.Provider value={ { stateLogin, dispatch } }>
      <form
        onSubmit={ (evt) => evt.preventDefault() }
      >
        <EmailInput />
        <PasswordInput />
        <ButtonLogin />
      </form>
    </LoginContext.Provider>
  );
}
