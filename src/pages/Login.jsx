import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router';
import UserContext from '../contexts/UserContext';
import Recipes from '../images/Recipes.gif';
import '../styles/login.css';

const validateEmail = (email, password) => {
  const six = 6;
  const regexEmail = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/;
  if (regexEmail.test(String(email).toLowerCase()) && password.length > six) {
    return false;
  } return true;
};

const iconTag = (fn, className) => (
  <i
    onClick={ fn }
    className={ `${className} lnr-eye` }
    aria-hidden="true"
  />
);

const imgEye = 'fas fa-eye-slash';

function Login() {
  const { login, setLogin } = useContext(UserContext);
  const history = useHistory();
  const { email, password } = login;
  const [showPassword, setPasswordType] = useState('password');
  const [showOpenEye, setOpenEye] = useState(imgEye);

  const handleChange = ({ target: { name, value } }) => {
    setLogin({
      ...login,
      [name]: value,
    });
  };

  const handleClick = (userEmail) => {
    const tokens = {
      email: userEmail,
    };
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    localStorage.setItem('user', JSON.stringify(tokens));
    history.push('/comidas');
  };

  const showPasswordCLick = () => {
    if (showPassword === 'password' && showOpenEye === imgEye) {
      setPasswordType('text');
      setOpenEye('fas fa-eye');
    } else {
      setPasswordType('password');
      setOpenEye(imgEye);
    }
  };

  return (
    <div className="login_container">
      <img className="logo-login" src={ Recipes } alt="logo" />
      <form>
        <div className="children_container">
          <h3>Login</h3>
          <h5>Welcome to Recipe App</h5>
          <label htmlFor="email-input">
            <input
              className="input-email"
              type="email"
              data-testid="email-input"
              name="email"
              value={ email }
              onChange={ handleChange }
              placeholder="Email"
            />
          </label>
          <label className="FatherEye" htmlFor="password-input">
            <input
              className="inputEye"
              type={ showPassword }
              data-testid="password-input"
              name="password"
              value={ password }
              onChange={ handleChange }
              placeholder="Password"
            />
            {
              password.length > 0
                ? iconTag(showPasswordCLick, showOpenEye)
                : null
            }
          </label>
          <button
            className="btn-login"
            type="button"
            data-testid="login-submit-btn"
            disabled={ validateEmail(email, password) }
            onClick={ () => handleClick(email) }
          >
            ENTRAR
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
