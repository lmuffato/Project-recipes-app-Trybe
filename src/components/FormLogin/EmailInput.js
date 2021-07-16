import React, { useContext } from 'react';

import LoginContext from '../../contexts/loginContext';
import emailAction from '../../actions/emailLogin.action';

export default function EmailInput() {
  const { dispatch } = useContext(LoginContext);

  return (
    <div className="field">
      <label
        className="label"
        htmlFor="email-input"
      >
        E-Mail:
        {' '}
        <input
          name="email-input"
          size="15"
          data-testid="email-input"
          type="email"
          placeholder="name@example.com"
          onChange={ (evt) => dispatch(emailAction(evt.target.value)) }
        />
      </label>
    </div>
  );
}
