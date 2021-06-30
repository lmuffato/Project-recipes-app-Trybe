import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';

export default function Login() {
  const [buttonDisable, setButtonDisable] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const passwordMinimumLength = 6;
    if (password.length >= passwordMinimumLength && /^\S+@\S+\.\S+$/.test(email)) {
      setButtonDisable(false);
    } else {
      setButtonDisable(true);
    }
  }, [email, password]);

  return (
    <Form>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          data-testid="email-input"
          value={ email }
          onChange={ (e) => setEmail(e.target.value) }
        />
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          data-testid="password-input"
          value={ password }
          onChange={ (e) => setPassword(e.target.value) }
        />
      </Form.Group>
      <Button
        variant="primary"
        type="submit"
        data-testid="login-submit-btn"
        disabled={ buttonDisable }
      >
        Entrar
      </Button>
    </Form>
  );
}
