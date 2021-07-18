import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import context from '../../store/Context';
import '../../Styles/loginPage.css';

import colors from '../../Styles/colors';

const style = {
  form: {
    display: 'flex',
    flex: 1,
    backgroundColor: 'rgba(154, 154, 142, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    height: '90vh',
    width: '90vw',
    padding: '10px',
  },
  input: {
    fontFamily: 'MedievalSharp, Cursive',
    padding: 10,
    color: colors.cor3,
  },
  button: {
    marginTop: 20,
    color: colors.cor3,
    padding: 10,
    fontFamily: 'MedievalSharp, cursive',
  },
  heading: {
    fontFamily: 'MedievalSharp, cursive',
    color: colors.cor3,
    backgroundColor: colors.cor4,
    padding: 10,
    borderRadius: 10,
  },
};

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
    <form style={ style.form }>
      <h1 style={ style.heading }>Prancing Pony</h1>
      <label htmlFor="email-input">
        <input
          type="email"
          placeholder="Email"
          name="email"
          id="email-input"
          data-testid="email-input"
          onChange={ handleChange }
          style={ style.input }
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
          style={ style.input }
        />
      </label>
      <button
        type="button"
        disabled={ validateFields() }
        onClick={ handleClick }
        data-testid="login-submit-btn"
        style={ style.button }
      >
        Entrar
      </button>
    </form>
  );
}

export default Login;
