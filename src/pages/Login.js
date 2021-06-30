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
    this.setToken = this.setToken.bind(this);
  }

  /*
  setToken() {
  const token = '1';
  return setToken = localStorage.getItem('token');
  };
*/
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

  render() {
    const {
      email,
      password,
      validEmail,
      validPassword } = this.state;

    const { setToken } = this.props;
    return (
      <form>
        <label htmlFor="email-input">
          <input
            type="email"
            data-testid="email-input"
            value={ email }
            // onChange={}
          />
        </label>
        <label htmlFor="password-input">
          <input
            type="password"
            data-testid="password-input"
            value={ password }
          // onChange={}
          />
        </label>
        <Link
          to="/comidas"
          type="button"
          data-testid="login-submit-btn"
          disabled={ !validEmail || !validPassword }
          onClick={ this.setToken() }
        >
          Entrar
        </Link>
      </form>
    );
  }
}

export default Login;
