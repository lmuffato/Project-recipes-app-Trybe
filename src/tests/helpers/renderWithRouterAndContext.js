import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter } from 'react-router-dom';
import UserContext from '../../context/UserContext';

// src: https://testing-library.com/docs/example-react-context/
const renderWithRouterAndContext = (ui, { providerProps, route = '/' } = {}) => {
  window.history.pushState({}, 'Login Page', route);
  render(
    <UserContext.Provider { ...providerProps }>
      {ui}
    </UserContext.Provider>,
    { wrapper: BrowserRouter },
  );
};

export default renderWithRouterAndContext;
