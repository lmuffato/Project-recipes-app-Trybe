import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import RecipesProvider from './provider/RecipesProvider';
import routes from './helpers/routes';

function App() {
  return (
    <RecipesProvider>
      <Switch>
        {routes.map(({ path, component, exact }) => (
          <Route key={path} path={path} exact={exact} component={component} />
        ))}
      </Switch>
    </RecipesProvider>
  );
}

export default App;
