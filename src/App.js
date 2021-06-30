import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import UserProvider from './context/UserProvider';
import Login from './pages/Login';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Switch>
          <Route path="/" component={ Login } />
        </Switch>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
