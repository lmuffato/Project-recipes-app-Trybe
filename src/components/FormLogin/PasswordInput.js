import React, { useContext } from 'react';

import LoginContext from '../../contexts/loginContext';
import passwordAction from '../../actions/passwordLogin.action';

export default function PasswordInput() {
  const { stateLogin, dispatch } = useContext(LoginContext);
  console.log(stateLogin);
  return (
    <input
      data-testid="password-input"
      type="password"
      placeholder="more than 6 characters"
      onChange={ (evt) => dispatch(passwordAction(evt.target.value)) }
    />
  );
}
