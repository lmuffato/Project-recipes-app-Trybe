import React, { useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Context from '../../context/Context';

function loginValidation(email, password) {
  const regex2Email = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
  const minLenght = 6;
  if (regex2Email.test(email) && password.length > minLenght) return false;
  return true;
}

export default function Login() {
  const { setUserEmail, setPassword, userEmail, password } = useContext(Context);

  function setTokenLocalStorage() {
    const Obj = { email: userEmail };
    localStorage.setItem('mealsToken', JSON.stringify(1));
    localStorage.setItem('cocktailsToken', JSON.stringify(1));
    localStorage.setItem('user', JSON.stringify(Obj));
  }
  return (
    <div className="meals">
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            onChange={ ({ target }) => setUserEmail(target.value) }
            data-testid="email-input"
            type="email"
            placeholder="Enter email"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
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
            onClick={ setTokenLocalStorage }
          >
            Entrar
          </Button>
        </Link>
      </Form>
    </div>
  );
}
