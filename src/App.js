import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import UserProvider from './context/UserProvider';
import Router from './Router';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Switch>
          <Router />
        </Switch>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
