import { object } from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';

function Login(props) {
  const INITIAL_LOGIN = {
    email: '',
    password: '',
  };
  const [isDisabled, setIsDisabled] = useState(true);
  const [login, setLogin] = useState(INITIAL_LOGIN);

  const handleChange = ({ target: { name, value } }) => {
    setLogin({
      ...login,
      [name]: value,
    });
  };

  const handleClick = () => {
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    localStorage.setItem('user', JSON.stringify(login.email));
    const { history } = props;
    history.push('/comidas');
  };

  const inputsLogin = () => (
    <Form className="">
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email:</Form.Label>
        <Form.Control
          size="lg"
          type="email"
          placeholder="Enter email"
          name="email"
          value={ login.email }
          onChange={ handleChange }
          data-testid="email-input"
        />
        <Form.Text className="text-muted">
          Nunca compartilharemos seu e-mail com mais ninguém.
        </Form.Text>
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Senha:</Form.Label>
        <Form.Control
          size="lg"
          type="password"
          name="password"
          value={ login.password }
          onChange={ handleChange }
          placeholder="Senha"
          data-testid="password-input"
        />
      </Form.Group>
      <Button
        variant="success"
        type="button"
        disabled={ isDisabled }
        onClick={ handleClick }
        data-testid="login-submit-btn"
        className="col-md-4 offset-md-4"
      >
        Entrar
      </Button>
    </Form>
  );

  // regex de email retirado de: https://ui.dev/validate-email-address-javascript/
  const inputsVerifier = () => {
    const { email, password } = login;
    // modelo que o regex de email verifica _@_._
    const emailRegex = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    const passwordRegex = new RegExp(/[\w\D]{7}/g);
    if (emailRegex.test(email) && passwordRegex.test(password)) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  };

  useEffect(() => {
    inputsVerifier();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [login]);

  return (
    <div className="shadow p-3 mb-5 bg-white rounded col-md-4 offset-md-4">
      <h1 className="text-center mb-4">Login</h1>
      {inputsLogin()}
    </div>
  );
}

Login.propTypes = {
  history: object,
}.isRequired;

export default Login;
