import React from 'react';

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
    const isBlocked = (password.length >= minPassLength && validEmail);
    this.setState({
      validData: isBlocked,
    });
  }
  saveEmail() {
    const { email } = this.state;
    localStorage.setItem('user', email);
  }

  render() {
    const { email, password, validEmail, validPassword } = this.state;
    return (
      <form>
        <label htmlFor="email-input">
          <input
            type="email"
            data-testid="email-input"
            value={ email }
            onChange={ (e) => this.handleChange(e) }
          />
        </label>
        <label htmlFor="password-input">
          <input
            type="password"
            data-testid="password-input"
            value={ password }
            onChange={ (e) => this.handleChange(e) }
          />
        </label>
        <button
          type="submit"
          data-testid="login-submit-btn"
          disabled={ !validEmail || !validPassword }
          // onSubmit={ saveEmail() }
        >
          Entrar
        </button>
      </form>
    );
  }
}

export default Login;
