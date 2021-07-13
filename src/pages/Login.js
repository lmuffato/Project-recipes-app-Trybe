import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import img from '../images/login-img.jpg';
import setEmail from '../redux/actions/userAction';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      userEmail: '',
      senha: '',
    };
    this.onChange = this.onChange.bind(this);
  }

  onChange(event) {
    const { userEmail } = this.state;
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    const userInfo = { email: userEmail };
    console.log(userInfo);
    const userInfoJson = JSON.stringify(userInfo);
    localStorage.setItem('user', userInfoJson);
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  validation() {
    const { userEmail, senha } = this.state;
    const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
    const minValue = 6;
    if (emailRegex.test(userEmail) && senha.length > minValue) {
      return false;
    }

    return true;
  }

  render() {
    const { userEmail, senha } = this.state;
    const { handleClick } = this.props;
    return (
      <section className="login">
        <h1>App receitas</h1>

        <div className="login-box">
          <h5>Login</h5>
          <label htmlFor="input-email">
            <input
              placeholder="Email"
              data-testid="email-input"
              type="text"
              id="input-email"
              onChange={ this.onChange }
              value={ userEmail }
              name="userEmail"
            />
          </label>
          <label htmlFor="input-password">
            <input
              placeholder="Senha"
              data-testid="password-input"
              type="password"
              id="input-password"
              onChange={ this.onChange }
              value={ senha }
              name="senha"
            />
          </label>
          <Link to="/comidas">
            <button
              data-testid="login-submit-btn"
              onClick={ () => { handleClick(userEmail); } }
              disabled={ this.validation() }
              type="button"
            >
              Entrar
            </button>
          </Link>
        </div>

        <img src={ img } alt="ilutração" />
      </section>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  handleClick: (email) => dispatch(
    setEmail(email),
  ),
});

export default connect(null, mapDispatchToProps)(Login);

Login.propTypes = {
  handleClick: PropTypes.func,
}.isRequired;
