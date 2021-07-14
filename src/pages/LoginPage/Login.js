import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Image } from 'react-bootstrap';
import Context from '../../context/Context';
import './Style.css';
import Logo from '../../images/Logo.png';

function Login(props) {
  const {
    email,
    setEmail,
    password,
    setPassword,
  } = useContext(Context);

  const validate = () => {
    const minLength = 7;
    const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    if ((password.length >= minLength) && (emailPattern.test(email) === true)) {
      return false;
    }
    return true;
  };

  const handleClick = () => {
    const { history } = props;
    const userToLocalStorage = { email };
    localStorage.setItem('mealsToken', '1');
    localStorage.setItem('cocktailsToken', '1');
    localStorage.setItem('user', JSON.stringify(userToLocalStorage));
    history.push('/comidas');
  };

  return (
    <Form>
      <Image src={ Logo } fluid />
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Control
          type="email"
          data-testid="email-input"
          onChange={ (e) => setEmail(e.target.value) }
          value={ email }
          placeholder="Enter email"
          className="input"
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Control
          type="password"
          data-testid="password-input"
          onChange={ (e) => setPassword(e.target.value) }
          value={ password }
          placeholder="Password"
          className="input"
        />
      </Form.Group>
      <div className="btn-div">
        <Button
          variant="custom"
          data-testid="login-submit-btn"
          disabled={ validate() }
          onClick={ () => handleClick() }
          type="submit"
          className="submit"
        >
          Entrar
        </Button>
      </div>
    </Form>
  );
}

Login.propTypes = {
  history: PropTypes.object,
}.isRequired;

export default Login;
