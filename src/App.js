import React from 'react';
import { Switch, Route } from 'react-router-dom';
import ProviderBebidas from './provider/ProviderBebida';
import ProviderComidas from './provider/ProviderComidas';
import { Login } from './pages';

function App() {
  return (
    <ProviderBebidas>
      <ProviderComidas>
        <Switch>
          {/* <Route path="/comidas" component={ Comidas } />
          <Route path="/bebidas" component={ Bebidas } />
          <Route path="/comidas/{id-da-receita}" component={ DetalhesComida } />
          <Route path="/bebidas/{id-da-bebida}" component={ DetalhesBebida } />
          <Route path="/comidas/{id-da-receita}/in-progress" component={ ComidasAtiva } />
          <Route path="/bebidas/{id-da-receita}/in-progress" component={ BebidasAtiva } />
          <Route path="/explorar" component={ Explorar } />
          <Route path="/explorar/comidas" component={ ExplorarComidas } />
          <Route path="/explorar/bebidas" component={ ExplorarBebidas } />
          <Route path="/explorar/bebidas/ingredientes" component={ ExplorarBebidasING } />
          <Route path="/explorar/comidas/ingredientes" component={ ExplorarComidasING } />
          <Route path="/explorar/comidas/area" component={ ExplorarComidasArea } />
          <Route path="/perfil" component={ Perfil } />
          <Route path="/receitas-feitas" component={ ReceitasFeitas } />
          <Route path="/receitas-favoritas" component={ ReceitasFavoritas } /> */}
          <Route exact path="/" component={ Login } />
        </Switch>
      </ProviderComidas>
    </ProviderBebidas>
  );
}

export default App;
