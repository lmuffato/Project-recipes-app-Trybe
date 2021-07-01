import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
<<<<<<< HEAD
=======
import { Provider } from 'react-redux';
import store from './store';
>>>>>>> d0c0786ea10c8daedb3f9a534dde6ebf1decf349
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <BrowserRouter>
<<<<<<< HEAD
    <App />
=======
    <Provider store={ store }>
      <App />
    </Provider>
>>>>>>> d0c0786ea10c8daedb3f9a534dde6ebf1decf349
  </BrowserRouter>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
