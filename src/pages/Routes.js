import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './Login';
import Comidas from './Comidas';
import Bebidas from './Bebidas';
import Explorar from './Explorar';
import ReceitasFeitas from './ReceitasFeitas';
import ReceitasFavoritas from './ReceitasFavoritas';
import Perfil from './Perfil';
import ComidasEmProcesso from './ComidasEmProcesso';
import BebidasEmProcesso from './BebidasEmProcesso';
import ComidasDetalhes from './ComidasDetalhes';
import BebidasDetalhes from './BebidasDetalhes';
import ExplorarComidas from './ExplorarComidas';
import ExplorarBebidas from './ExplorarBebidas';
import ExplorarComidasIngredientes from './ExplorarComidasIngredientes';
import ExplorarBebidasIngredientes from './ExplorarBebidasIngredientes';
import ExplorarComidasArea from './ExplorarComidasArea';
import PaginaNaoEncontrada from './PaginaNaoEncontrada';

function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/comidas" component={ Comidas } />
      <Route exact path="/bebidas" component={ Bebidas } />
      <Route exact path="/comidas/:id" component={ ComidasDetalhes } />
      <Route exact path="/bebidas/:id" component={ BebidasDetalhes } />
      <Route
        exact
        path="/comidas/:id/in-progress"
        component={ ComidasEmProcesso }
      />
      <Route
        exact
        path="/bebidas/:id/in-progress"
        component={ BebidasEmProcesso }
      />
      <Route exact path="/explorar" component={ Explorar } />
      <Route exact path="/explorar/comidas" component={ ExplorarComidas } />
      <Route exact path="/explorar/bebidas" component={ ExplorarBebidas } />
      <Route
        exact
        path="/explorar/comidas/ingredientes"
        component={ ExplorarComidasIngredientes }
      />
      <Route
        exact
        path="/explorar/bebidas/ingredientes"
        component={ ExplorarBebidasIngredientes }
      />
      <Route exact path="/explorar/comidas/area" component={ ExplorarComidasArea } />
      <Route exact path="/perfil" component={ Perfil } />
      <Route exact path="/receitas-feitas" component={ ReceitasFeitas } />
      <Route exact path="/receitas-favoritas" component={ ReceitasFavoritas } />
      <Route path="/" component={ PaginaNaoEncontrada } />
    </Switch>
  );
}

export default Routes;
