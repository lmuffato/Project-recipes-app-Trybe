import React, { useContext } from 'react';

import LoginContext from '../../contexts/loginContext';
import emailAction from '../../actions/emailLogin.action';

export default function EmailInput() {
  const { dispatch } = useContext(LoginContext);

  return (
    <input
      data-testid="email-input"
      type="email"
      placeholder="name@example.com"
      onChange={ (evt) => dispatch(emailAction(evt.target.value)) }
    />
  );
}
