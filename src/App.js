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
import ExplorarComidas from './pages/ExplorarComidas';
import ExplorarBebidas from './pages/ExplorarBebidas';
import ExplorarBebidasPorIngrediente from './pages/ExplorarBebidasPorIngrediente';
import ExplorarComidasPorIngrediente from './pages/ExplorarComidasPorIngrediente';
import ExplorarComidasPorArea from './pages/ExplorarComidasPorArea';

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
          <Route path="/explorar/comidas" component={ ExplorarComidas } />
          <Route path="/explorar/bebidas" component={ ExplorarBebidas } />
          <Route
            path="/explorar/comidas/ingredientes"
            component={ ExplorarComidasPorIngrediente }
          />
          <Route
            path="/explorar/bebidas/ingredientes"
            component={ ExplorarBebidasPorIngrediente }
          />
          <Route path="/explorar/comidas/area" component={ ExplorarComidasPorArea } />
          <Route path="/perfil" component={ Perfil } />
          {/* <Route path="/receitas-feitas" />
          <Route path="/receitas-favoritas" /> */}
        </Switch>
      </ReceitasProvider>
    </div>
  );
}

export default App;
