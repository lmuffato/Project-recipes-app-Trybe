import React, { useReducer } from 'react';
import { Redirect } from 'react-router';

import redirectAction from '../../actions/redirect.action';
import loginReducer from '../../reducer/index';
import LoginContext from '../../contexts/loginContext';

import EmailInput from './EmailInput';
import PasswordInput from './PasswordInput';
import ButtonLogin from './ButtonLogin';
import '../../style/FormLogin.css';

export default function FormLogin() {
  const [stateLogin, dispatch] = useReducer(loginReducer, {
    email: '',
    password: '',
    mealsToken: '1',
    cocktailsToken: '1',
    redirect: false,
  });

  const { mealsToken, cocktailsToken, email, redirect } = stateLogin;
  return (
    <LoginContext.Provider value={ { stateLogin, dispatch } }>
      <div className="form-login">
        <form
          onSubmit={ (evt) => {
            evt.preventDefault();
            localStorage.setItem('mealsToken', mealsToken);
            localStorage.setItem('cocktailsToken', cocktailsToken);
            localStorage.setItem('user', JSON.stringify({ email }));
            dispatch(redirectAction(true));
          } }
        >
          <EmailInput />
          <br />
          <PasswordInput />
          <ButtonLogin />
        </form>
        { redirect ? <Redirect to="/comidas" /> : ''}
      </div>
    </LoginContext.Provider>
  );
}
