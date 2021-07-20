import React, { useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Context from '../../context/Context';
import setTokenLocalStorage from '../../services/localStorage';
import './Login.css';

function loginValidation(email, password) {
  const regex2Email = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
  const minLenght = 6;
  if (regex2Email.test(email) && password.length > minLenght) return false;
  return true;
}

export default function Login() {
  const { setUserEmail, setPassword, userEmail, password } = useContext(Context);
  console.log(userEmail);
  return (
    <div className="login-page">
        <h1 className="title-login">OPEN</h1>
      <Form className="Forms-Login">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label className="email-label">Email address</Form.Label>
          <Form.Control
            className="email-input"
            onChange={ ({ target }) => setUserEmail(target.value) }
            data-testid="email-input"
            type="email"
            placeholder="Enter email"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label className="password-label">Password</Form.Label>
          <Form.Control
            className="password-input"
            onChange={ ({ target }) => setPassword(target.value) }
            type="password"
            minLength="6"
            placeholder="Password"
            data-testid="password-input"
          />
        </Form.Group>
        <Link to="/comidas">
          <Button
            disabled={ loginValidation(userEmail, password) }
            variant="dark"
            type="button"
            data-testid="login-submit-btn"
            onClick={ () => setTokenLocalStorage(userEmail) }
          >
            Entrar
          </Button>
        </Link>
      </Form>
    </div>
  );
}
