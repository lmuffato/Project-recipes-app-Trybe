import React from 'react';
import { act } from 'react-dom/test-utils';
import App from '../../../App';
import renderWithRouter from './renderWithRouter';

const renderWithRouterAndContext = async () => {
  await act(async () => {
    renderWithRouter(<App />);
  });
};

export default renderWithRouterAndContext;
