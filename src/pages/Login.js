import React, { useEffect, useState } from 'react';

function Login(props) {
  const INITIAL_LOGIN = {
    email: '',
    password: '',
  };
  const [isDisabled, setIsDisabled] = useState(true);
  const [login, setLogin] = useState(INITIAL_LOGIN);

  const handleChange = ({ target }) => {
    console.log(target);
  };

  const handleClick = ({ target }) => {
    const { history } = props;
    console.log(history);
  };

  const inputsLogin = () => (
    <form className="bd-highlight container">
      <input
        type="text"
        name="email"
        value={ login.email }
        onChange={ handleChange }
        placeholder="Email"
        data-testid="email-input"
        className="form-control col mb-4"
      />
      <input
        type="password"
        name="password"
        value={ login.password }
        onChange={ handleChange }
        placeholder="Senha"
        data-testid="password-input"
        className="form-control col mb-4"
      />
      <button
        type="button"
        disabled={ isDisabled }
        onClick={ handleClick }
        data-testid="login-submit-btn"
        className="btn btn-secondary col"
      >
        Entrar
      </button>
    </form>
  );

  // regex de email retirado de: https://ui.dev/validate-email-address-javascript/
  const inputsVerifier = () => {
    const { email, password } = login;
    const emailRegex = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    const passwordRegex = new RegExp(/[\w\D]{7}/g);
    if (emailRegex.test(email) && passwordRegex.test(password)) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  };

  useEffect(() => {
    inputsVerifier();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [login]);

  return (
    <div>
      <h1 className="text-center mb-4">Login</h1>
      {inputsLogin()}
    </div>
  );
}

export default Login;
