// https://app.betrybe.com/course/front-end/testes-automatizados-com-react-testing-library/rtl-testando-react-router/58c480e0-79ed-47bd-a819-f88d82997927/conteudos/3ac4a246-7ea6-4722-bd9d-7c141435d8ee/testando-react-router/367f539c-699b-4e1c-abcc-03b14d1a608e?use_case=side_bar
import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from '../reducers';

const renderWithRouterAndRedux = (component,
  initialState, store = createStore(rootReducer, initialState)) => {
  const history = createMemoryHistory();
  return ({
    ...render(
      <Router history={ history }>
        <Provider store={ store }>
          {component}
        </Provider>
      </Router>,
    ),
    history,
    store,
  });
};

export default renderWithRouterAndRedux;
