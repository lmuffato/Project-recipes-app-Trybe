import React, { useContext } from 'react';

import LoginContext from '../../contexts/loginContext';

export default function ButtonLogin() {
  const { stateLogin } = useContext(LoginContext);
  const { email, password } = stateLogin;
  const numberMagic = 7;

  return (
    <div className="control">
      <button
        className="button is-primary"
        data-testid="login-submit-btn"
        type="submit"
        disabled={
          !/^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/.test(email)
          || password.length < numberMagic
        }
      >
        Login
      </button>
    </div>
  );
}
