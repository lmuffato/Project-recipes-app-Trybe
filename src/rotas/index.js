import React from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';
import Header from '../componentes/Header';
import Comida from '../pages/comida';
import Perfil from '../pages/perfil';
import Explorar from '../pages/explorar';
import dadosHeader from '../dataHeader/dataHeader';

function Rotas() {
  const historico = useLocation();
  console.log(historico.pathname);
  return (
    <>
      <Header
        titulo={ dadosHeader[historico.pathname].titulo }
        icone1={ dadosHeader[historico.pathname].icone1 }
        icone2={ dadosHeader[historico.pathname].icone2 }
      />
      <Switch>
        <Route path="/comida" component={ Comida } />
        <Route path="/perfil" component={ Perfil } />
        <Route path="/explorar" component={ Explorar } />
      </Switch>
    </>

  );
}

export default Rotas;
