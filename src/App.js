import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import RecipesProvider from './provider/RecipesProvider';
import routes from './helpers/routes';
import NotFound from './pages/NotFound';

function App() {
  return (
    <RecipesProvider>
      <Switch>
        {routes.map(({ path, Component, exact, title }) => (
          <Route
            key={ path }
            path={ path }
            exact={ exact }
            render={ () => <Component title={ title } /> }
          />
        ))}
        <Route component={ NotFound } />
      </Switch>
    </RecipesProvider>
  );
}

export default App;
