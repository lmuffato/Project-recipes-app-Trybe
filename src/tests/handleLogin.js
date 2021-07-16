import userEvent from '@testing-library/user-event';

const emailInput = 'email-input';
const passwordInput = 'password-input';
const loginBtn = 'login-submit-btn';

const loginData = { user: 'teste@teste.com', password: '1234567' };

const handleLogin = (method) => {
  const userInput = method(emailInput);
  const userPasswordInput = method(passwordInput);
  const loginSubmitBtn = method(loginBtn);

  userEvent.type(userInput, loginData.user);
  userEvent.type(userPasswordInput, loginData.password);
  userEvent.click(loginSubmitBtn);

  const footer = method('footer');
  expect(footer).toBeInTheDocument();
};

export default handleLogin;
