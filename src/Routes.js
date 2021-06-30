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
import ReceitasFavoritas from './Pages/ReceitasFavoritas';

class Routes extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/comidas" component={ Comidas } />
          <Route exact path="/bebidas" component={ Bebidas } />
          <Route exact path="/explorar" component={ Explorar } />
          <Route exact path="/explorar/comidas" component={ ExplorarComida } />
          <Route exact path="/explorar/bebidas" component={ ExplorarBebidas } />
          <Route
            exact
            path="/explorar/comidas/ingredientes"
            component={ ExplorarIngrediente }
          />
          <Route path="/perfil" component={ Perfil } />
          <Route path="/receitas-favoritas" component={ ReceitasFavoritas } />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default Routes;
