import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import UserProvider from './context/UserProvider';
import RecipesProvider from './context/RecipesProvider';
import Login from './pages/Login';
import TesteHeader from './pages/testeHeader';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <UserProvider>
      <RecipesProvider>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={ Login } />
            <Route path="/teste" component={ TesteHeader } />
          </Switch>
        </BrowserRouter>
      </RecipesProvider>
    </UserProvider>
  );
}

export default App;
