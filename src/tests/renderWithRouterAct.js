import React from 'react';
import { act } from 'react-dom/test-utils';
import App from '../App';
import renderWithRouterHooksAndProvider from './renderWithRouterHooksAndProvider';

const renderWithRouterAct = async () => {
  await act(async () => {
    renderWithRouterHooksAndProvider(<App />);
  });
};

export default renderWithRouterAct;
