import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import context from '../../store/Context';
import '../../Styles/loginPage.css';

function Login() {
  const { infoUser, setDatainfoUser } = useContext(context);
  const { email, password } = infoUser;
  const validateFields = () => {
    const passwordLength = 7;
    const validate = /\S+@\S+\.\S+/;
    const emailValidate = validate.test(email);
    const passwordValidate = password && password.length >= passwordLength;
    return !(emailValidate && passwordValidate);
  };
  const history = useHistory();

  const createLocalStorage = () => {
    const state = { email };
    const token = 1;
    localStorage.setItem('user', JSON.stringify(state));
    localStorage.setItem('mealsToken', JSON.stringify(token));
    localStorage.setItem('cocktailsToken', JSON.stringify(token));
  };

  const handleChange = ({ target }) => {
    setDatainfoUser((oldState) => ({
      ...oldState,
      [target.name]: target.value,
    }));
  };

  const handleClick = () => {
    createLocalStorage();
    history.push('/comidas');
  };

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
