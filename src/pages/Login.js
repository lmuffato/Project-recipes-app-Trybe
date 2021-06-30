import React from 'react';

class Login extends React.Component {
/*  constructor(props) {
    super(props)

    this.state = {
      disableOn: true,
    }

  }
  */

  render() {
    // const { disableOn } = this.state;
    return (
      <form>
        <label htmlFor="email-input">
          <input
            type="email"
            data-testid="email-input"
            // onChange={}
          />
        </label>
        <label htmlFor="password-input">
          <input
            type="password"
            data-testid="password-input"
          // onChange={}
          />
        </label>
        <button
          type="button"
          data-testid="login-submit-btn"
          // disable={ disableOn }
        >
          Entrar
        </button>
      </form>
    );
  }
}

export default Login;
