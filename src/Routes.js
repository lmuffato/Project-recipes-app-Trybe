import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './Pages/Login';
import Bebidas from './Pages/Bebidas';
import Comidas from './Pages/Comidas';
import Explorar from './Pages/Explorar';
import ExplorarBebidas from './Pages/ExplorarBebidas';
import ExplorarComida from './Pages/ExplorarComida';
import ExplorarIngrediente from './Pages/ExplorarIngrediente';
import Perfil from './Pages/Perfil';
import ExplorarOrigem from './Pages/ExplorarOrigem';
import ReceitasFavoritas from './Pages/ReceitasFavoritas';
import NaoEncontrado from './Pages/NaoEncontrado';
import ReceitasFeitas from './Pages/ReceitasFeitas';

class Routes extends React.Component {
  render() {
    return (
      // Dica da Ana Ventura no slack da turma
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/comidas" component={ Comidas } />
          <Route exact path="/bebidas" component={ Bebidas } />
          <Route exact path="/explorar" component={ Explorar } />
          <Route exact path="/explorar/comidas" component={ ExplorarComida } />
          <Route exact path="/explorar/bebidas" component={ ExplorarBebidas } />
          <Route path="/explorar/comidas/area" component={ ExplorarOrigem } />
          <Route path="/explorar/bebidas/area" component={ NaoEncontrado } />
          <Route
            path="/explorar/comidas/ingredientes"
            component={ ExplorarIngrediente }
          />
          <Route
            path="/explorar/bebidas/ingredientes"
            component={ ExplorarIngrediente }
          />
          <Route path="/perfil" component={ Perfil } />
          <Route path="/receitas-favoritas" component={ ReceitasFavoritas } />
          <Route path="/receitas-feitas" component={ ReceitasFeitas } />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default Routes;
