import React from 'react';
import PropTypes from 'prop-types';

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

  checkAndSetStore() {
    const storedInProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const storedDone = JSON.parse(localStorage.getItem('doneRecipes'));
    const inProgressPattern = {
      meals: {},
      cocktails: {},
    };
    const donePattern = [];

    if (!storedInProgress) {
      localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressPattern));
    }

    if (!storedDone) {
      localStorage.setItem('doneRecipes', JSON.stringify(donePattern));
    }
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
    this.checkAndSetStore();
    history.push('/comidas');
  }

  render() {
    const { email, password, validData } = this.state;
    return (
      <form>
        <label htmlFor="email">
          <input
            type="email"
            id="email"
            data-testid="email-input"
            value={ email }
            onChange={ (e) => this.handleChange(e) }
          />
        </label>
        <label htmlFor="password">
          <input
            type="password"
            id="password"
            data-testid="password-input"
            value={ password }
            onChange={ (e) => this.handleChange(e) }
          />
        </label>

        <button
          type="button"
          data-testid="login-submit-btn"
          disabled={ !validData }
          onClick={ this.saveEmail }
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
