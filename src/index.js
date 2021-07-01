import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import UserContextProvider from './context/UserContext';
import RecipesContextProvider from './context/RecipesContext';
import FiltredRecipesContextProvider from './context/FilteredRecipesContext';

ReactDOM.render(
  <BrowserRouter>
    <UserContextProvider>
      <RecipesContextProvider>
        <FiltredRecipesContextProvider>
          <App />
        </FiltredRecipesContextProvider>
      </RecipesContextProvider>
    </UserContextProvider>
  </BrowserRouter>, document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
