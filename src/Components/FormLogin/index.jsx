import { Button, Form } from 'react-bootstrap';
import React, { useContext, useState } from 'react';
import './formLogin.css';
import { useHistory } from 'react-router';
import UserContext from '../../context/UserContext';

export default function FormLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { successLogin } = useContext(UserContext);
  const numPassword = 6;
  const history = useHistory();

  function handleSubmit(evt) {
    evt.preventDefault();
    successLogin(email, password);
    history.push('/comidas');
  }

  return (
    <main className="login">
      <div>
        <h3>Login</h3>
      </div>
      <Form className="form-login" onSubmit={ handleSubmit }>
        <Form.Group controlId="formBasicEmail">
          <Form.Control
            value={ email }
            onChange={ (evt) => setEmail(evt.target.value) }
            type="email"
            placeholder="E-mail"
            data-testid="email-input"
            required
          />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Control
            type="password"
            placeholder="Senha"
            data-testid="password-input"
            value={ password }
            onChange={ (evt) => setPassword(evt.target.value) }
            required
          />
        </Form.Group>
        <Button
          type="submit"
          data-testid="login-submit-btn"
          disabled={
            !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) || password.length <= numPassword
          }
        >
          Entrar
        </Button>
      </Form>
    </main>
  );
}
