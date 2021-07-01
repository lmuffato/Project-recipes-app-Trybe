import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Context from '../../context/Context';

function Login(props) {
  const {
    email,
    setEmail,
    password,
    setPassword,
  } = useContext(Context);

  const validate = () => {
    const minLength = 7;
    const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    if ((password.length >= minLength) && (emailPattern.test(email) === true)) {
      return false;
    }
    return true;
  };

  const handleClick = () => {
    const { history } = props;
    const userToLocalStorage = { email };
    localStorage.setItem('mealsToken', '1');
    localStorage.setItem('cocktailsToken', '1');
    localStorage.setItem('user', JSON.stringify(userToLocalStorage));
    history.push('/comidas');
  };

  return (
    <>
      <h1>Login Page</h1>
      <form>
        <fieldset>
          <input
            type="text"
            data-testid="email-input"
            onChange={ (e) => setEmail(e.target.value) }
            value={ email }
          />
          <input
            type="password"
            data-testid="password-input"
            onChange={ (e) => setPassword(e.target.value) }
            value={ password }
          />
          <button
            type="button"
            data-testid="login-submit-btn"
            disabled={ validate() }
            onClick={ () => handleClick() }
          >
            Entrar
          </button>
        </fieldset>
      </form>
    </>
  );
}

Login.propTypes = {
  history: PropTypes.object,
}.isRequired;

export default Login;
