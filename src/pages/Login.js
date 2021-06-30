import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import { loginAction } from '../actions';
import './Login.css';

function Login({ history, loginProps }) {
  const [buttonDisable, setButtonDisable] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const passwordMinimumLength = 7;
    if (password.length >= passwordMinimumLength && /^\S+@\S+\.\S+$/.test(email)) {
      setButtonDisable(false);
    } else {
      setButtonDisable(true);
    }
  }, [email, password]);

  const handleClick = () => {
    const user = { email };
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    loginProps({ email, password });
    history.push('/comidas');
  };

  return (
    // https://react-bootstrap.github.io/components/forms/ modelo de formulario.
    <Form className="login-form">
      <h1 className="text-center">Trybe Recipes</h1>
      <Form.Group controlId="formBasicEmail" className="form-group">
        <Form.Control
          className="form-input"
          type="email"
          placeholder="Enter email"
          data-testid="email-input"
          value={ email }
          onChange={ (e) => setEmail(e.target.value) }
        />
      </Form.Group>
      <Form.Group controlId="formBasicPassword">
        <Form.Control
          type="password"
          placeholder="Password"
          data-testid="password-input"
          value={ password }
          onChange={ (e) => setPassword(e.target.value) }
        />
      </Form.Group>
      {' '}
      <Button
        variant="success"
        type="submit"
        data-testid="login-submit-btn"
        disabled={ buttonDisable }
        onClick={ handleClick }
      >
        Entrar
      </Button>
    </Form>
  );
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  loginProps: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  loginProps: (payload) => dispatch(loginAction(payload)),
});

export default connect(null, mapDispatchToProps)(Login);
