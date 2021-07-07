import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import UserProvider from './context/UserProvider';
import SearchProvider from './context/SearchProvider';
import FilterProvider from './context/FilterProvider';

ReactDOM.render(
  <BrowserRouter>
    <UserProvider>
      <SearchProvider>
        <FilterProvider>
          <App />
        </FilterProvider>
      </SearchProvider>
    </UserProvider>
  </BrowserRouter>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
