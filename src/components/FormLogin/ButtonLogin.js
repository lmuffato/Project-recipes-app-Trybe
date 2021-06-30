import React, { useContext } from 'react';

import LoginContext from '../../contexts/loginContext';

export default function ButtonLogin() {
  const { stateLogin } = useContext(LoginContext);
  const { email, password } = stateLogin;
  const numberMagic = 7;

  return (
    <button
      data-testid="login-submit-btn"
      type="submit"
      disabled={
        !/^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/.test(email)
        || password.length < numberMagic
      }
    >
      Entrar
    </button>
  );
}
