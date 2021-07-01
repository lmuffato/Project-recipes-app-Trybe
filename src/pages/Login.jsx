import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      validPassword: false,
      validEmail: false,
    };

    this.userValidate = this.userValidate.bind(this);
    this.saveEmail = this.saveEmail.bind(this);
    this.setToken = this.setToken.bind(this);
  }

  setToken() {
    const token = '1';
    localStorage.setItem('mealsToken', token);
    localStorage.setItem('cocktailsToken', token);
  }

  userValidate() {
    const { email, password } = this.state;
    const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    const validEmail = regex.test(String(email).toLowerCase());
    const minPassLength = 6;
    if (password.length >= minPassLength) {
      this.setState({ validPassword: true });
    }
    if (validEmail) {
      this.setState({ validEmail: true });
    }
  }

  saveEmail() {
    const { email } = this.state;
    localStorage.setItem('user', email);
  }

  render() {
    const { email, password, validEmail, validPassword } = this.state;
    const { setToken, saveEmail } = this.props;
    return (
      <form>
        <label htmlFor="email-input">
          <input
            id="email-input"
            type="email"
            data-testid="email-input"
            value={ email }
          />
        </label>
        <label htmlFor="password-input">
          <input
            id="password-input"
            type="password"
            data-testid="password-input"
            value={ password }
          />
        </label>
        <input />
        <Link
          to="/comidas"
          type="button"
          data-testid="login-submit-btn"
          disabled={ validEmail && validPassword }
          onSubmit={ () => { saveEmail(); } }
          onClick={ () => { setToken(); } }
        >
          Entrar
        </Link>
      </form>
    );
  }
}

Login.propTypes = {
  setToken: PropTypes.func,
}.isRequired;

export default Login;
