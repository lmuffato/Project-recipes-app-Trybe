import React, { useContext } from 'react';
import ReceitasContext from '../contexts/ReceitasContext';

function Login() {
  const { email } = useContext(ReceitasContext);
  console.log(email);
  return (
    <div>
      <h1>Login</h1>
    </div>
  );
}

export default Login;
