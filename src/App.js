import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Switch, Route } from 'react-router-dom';
import ReceitasProvider from './contexts/ReceitasProvider';
import Login from './pages/Login';
import Perfil from './pages/Perfil';
import Explorar from './pages/Explorar';
import Comidas from './pages/Comidas';
import Bebidas from './pages/Bebidas';

function App() {
  return (
    <div>
      <ReceitasProvider>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/comidas" component={ Comidas } />
          <Route exact path="/bebidas" component={ Bebidas } />
          {/* <Route path={ `/comidas/${id - da - receita}/in-progress` } />
          <Route path={ `/bebidas/${id - da - receita}/in-progress` } />
          <Route path={ `/comidas/${id - da - receita}` } />
          <Route path={ `/bebidas/${id - da - receita}` } /> */}
          <Route exact path="/explorar" component={ Explorar } />
          {/* <Route path="/explorar/comidas" />
          <Route path="/explorar/bebidas" />
          <Route path="/explorar/comidas/ingredientes" />
          <Route path="/explorar/bebidas/ingredientes" />
          <Route path="/explorar/comidas/area" /> */}
          <Route path="/perfil" component={ Perfil } />
          {/* <Route path="/receitas-feitas" />
          <Route path="/receitas-favoritas" /> */}
        </Switch>
      </ReceitasProvider>
    </div>
  );
}

export default App;
