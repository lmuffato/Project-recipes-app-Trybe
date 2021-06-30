import React from 'react';

import EmailInput from './EmailInput';
import PasswordInput from './PasswordInput';
import ButtonLogin from './ButtonLogin';

export default function FormLogin() {
  return (
    <div>
      <EmailInput />
      <PasswordInput />
      <ButtonLogin />
    </div>
  );
}
