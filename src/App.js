import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import LoginProvider from './context/LoginProvider';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login';
import Comidas from './pages/Comidas';
import Bebidas from './pages/Bebidas';
import DetalhesComidas from './pages/DetalhesComidas';
import DetalhesBebidas from './pages/DetalhesBebidas';
import ProcessoComida from './pages/ProcessoComida';
import ProcessoBebida from './pages/ProcessoBebida';
import Explorar from './pages/Explorar';
import ExplorarComidas from './pages/ExplorarComidas';
import ExplorarBebidas from './pages/ExplorarBebidas';
import ExplorarComIngre from './pages/ExplorarComIngre';
import ExplorarBebIngre from './pages/ExplorarBebIngre';
import ExplorarComidasAreas from './pages/ExplorarComidasAreas';
import Perfil from './pages/Perfil';
import ReceitasFeitas from './pages/ReceitasFeitas';
import ReceitasFavoritas from './pages/ReceitasFavoritas';

function App() {
  return (
    <div>
      <LoginProvider>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={ Login } />
            <Route exact path="/comidas" component={ Comidas } />
            <Route exact path="/bebidas" component={ Bebidas } />
            <Route exact path="/comidas/:id" component={ DetalhesComidas } />
            <Route exact path="/bebidas/:id" component={ DetalhesBebidas } />
            <Route exact path="/comidas/:id/in-progress" component={ ProcessoComida } />
            <Route exact path="/bebidas/:id/in-progress" component={ ProcessoBebida } />
            <Route exact path="/explorar" component={ Explorar } />
            <Route exact path="/explorar/comidas" component={ ExplorarComidas } />
            <Route exact path="/explorar/bebidas" component={ ExplorarBebidas } />
            <Route
              exact
              path="/explorar/comidas/ingredientes"
              component={ ExplorarComIngre }
            />
            <Route
              exact
              path="/explorar/bebidas/ingredientes"
              component={ ExplorarBebIngre }
            />
            <Route
              exact
              path="/explorar/comidas/area"
              component={ ExplorarComidasAreas }
            />
            <Route exact path="/perfil" component={ Perfil } />
            <Route exact path="/receitas-feitas" component={ ReceitasFeitas } />
            <Route exact path="/receitas-favoritas" component={ ReceitasFavoritas } />
          </Switch>
        </BrowserRouter>
      </LoginProvider>
    </div>
  );
}

export default App;
