import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import RecipesProvider from './provider/RecipesProvider';
import routes from './helpers/routes';

function App() {
  return (
    <BrowserRouter>
      <RecipesProvider>
        <Switch>
          {routes.map(({ path, component }) => (
            <Route key={ path } path={ path } component={ component } />
          ))}
        </Switch>
      </RecipesProvider>
    </BrowserRouter>
  );
}

export default App;
