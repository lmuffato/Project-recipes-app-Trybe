import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Switch, Route } from 'react-router-dom';
import ReceitasProvider from './contexts/ReceitasProvider';
import Login from './pages/Login';
import Perfil from './pages/Perfil';
import Explorar from './pages/Explorar';
import Comidas from './pages/Comidas/Comidas';
import Bebidas from './pages/Bebidas/Bebidas';
import ExplorarComidas from './pages/Comidas/ExplorarComidas/ExplorarComidas';
import ExplorarBebidas from './pages/Bebidas/ExplorarBebidas/ExplorarBebidas';
import ExplorarBebidasPorIngrediente from
  './pages/Bebidas/ExplorarBebidas/ExplorarBebidasPorIngrediente';
import ExplorarComidasPorIngrediente from
  './pages/Comidas/ExplorarComidas/ExplorarComidasPorIngrediente';
import ExplorarComidasPorArea from
  './pages/Comidas/ExplorarComidas/ExplorarComidasPorArea';
import ReceitaComida from './pages/Comidas/Receitas/ReceitaComida';
import ReceitaBebidas from './pages/Bebidas/Receitas/ReceitaBebidas';

function App() {
  return (
    <div>
      <ReceitasProvider>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/comidas" component={ Comidas } />
          <Route exact path="/bebidas" component={ Bebidas } />
          {/* <Route path={ `/comidas/${id - da - receita}/in-progress` } />
          <Route path={ `/bebidas/${id - da - receita}/in-progress` } /> */}
          <Route path="/comidas/:id" component={ ReceitaComida } />
          <Route path="/bebidas/:id" component={ ReceitaBebidas } />
          <Route exact path="/explorar" component={ Explorar } />
          <Route
            path="/explorar/comidas/ingredientes"
            component={ ExplorarComidasPorIngrediente }
          />
          <Route path="/explorar/comidas/area" component={ ExplorarComidasPorArea } />
          <Route
            path="/explorar/bebidas/ingredientes"
            component={ ExplorarBebidasPorIngrediente }
          />
          <Route path="/explorar/comidas" component={ ExplorarComidas } />
          <Route path="/explorar/bebidas" component={ ExplorarBebidas } />
          <Route path="/perfil" component={ Perfil } />
          <Route path="/receitas-feitas" />
          <Route path="/receitas-favoritas" />
        </Switch>
      </ReceitasProvider>
    </div>
  );
}

export default App;
