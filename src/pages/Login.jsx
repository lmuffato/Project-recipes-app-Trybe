import React from 'react';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      validData: false,
    };

    this.userValidate = this.userValidate.bind(this);
    this.saveEmail = this.saveEmail.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const { value, id } = e.target;
    this.setState({
      [id]: value,
    }, () => this.userValidate());
  }

  userValidate() {
    const { email, password } = this.state;
    const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    const validEmail = regex.test(String(email).toLowerCase());
    const minPassLength = 6;
    const isBlocked = (password.length > minPassLength && validEmail);
    this.setState({
      validData: isBlocked,
    });
  }

  saveEmail(e) {
    e.preventDefault();
    const { email } = this.state;
    const user = {
      email,
    };
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    const { history } = this.props;
    history.push('/comidas');
  }

  render() {
    const { email, password, validData } = this.state;
    const title = '<Recipes APP/>';
    return (
      <form className="loginForm">
        <h1 className="title">{title}</h1>
        <img
          src="https://static.vecteezy.com/ti/vetor-gratis/p1/364628-chef-avatar-ilustracao-gr%C3%A1tis-vetor.jpg"
          alt="avatar-padrão"
          className="avatar"
        />
        <label htmlFor="email">
          <input
            type="email"
            id="email"
            data-testid="email-input"
            value={ email }
            onChange={ (e) => this.handleChange(e) }
            className="userInputs"
            placeholder="E-mail"
          />
        </label>
        <label htmlFor="password">
          <input
            type="password"
            id="password"
            data-testid="password-input"
            value={ password }
            onChange={ (e) => this.handleChange(e) }
            className="userInputs"
            placeholder="Senha"
          />
        </label>

        <button
          type="button"
          data-testid="login-submit-btn"
          disabled={ !validData }
          onClick={ this.saveEmail }
          className="btn btn-danger"
        >
          Entrar
        </button>
      </form>
    );
  }
}

Login.propTypes = {
  history: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default Login;
