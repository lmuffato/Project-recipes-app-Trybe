import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Receitas from './pages/Receitas';
import TelaReceitaEmProgresso from './components/TelaReceitaEmProgressoComidas/index';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/comidas/:id/in-progress" component={ TelaReceitaEmProgresso } />
      <Route path="/comidas" component={ Receitas } />
    </Switch>
  );
}

export default App;
