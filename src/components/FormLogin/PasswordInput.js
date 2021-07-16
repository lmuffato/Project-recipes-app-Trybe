import React, { useContext } from 'react';

import LoginContext from '../../contexts/loginContext';
import passwordAction from '../../actions/passwordLogin.action';

export default function PasswordInput() {
  const { dispatch } = useContext(LoginContext);
  return (
    <div className="field">
      <label
        className="label"
        htmlFor="email-input"
      >
        Password:
        {' '}
        <br />
        <input
          data-testid="password-input"
          type="password"
          size="15"
          placeholder="more than 6 characters"
          onChange={ (evt) => dispatch(passwordAction(evt.target.value)) }
        />

      </label>
    </div>
  );
}
