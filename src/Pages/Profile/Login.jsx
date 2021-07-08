import React, { useContext, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import context from '../../store/Context';

function Login() {
  const { infoUser, setDatainfoUser, inProgressRecipes } = useContext(context);
  const { email, password, shouldRedirect } = infoUser;
  const validateFields = () => {
    const passwordLength = 7;
    const validate = /\S+@\S+\.\S+/;
    const emailValidate = validate.test(email);
    const passwordValidate = password && password.length >= passwordLength;
    return !(emailValidate && passwordValidate);
  };

  const createLocalStorage = () => {
    const state = { email };
    const token = 1;
    localStorage.setItem('user', JSON.stringify(state));
    localStorage.setItem('mealsToken', JSON.stringify(token));
    localStorage.setItem('cocktailsToken', JSON.stringify(token));
  };

  useEffect(() => {
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
  }, [inProgressRecipes]);

  const handleChange = ({ target }) => {
    setDatainfoUser((oldState) => ({
      ...oldState,
      [target.name]: target.value,
    }));
  };

  const handleClick = () => {
    createLocalStorage();
    setDatainfoUser((oldState) => ({
      ...oldState,
      shouldRedirect: true,
    }));
  };

  if (shouldRedirect) return <Redirect to="/comidas" />;
  return (
    <form>
      <label htmlFor="email-input">
        <input
          type="email"
          placeholder="Email"
          name="email"
          id="email-input"
          data-testid="email-input"
          onChange={ handleChange }
        />
      </label>
      <br />
      <label htmlFor="password-input">
        <input
          type="password"
          placeholder="Senha"
          name="password"
          id="password-input"
          data-testid="password-input"
          onChange={ handleChange }
        />
      </label>
      <button
        type="button"
        disabled={ validateFields() }
        onClick={ handleClick }
        data-testid="login-submit-btn"
      >
        Entrar
      </button>
    </form>
  );
}

export default Login;
