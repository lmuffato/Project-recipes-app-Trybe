import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import RecipeProvider from '../context/RecipeProvider';
import UserProvider from '../context/UserProvider';

function renderWithRouter(componentToRender) {
  const historyMock = createMemoryHistory();

  const renderObject = render(
    <RecipeProvider>
      <UserProvider>
        <MemoryRouter history={ historyMock }>
          {componentToRender}
        </MemoryRouter>
      </UserProvider>
    </RecipeProvider>,
  );

  return {
    ...renderObject,
    history: historyMock,
  };
}

export default renderWithRouter;
