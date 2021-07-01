import React from 'react';
import { render } from '@testing-library/react';

const renderWithContext = (component, Context, value) => ({
  ...render(<Context.Provider value={ value }>{component}</Context.Provider>),
  value,
});

export default renderWithContext;
