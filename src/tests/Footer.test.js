import React from 'react';
import { fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

const emailInput = 'email-input';
const passwordInput = 'password-input';
const loginBtn = 'login-submit-btn';

const loginData = { user: 'teste@teste.com', password: '1234567' };

const testIdArray = ['drinks-bottom-btn', 'explore-bottom-btn', 'food-bottom-btn'];

const handleLogin = (getByTestId) => {
  const userInput = getByTestId(emailInput);
  const userPasswordInput = getByTestId(passwordInput);
  const loginSubmitBtn = getByTestId(loginBtn);

  userEvent.type(userInput, loginData.user);
  userEvent.type(userPasswordInput, loginData.password);
  userEvent.click(loginSubmitBtn);

  const footer = getByTestId('footer');
  expect(footer).toBeInTheDocument();
};

describe('Test the component Footer', () => {
  it('verify the footers position', () => {
    const { getByTestId } = renderWithRouter(<App />);
    handleLogin(getByTestId);

    const footer = getByTestId('footer');
    // Source: https://spectrum.chat/testing-library/help-dom/fire-scroll-event-with-specified-x-y-positions~4798d1c8-2658-4479-a855-9c8f26c74385
    fireEvent.scroll(window, { target: { scrollY: 101 } });

    expect(footer).toBeInTheDocument();
  });
});

describe('Test the Routes', () => {
  const routeArray = ['/bebidas', '/explorar', '/comidas'];

  const handleRoute = (getByTestId, test, { pathname }) => {
    const icon = getByTestId(test);
    const initialPathname = pathname;
    expect(icon).toBeInTheDocument();
    expect(initialPathname).toBe(routeArray[2]);

    userEvent.click(icon.parentNode);
  };

  it('verify if on click on the drink icon redirects to Route "/bebidas"', () => {
    const {
      getByTestId, history,
    } = renderWithRouter(<App />);

    handleLogin(getByTestId);

    handleRoute(getByTestId, testIdArray[0], history.location);

    const currentPathname = history.location.pathname;
    expect(currentPathname).toBe(routeArray[0]);
  });

  it('verify if on click on the explore icon redirects to Route "/explorar"', () => {
    const {
      getByTestId, history,
    } = renderWithRouter(<App />);

    handleLogin(getByTestId);

    handleRoute(getByTestId, testIdArray[1], history.location);

    const currentPathname = history.location.pathname;
    expect(currentPathname).toBe(routeArray[1]);
  });

  it('verify if on click on the meal icon redirects to Route "/comidas"', () => {
    const {
      getByTestId, history,
    } = renderWithRouter(<App />);

    handleLogin(getByTestId);

    handleRoute(getByTestId, testIdArray[2], history.location);

    const secondPathname = history.location.pathname;
    expect(secondPathname).toBe(routeArray[2]);
  });
});
